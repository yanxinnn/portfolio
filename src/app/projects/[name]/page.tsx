import React, { useEffect } from "react";
import { readFileSync, readdirSync } from "fs";
import { notFound } from "next/navigation";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ImageContainer } from "@/components/ImageContainer";
import { ProjectBotNav } from "@/components/ProjectBotNav";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { Metadata } from "next";
import { serialize } from "next-mdx-remote/serialize";

type PageProps = {
  params: {
    name: string;
  };
};

type PageMeta = {
  title: string;
  description: string;
  backgroundColor: string;
  myRole: string;
  team: string;
  myTools: string;
  topBannerImage: string;
  bottomBannerImage: string;
  bottomBannerImageSpecs?: string;

  prevProjectName: string;
  prevProjectLink: string;
  nextProjectName: string;
  nextProjectLink: string;
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
        h4: (props) => (
          <p className="text-2xl font-semibold pb-6">{props.children}</p>
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
            <Link href="/" className="logo fixed">
              YJ
            </Link>
          </div>

          {/* Project banner */}
          <div
            className="flex flex-wrap justify-center items-center gap-16 pt-8 pb-32 px-12"
            style={{ backgroundColor: frontmatter.backgroundColor }}
          >
            <div className="flex flex-col gap-4 max-w-60">
              <h1>{frontmatter.title as string}</h1>
              <p>{frontmatter.description as string}</p>
            </div>
            <img
              src={frontmatter.topBannerImage}
              className="max-w-[32rem]"
            ></img>
          </div>
        </div>

        {/* Project stats */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 w-fit place-self-center -mt-12 bg-white items-center py-5 px-6 shadow-md rounded-lg mx-12">
          <div className="flex flex-col gap-2 max-w-[12rem]">
            <h3 className="projectStatsLabel">My Role</h3>
            <p className="projectStatsText whitespace-pre-wrap">
              {frontmatter.myRole}
            </p>
          </div>

          <div className="flex flex-col gap-2 self-start max-w-[13rem]">
            <h3 className="projectStatsLabel">Team</h3>
            <p className="projectStatsText whitespace-pre-wrap">
              {frontmatter.team}
            </p>
          </div>

          <div className="flex flex-col gap-2 self-start max-w-[22rem]">
            <h3 className="projectStatsLabel">My Tools</h3>
            <p className="projectStatsText whitespace-pre-wrap">
              {frontmatter.myTools}
            </p>
          </div>
        </div>

        {/* Project dependent content */}
        <div className="*:px-[max(calc((100%-56rem)/2),_3rem)] pb-16">
          {content}
        </div>

        {/* Bottom banner */}
        <div
          className={`flex justify-center ${
            frontmatter.bottomBannerImageSpecs ?? ""
          }`}
          style={{ backgroundColor: frontmatter.backgroundColor }}
        >
          <img src={frontmatter.bottomBannerImage} />
        </div>

        {/* Benchmark for scroll to top of page button */}
        <div id="targetDiv"></div>

        {/* Project bottom navigation bar */}
        <div>
          <ScrollToTopButton />
          <ProjectBotNav
            prevProjectName={frontmatter.prevProjectName}
            prevProjectLink={frontmatter.prevProjectLink}
            nextProjectName={frontmatter.nextProjectName}
            nextProjectLink={frontmatter.nextProjectLink}
          />
        </div>
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

export async function generateMetadata(props: PageProps) {
  const path = join(process.cwd(), "src", "projects", props.params.name).concat(
    ".mdx"
  );
  const file = readFileSync(path);
  const text = file.toString("utf8");

  const { frontmatter } = await serialize<any, PageMeta>(text, {
    parseFrontmatter: true,
  });

  return {
    title: `${frontmatter.title} • Yanxin Jiang Portfolio`,
  } satisfies Metadata;
}
