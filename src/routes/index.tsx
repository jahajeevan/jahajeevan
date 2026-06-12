import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jahajeevan V — Full Stack Developer & Software Engineer" },
      { name: "description", content: "Full Stack Developer building scalable web applications with React, Node.js, PostgreSQL, and cloud-native tooling." },
      { property: "og:title", content: "Jahajeevan V — Full Stack Developer" },
      { property: "og:description", content: "Engineer building production-grade systems. Featured work: JK Hospital Management, Amrita Nexus Campus, and more." },
    ],
  }),
  component: Index,
});

function Index() {
  return <Portfolio />;
}
