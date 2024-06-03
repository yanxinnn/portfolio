import { readFileSync, readdirSync } from "fs";
import { notFound } from "next/navigation";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";

type PageProps = {
  params: {
    name: string;
    description: string;
    backgroundColor1: string;
  };
};

type PageMeta = {
  title: string;
  description: string;
  backgroundColor1: string;
};

export default async function Page(props: PageProps) {
  try {
    const path = join(
      process.cwd(),
      "src",
      "projects",
      props.params.name
    ).concat(".md");
    const file = readFileSync(path);
    const text = file.toString("utf8");

    const { content, frontmatter } = await compileMDX<PageMeta>({
      source: text,
      components: {
        h2: (props) => <h2 className="font-body">{props.children}</h2>,
      },
      options: {
        parseFrontmatter: true,
      },
    });

    return (
      <div>
        <div
          className="header"
          style={{ backgroundColor: frontmatter.backgroundColor1 }}
        >
          <Link href="/" className="logo">
            YJ
          </Link>
        </div>
        <div
          className="flex flex-row h-[30rem] justify-center items-center gap-16"
          style={{ backgroundColor: frontmatter.backgroundColor1 }}
        >
          <div className="flex flex-col gap-4 max-w-60">
            <h1>{frontmatter.title as string}</h1>
            <p>{frontmatter.description as string}</p>
          </div>
          <img src="/images/pypeline.png" className="object-none"></img>
        </div>
        {content}
      </div>
    );
  } catch {
    notFound();
  }
}

/** Convert all md files in src/projects into route segments */
export function generateStaticParams() {
  const path = join(process.cwd(), "src", "projects");
  return readdirSync(path)
    .map((project) => project.replace(".md", ""))
    .map((project) => ({
      name: project,
    }));
}
