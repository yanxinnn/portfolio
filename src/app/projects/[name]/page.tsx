import { readFileSync, readdirSync } from "fs";
import { notFound } from "next/navigation";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ImageContainer } from "@/components/ImageContainer";

type PageProps = {
  params: {
    name: string;
  };
};

type PageMeta = {
  title: string;
  description: string;
  backgroundColor: string;
};

export default async function Page(props: PageProps) {
  try {
    const path = join(
      process.cwd(),
      "src",
      "projects",
      props.params.name
    ).concat(".mdx");
    const file = readFileSync(path);
    const text = file.toString("utf8");

    const { content, frontmatter } = await compileMDX<PageMeta>({
      source: text,
      components: {
        h1: (props) => (
          <h1 className="font-medium text-[2rem] inline-block mt-12">
            {props.children}
            <div
              className="h-[0.3125rem] w-full mt-0.5 mb-6"
              style={{ backgroundColor: frontmatter.backgroundColor }}
            ></div>
          </h1>
        ),
        h2: (props) => (
          <p className="text-2xl font-semibold pt-10 pb-6">{props.children}</p>
        ),
        h3: (props) => (
          <p className="text-2xl text-center py-8 leading-9 font-medium mx-16">
            {props.children}
          </p>
        ),
        ul: (props) => (
          <ul className="list-disc *:ml-12 font-body leading-8 font-normal text-lg">
            {props.children}
          </ul>
        ),
        ImageContainer,
      },
      options: {
        parseFrontmatter: true,
      },
    });

    return (
      <div className="flex flex-col">
        {/* Header */}
        <div>
          <div
            className="header"
            style={{ backgroundColor: frontmatter.backgroundColor }}
          >
            <Link href="/" className="logo">
              YJ
            </Link>
          </div>

          {/* Project banner */}
          <div
            className="flex flex-wrap justify-center items-center gap-16 pb-32 px-12"
            style={{ backgroundColor: frontmatter.backgroundColor }}
          >
            <div className="flex flex-col gap-4 max-w-60">
              <h1>{frontmatter.title as string}</h1>
              <p>{frontmatter.description as string}</p>
            </div>
            <img
              src="/images/pypeLine/pypeLine0.png"
              className="max-w-[32rem]"
            ></img>
          </div>
        </div>

        {/* Project stats */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 w-fit place-self-center -mt-12 bg-white items-center py-5 px-6 shadow-md rounded-lg mx-12">
          <div className="flex flex-col gap-2 max-w-[12rem]">
            <h3 className="projectStatsLabel">My Role</h3>
            <p className="projectStatsText">
              UX Designer, <br />
              Front-end Developer
            </p>
          </div>

          <div className="flex flex-col gap-2 self-start max-w-[13rem]">
            <h3 className="projectStatsLabel">Team</h3>
            <p className="projectStatsText">
              3 product managers, <br />1 designer, 17+ engineers
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
        <div className="*:px-[max(calc((100%-56rem)/2),_3rem)]">{content}</div>
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
    .map((project) => project.replace(".mdx", ""))
    .map((project) => ({
      name: project,
    }));
}
