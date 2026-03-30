import { TestPageClient } from "./TestPageClient";
import { tests } from "@/data/tests";

export function generateStaticParams() {
  return tests.map((t) => ({ testId: t.id }));
}

export default function TestPage({ params }: { params: { testId: string } }) {
  return <TestPageClient testId={params.testId} />;
}
