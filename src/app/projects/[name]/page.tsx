import { readFileSync, readdirSync } from "fs";
import { notFound } from "next/navigation";
import { join } from "path";
import { evaluate } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";

type PageProps = {
  params: {
    name: string;
  };
};

export default async function Page(props: PageProps) {
  try {
    const path = join(process.cwd(), "src", "projects", props.params.name);
    const file = readFileSync(path);
    const text = file.toString("utf8");

    const { default: Content } = await evaluate(text, runtime as any);

    return <Content />;
  } catch {
    notFound();
  }
}

/** Convert all md files in src/projects into route segments */
export function generateStaticParams() {
  const path = join(process.cwd(), "src", "projects");
  const allProjects = readdirSync(path);

  return allProjects.map((project) => ({
    name: project,
  }));
}
