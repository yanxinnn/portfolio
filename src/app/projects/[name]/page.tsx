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
      <div className="flex flex-col gap-12">
        {/* Header */}
        <div>
          <div
            className="header"
            style={{ backgroundColor: frontmatter.backgroundColor1 }}
          >
            <Link href="/" className="logo">
              YJ
            </Link>
          </div>

          {/* Project banner */}
          <div
            className="flex flex-wrap justify-center items-center gap-16 pb-32"
            style={{ backgroundColor: frontmatter.backgroundColor1 }}
          >
            <div className="flex flex-col gap-4 max-w-60">
              <h1>{frontmatter.title as string}</h1>
              <p>{frontmatter.description as string}</p>
            </div>
            <img src="/images/pypeline.png" className="object-none"></img>
          </div>
        </div>

        {/* Project stats */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 w-fit place-self-center -mt-24 bg-white items-center py-5 px-6 shadow-md rounded-lg">
          <div className="flex flex-col gap-2 max-w-[12rem]">
            <h3 className="projectStatsLabel">My Role</h3>
            <p className="projectStatsText">
              UX Designer, <br></br>Front-end Developer
            </p>
          </div>

          <div className="flex flex-col gap-2 self-start max-w-[13rem]">
            <h3 className="projectStatsLabel">Team</h3>
            <p className="projectStatsText">
              3 product managers, <br></br>1 designer, 17+ engineers
            </p>
          </div>

          <div className="flex flex-col gap-2 self-start max-w-[22rem]">
            <h3 className="projectStatsLabel">My Tools</h3>
            <p className="projectStatsText">
              Figma, JavaScript (React), HTML/CSS, Bitbucket, JIRA
            </p>
          </div>
        </div>

        {/* Project dependent content */}
        <div className="max-w-[56rem] self-center">{content}</div>
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
