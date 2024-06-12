import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { GameIcon } from "@/components/icons/GameIcon";
import { ExternalLinkIcon } from "@/components/icons/ExternalLinkIcon";
import { CopyEmailButton } from "@/components/CopyEmailButton";

export default function Home() {
  return (
    <div className="bg-[#fef2ec] flex flex-col items-center">
      {/* Header */}
      <div className="header">
        <Link href="/" className="logo text-earthy-500 fixed">
          YJ
        </Link>

        <div className="grow"></div>

        <div className="navBar">
          {/* Contact info */}
          <Link
            href="https://www.linkedin.com/in/yanxinn/"
            target="_blank"
            className="navBarItem"
          >
            Linkedin
          </Link>

          <CopyEmailButton />

          <div className="flex flex-row gap-2 group">
            <Link href="/images/YanxinJiang_Resume.pdf" target="blank">
              <div className="text-stone-550 group-hover:text-lightAccent-300">
                Resume
              </div>
            </Link>
            <ExternalLinkIcon className="group-hover:stroke-lightAccent-300" />
          </div>
        </div>
      </div>

      {/* Intro */}
      <div className="flex flex-col md:flex-row pt-10 sm:pt-24 gap-2 lg:gap-12 max-w-[48rem] mx-8 sm:mx-20">
        <div className="flex flex-col gap-10 pb-4 md:pb-40">
          <h1 className="text-earthy-500">Hey, I'm Yanxin (yang-sheen)!</h1>

          <h4 className="leading-9">
            A <span className="text-accent">UX Designer and Developer</span>{" "}
            passionate about creating impactful, delightful, and human
            experiences.
          </h4>
        </div>

        <img
          src="/images/yanxin.gif"
          alt="A pixelated Yanxin GIF"
          className="transform scale-x-[-1] object-none self-end bg-auto"
        />
      </div>

      {/* Projects */}
      <div className="bg-white self-stretch pt-20 pb-28 px-8 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-[62rem] m-auto gap-x-[4.5rem] gap-y-24">
          <ProjectCard
            title="Pypeline"
            pageLink="pypeline"
            image="images/pypeLine/pypeLine.png"
            backgroundColor="bg-[#d1d8f3]"
            tags={["SaaS", "Data Lifecycle Management"]}
            description="A SaaS application empowering data professionals to streamline data lifecycle operations."
          />
          <ProjectCard
            title="Float-it Notes"
            pageLink="float-it-notes"
            image="images/floatitNotes/floatitNotes.png"
            backgroundColor="bg-[#bee6ee]"
            tags={["Chrome Extension", "Productivity"]}
            description="A Chrome extension helping students to keep track of their tasks in a stress-free way."
          />
        </div>
      </div>

      {/* Link to interactive portfolio */}
      <div className="flex flex-col sm:flex-row pt-12 md:pt-20 gap-0 sm:gap-16 lg:gap-40 mx-8 sm:mx-12">
        <img
          src="/images/bunny.gif"
          alt="A pixelated bunny GIF"
          className="transform object-none self-center sm:self-end bg-auto order-last sm:order-first"
        />

        <div className="flex flex-col gap-5 items-center pb-20">
          <h2 className="text-earthy-500 text-center">
            Got a bit more time to sp-hare?
          </h2>
          <Link href="game/home.html">
            <button className="flex flex-col items-center md:flex-row gap-2 md:gap-4 bg-lightAccent-100 hover:bg-lightAccent-200">
              <GameIcon />
              Check out my interactive portfolio!
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-earthy-500 self-stretch text-white flex justify-center py-3">
        <div className="font-body font-normal text-base">
          Coded with &#10084; by Yanxin Jiang
        </div>
      </div>
    </div>
  );
}
