import Layout from "@/components/Layout/Layout";
import Container from "@/components/ui/container";
import { usePreferencesState } from "@/state/preferencesState";

type PropsType = {};

export default function DashboardPage({}: PropsType) {
  const { budget, interests, name, riskTolerance, years } =
    usePreferencesState();

  return (
    <Layout title="Dashboard">
      <Container>
        <h1 className="text-2xl font-semibold">Welcome, {name || "John"}!</h1>

        <section className="grid-cols-3 grid gap-4 mt-10">
          <div className="col-span-2 p-4 rounded-lg border bg-foreground/5">
            {/* chart */}
            <div className="h-[30rem]" />
          </div>

          <div className="row-span-2 p-4 rounded-lg border bg-foreground/5">
            {/* news */}
          </div>

          <div className="col-span-2 p-4 rounded-lg border bg-foreground/5">
            {/* stocks */}
            <div className="h-[10rem]" />
          </div>
        </section>
      </Container>
    </Layout>
  );
}
