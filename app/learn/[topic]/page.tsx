import { LearnPageClient } from "./LearnPageClient";
import { learnTopics } from "@/data/learn";

export function generateStaticParams() {
  return learnTopics.map((t) => ({ topic: t.id }));
}

export default function LearnTopicPage({ params }: { params: { topic: string } }) {
  return <LearnPageClient topicId={params.topic} />;
}
