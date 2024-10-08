import React, { useEffect } from "react";
import { readFileSync, readdirSync } from "fs";
import { notFound } from "next/navigation";
import { join } from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ImageContainer } from "@/components/ImageContainer";
import { VideoContainer } from "@/components/VideoContainer";
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
  backgroundColorLight: string;
  myRole: string;
  team: string;
  myTools: string;
  topBannerImage: string;
  bottomBannerImage?: string;
  bottomBannerVideo?: string;
  bottomBannerPrototype?: string;
  bottomBannerContentSpecs?: string;

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
        // Section titles
        h1: (props) => (
          <h1 className="font-medium text-[1.75rem] md:text-[2rem] inline-block mt-12">
            {props.children}
            <div
              className="h-[0.3125rem] w-full mt-0.5 mb-6"
              style={{ backgroundColor: frontmatter.backgroundColor }}
            ></div>
          </h1>
        ),
        // Section subtitles (with top padding)
        h2: (props) => (
          <p className="text-xl md:text-2xl font-semibold pt-10 pb-6">
            {props.children}
          </p>
        ),
        // Spotlight centered text
        h3: (props) => (
          <p className="text-xl md:text-2xl text-center py-8 leading-9 font-medium mx-8 md:mx-16">
            {props.children}
          </p>
        ),
        // Section subtitle (without top padding)
        h4: (props) => (
          <p className="text-xl md:text-2xl font-semibold pb-6">
            {props.children}
          </p>
        ),
        // Bullet point indent
        ul: (props) => (
          <ul className="list-disc *:ml-12 font-body leading-8 font-normal text-base md:text-lg">
            {props.children}
          </ul>
        ),
        p: (props) => <p className="leading-8">{props.children}</p>,
        ImageContainer,
        VideoContainer,
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
            className="flex flex-wrap justify-center items-center gap-16 pt-8 pb-32 px-4 md:px-8 lg:px-12"
            style={{ backgroundColor: frontmatter.backgroundColor }}
          >
            <div className="flex flex-col gap-4 max-w-auto lg:max-w-60 text-center lg:text-left">
              <h1>{frontmatter.title as string}</h1>
              <h4>{frontmatter.description as string}</h4>
            </div>
            <ImageContainer
              className={"bg-cover md:max-w-[32rem]"}
              images={[frontmatter.topBannerImage]}
            />
          </div>
        </div>

        {/* Project stats */}
        <div className="flex flex-wrap gap-x-16 gap-y-6 w-fit place-self-center -mt-12 bg-white items-center py-5 px-6 shadow-md rounded-lg mx-8 md:mx-12">
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
        <div className="*:px-4 sm:*:px-8 lg:*:px-[max(calc((100%-56rem)/2),_3rem)] pb-16">
          {content}
        </div>

        {/* Bottom banner */}
        <div
          className={`flex justify-center ${
            frontmatter.bottomBannerContentSpecs ?? ""
          }`}
          style={{ backgroundColor: frontmatter.backgroundColor }}
        >
          {frontmatter.bottomBannerImage && (
            <img src={frontmatter.bottomBannerImage} />
          )}

          {frontmatter.bottomBannerVideo && (
            <video preload="metadata" controls className="max-w-4xl rounded-lg">
              <source src={frontmatter.bottomBannerVideo} type="video/mp4" />
            </video>
          )}

          <iframe
            src={frontmatter.bottomBannerPrototype}
            allowFullScreen
            width="500"
            height="800"
            style={
              !frontmatter.bottomBannerPrototype ? { display: "none" } : {}
            }
          ></iframe>
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
