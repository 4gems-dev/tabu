import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { objectKeys } from "@/lib";
import { InterestsEnum } from "@/types";
import { ChevronRightIcon } from "lucide-react";
import { PropsWithChildren, useState } from "react";

type UserProfileType = {
  name: string;
  budget: number | null;
  years: number | null;
  interests: InterestsEnum[];
};

const stepOrder: (keyof UserProfileType)[] = [
  "name",
  "interests",
  "budget",
  "years",
];

const interestsData: Record<
  InterestsEnum,
  { label: string; description: string }
> = {
  TECH: {
    label: "Information Technology",
    description:
      "I am interested in companies at the forefront of technological innovation",
  },
  HEALTH: {
    label: "Health & Wellness",
    description:
      "I am interested in companies that develop healthcare products, provide medical services, or promote healthy living",
  },
  SUSTAINABILITY: {
    label: "Sustainability",
    description:
      "I am interested in companies that prioritize environmental and social responsibility",
  },
  TRAVEL: {
    label: "Travel",
    description:
      "I am interested in companies that facilitate travel and leisure activities",
  },
  FASHION: {
    label: "Fashion",
    description:
      "I am  interested in companies that design, manufacture, and sell clothing, accessories, and other fashion items",
  },
};

export default function FormPage() {
  const [step, setStep] = useState<keyof UserProfileType | null>(null);

  const [values, setValues] = useState<UserProfileType>({
    name: "",
    budget: null,
    years: null,
    interests: [],
  });

  const [error, setError] = useState("");

  const setValue = <TKey extends keyof UserProfileType>(
    key: TKey,
    value: UserProfileType[TKey]
  ) => {
    setValues((values) => ({ ...values, [key]: value }));
  };

  const validateStep = (): boolean => {
    if (step === "name") {
      const isValid = values.name.trim().length > 0;

      setError(isValid ? "" : "Fill your name before continuing");

      return isValid;
    }

    return true;
  };

  const handleContinue = () => {
    if (!validateStep()) {
      return;
    }

    const currIndex = stepOrder.findIndex((_step) => _step === step);

    if (currIndex >= stepOrder.length - 1) {
      return;
    }

    const nextStep = stepOrder[currIndex + 1];
    setStep(nextStep);
  };

  const handleBack = () => {
    const currIndex = stepOrder.findIndex((_step) => _step === step);

    if (currIndex < 0) {
      return;
    }

    if (currIndex === 0) {
      setStep(null);
      return;
    }

    const prevStep = stepOrder[currIndex - 1];
    setStep(prevStep);
  };

  const isError = error.length > 0;

  return (
    <>
      <header className="h-20 border-b"></header>
      <div className="min-h-screen p-20">
        <div className="mb-10 space-y-2">
          {step === null && (
            <>
              <Heading>New personalized investment account</Heading>
              <Subheading>
                Tell us about yourself so we can prepare a tailor-made
                investment environment for you
              </Subheading>
            </>
          )}
          {step !== null && (
            <>
              <Subheading>New personalized investment account</Subheading>
              {step === "name" && <Heading>Your name</Heading>}
              {step === "interests" && (
                <Heading>{"What's your interests"}</Heading>
              )}
              {step === "budget" && <Heading>Your investment budget</Heading>}
              {step === "years" && (
                <Heading>For how long you want to invest?</Heading>
              )}
            </>
          )}
        </div>

        <div className="w-full max-w-md">
          {step === "name" && (
            <Input
              type="text"
              autoComplete="off"
              id="name"
              placeholder="Fill your full name"
              className={`${
                isError ? "border-destructive" : ""
              } text-lg h-auto py-4 px-4`}
              onChange={(e) => setValue("name", e.target.value)}
              value={values.name}
            />
          )}

          {step === "interests" && (
            <div className="grid grid-cols-1 gap-1">
              {objectKeys(InterestsEnum).map((interest, i) => (
                <div key={i} className="flex items-center gap-1">
                  <Checkbox id={interest} />
                  <Label htmlFor={interest}>{}</Label>
                </div>
              ))}
            </div>
          )}

          {isError && <p className="text-destructive mt-1">{error}</p>}
        </div>
      </div>

      <aside className="fixed bottom-0 z-10 bg-background py-6 px-20 border-t left-0 right-0 flex justify-end items-center gap-8">
        {step !== null && (
          <Button size="sm" variant="ghost" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button size="xl" className="gap-2 px-8" onClick={handleContinue}>
          <p>Continue</p>
          <ChevronRightIcon />
        </Button>
      </aside>
    </>
  );
}

function Heading({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return <h1 className={`${className} text-5xl font-bold`}>{children}</h1>;
}

function Subheading({
  children,
  className = "",
}: PropsWithChildren<{ className?: string }>) {
  return (
    <p className={`text-muted-foreground text-lg ${className}`}>{children}</p>
  );
}
