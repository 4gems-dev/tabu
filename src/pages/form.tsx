import Layout from "@/components/Layout/Layout";
import { Button } from "@/components/ui/button";
import { GeminiEffect } from "@/components/ui/gemini";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { objectKeys } from "@/lib";
import { PreferencesType, usePreferencesState } from "@/state/preferencesState";
import { InterestsEnum, IntervalEnum, RiskToleranceEnum } from "@/types";
import { useScroll, useTransform } from "framer-motion";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/router";
import { PropsWithChildren, useRef, useState } from "react";

export type PreferencesFormStepsType = keyof PreferencesType;

const stepOrder: PreferencesFormStepsType[] = [
  "name",
  "interests",
  "riskTolerance",
  "budget",
  "years",
];

const riskToleranceValues: RiskToleranceEnum[] = ["LOW", "MEDIUM", "HIGH"];

const intervalConfig: Record<IntervalEnum, string> = {
  UNCERTAIN: "I am not sure",
  "<1": "Less than 1 year",
  "1_3": "1-3 years",
  "3_5": "3-5 years",
  "5_10": "5-10 years",
  "10+": "More than 10 years",
};

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
  const [step, setStep] = useState<PreferencesFormStepsType>("name");

  const {
    name,
    budget,
    interests,
    riskTolerance,
    years,
    toggleInterest,
    setValue,
  } = usePreferencesState();

  const { push } = useRouter();

  const handleContinue = () => {
    const currIndex = stepOrder.findIndex((_step) => _step === step);

    if (currIndex >= stepOrder.length - 1) {
      push("/loading");
      return;
    }

    const nextStep = stepOrder[currIndex + 1];
    setStep(nextStep);
    window.scrollTo({ top: 0 });
  };

  const handleBack = () => {
    const currIndex = stepOrder.findIndex((_step) => _step === step);

    if (currIndex <= 0) {
      return;
    }

    const prevStep = stepOrder[currIndex - 1];
    setStep(prevStep);
    window.scrollTo({ top: 0 });
  };

  return (
    <Layout title="Create investment account" className="grow">
      {/* <header className="h-20 border-b"></header> */}
      <Progress
        className="w-full sticky top-0 h-1 rounded-none"
        value={((getStepIndex(step) + 1) / stepOrder.length) * 100}
      />

      {step === null && <HomeStep onClick={handleContinue} />}

      {step !== null && (
        <>
          <div className="min-h-screen p-10 pt-20 mb-24 max-w-5xl mx-auto">
            <div className="mb-10 space-y-2">
              {step === "name" && (
                <>
                  <Subheading>New personalized investment account</Subheading>
                  <Heading>Your name</Heading>
                </>
              )}
              {step === "interests" && (
                <>
                  <Heading>{"What's your interests"}</Heading>
                  <Subheading>
                    So we can tailor stocks and funds to your interests
                  </Subheading>
                </>
              )}
              {step === "riskTolerance" && (
                <Heading>What is your risk tolerance?</Heading>
              )}
              {step === "budget" && <Heading>Your investment budget</Heading>}
              {step === "years" && (
                <Heading>For how long you want to invest?</Heading>
              )}
            </div>

            <div className="w-full">
              {step === "name" && (
                <>
                  <Input
                    type="text"
                    autoComplete="off"
                    id="name"
                    placeholder="Fill your full name"
                    className="text-lg h-auto py-4 px-4 max-w-md"
                    onChange={(e) => setValue("name", e.target.value)}
                    value={name}
                  />
                </>
              )}

              {step === "interests" && (
                <div className="grid auto-rows-fr gap-6">
                  {objectKeys(interestsData).map((interest, i) => {
                    const isSelected = interests.includes(interest);
                    return (
                      <button
                        key={i}
                        onClick={() => toggleInterest(interest)}
                        className={`${
                          isSelected ? "bg-muted/80" : ""
                        } flex gap-4 p-4 rounded-xl active:translate-y-px items-start justify-start text-left border-solid border hover:bg-muted/80`}
                      >
                        <div
                          className={`${
                            isSelected ? "bg-primary text-background" : ""
                          } rounded-md border h-8 w-8 flex-shrink-0 grid place-items-center`}
                        >
                          {isSelected && (
                            <CheckIcon
                              className="text-current"
                              size="1rem"
                              strokeWidth={4}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {interestsData[interest].label}
                          </p>
                          <p className="text-muted-foreground text-sm mt-1">
                            {interestsData[interest].description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {step === "riskTolerance" && (
                <div>
                  <Slider
                    classNames={{
                      track: "h-10 rounded-lg",
                      thumb: "w-10 h-10 rounded-lg",
                      range: `bg-gradient-to-r from-blue-800 via-purple-800 ${
                        riskTolerance === "MEDIUM"
                          ? "to-purple-800"
                          : "to-red-800"
                      }`,
                    }}
                    className="rounded-lg"
                    value={[
                      riskToleranceValues.findIndex(
                        (value) => value === riskTolerance
                      ) * 50,
                    ]}
                    defaultValue={[50]}
                    max={100}
                    step={50}
                    onValueChange={([value]) => {
                      setValue(
                        "riskTolerance",
                        riskToleranceValues[value / 50]
                      );
                    }}
                  />

                  <div className="flex justify-between items-center mt-2 text-lg font-semibold">
                    <Button
                      className={`${
                        riskTolerance === "LOW"
                          ? "bg-blue-800 hover:bg-blue-800 hover:text-primary"
                          : ""
                      } h-auto py-3 text-lg `}
                      variant={"ghost"}
                      onClick={() => setValue("riskTolerance", "LOW")}
                    >
                      Low
                    </Button>
                    <Button
                      className={`${
                        riskTolerance === "MEDIUM"
                          ? "bg-purple-800 hover:bg-purple-800 hover:text-primary"
                          : ""
                      } h-auto py-3 text-lg`}
                      variant={"ghost"}
                      onClick={() => setValue("riskTolerance", "MEDIUM")}
                    >
                      Medium
                    </Button>
                    <Button
                      className={`${
                        riskTolerance === "HIGH"
                          ? "bg-red-800 hover:bg-red-800 hover:text-primary"
                          : ""
                      } h-auto py-3 text-lg`}
                      variant={"ghost"}
                      onClick={() => setValue("riskTolerance", "HIGH")}
                    >
                      High
                    </Button>
                  </div>
                </div>
              )}

              {step === "budget" && (
                <div className="flex items-center gap-1 relative max-w-xs">
                  <Input
                    placeholder="Fill your budget"
                    className="text-lg h-auto py-4 px-4 w-full"
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setValue("budget", isNaN(value) ? 0 : value);
                    }}
                    value={budget ?? ""}
                  />

                  <p className="absolute right-3">€</p>
                </div>
              )}

              {step === "years" && (
                <div className="grid auto-rows-fr gap-6">
                  {objectKeys(intervalConfig).map((interval, i) => {
                    const isSelected = years === interval;
                    return (
                      <button
                        key={i}
                        onClick={() => setValue("years", interval)}
                        className={`${
                          isSelected ? "bg-muted/80" : ""
                        } flex gap-4 p-4 rounded-xl active:translate-y-px items-start justify-start text-left border-solid border hover:bg-muted/80`}
                      >
                        <div className="rounded-full border-primary border h-8 w-8 flex-shrink-0 grid place-items-center">
                          {isSelected && (
                            <div className="w-1/2 h-1/2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {intervalConfig[interval]}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <aside className="fixed bottom-0 z-10 bg-background border-t left-0 right-0 h-24 flex justify-end px-10 items-center gap-8">
            {getStepIndex(step) > 0 && (
              <Button size="sm" variant="ghost" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button
              size="xl"
              className="gap-2 px-8"
              onClick={handleContinue}
              variant="accent"
            >
              <p>Continue</p>
              <ChevronRightIcon />
            </Button>
          </aside>
        </>
      )}
    </Layout>
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

function HomeStep({ onClick }: { onClick: () => void }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  return (
    <div
      className="h-[400vh] w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip"
      ref={ref}
    >
      <GeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title="Personalized investing helper"
        description="Learn how to invest & manage your own portfolio"
        actionLabel="Let's begin"
        actionOnClick={onClick}
      />
    </div>
  );
}

/**
 *
 * @param step
 * @returns
 */
function getStepIndex(step: PreferencesFormStepsType | null) {
  return stepOrder.findIndex((_step) => _step === step);
}
