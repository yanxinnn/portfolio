import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { GameIcon } from "@/components/icons/GameIcon";

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
          {/* <a>About</a>
          <a>Projects</a>
          <a>Resume</a> */}
        </div>
      </div>

      {/* Intro */}
      <div className="flex flex-row pt-24 gap-12 max-w-[48rem] mx-12">
        <div className="flex flex-col gap-10 pb-4">
          <h1 className="text-earthy-500">Hey, I'm Yanxin (yang-sheen)!</h1>

          <h4 className="pb-32 leading-9">
            A <span className="text-accent">UX Designer and Developer</span>{" "}
            passionate about creating impactful, delightful, and human
            experiences.
          </h4>

          {/* <Link href="/images/YanxinJiang_Resume.pdf" target="blank">
            Resume
          </Link> */}
        </div>

        <img
          src="/images/yanxin.gif"
          alt="A pixelated Yanxin GIF"
          className="transform scale-x-[-1] object-none self-end bg-auto"
        />
      </div>

      {/* Projects */}
      <div className="bg-white self-stretch pt-20 pb-28 px-12">
        <div className="grid grid-cols-2 max-w-[62rem] m-auto gap-x-[4.5rem] gap-y-24">
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
      <div className="flex flex-row pt-20 gap-48 mx-12">
        <img
          src="/images/bunny.gif"
          alt="A pixelated bunny GIF"
          className="transform object-none self-end bg-auto"
        />

        <div className="flex flex-col gap-5 items-center pb-20">
          <h2 className="text-earthy-500">Got a bit more time to sp-hare?</h2>
          <Link href="game/home.html">
            <button className="flex flex-row gap-4 bg-lightAccent-100 hover:bg-lightAccent-200">
              <GameIcon />
              Check out my interactive portfolio!
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-earthy-500 self-stretch text-white flex justify-center py-3">
        <div className="font-body font-normal text-base">
          Coded with ❤ by Yanxin Jiang
        </div>
      </div>

      {/* Footer with contact info */}
      {/* <div className="bg-earthy-500 text-white self-stretch flex flex-col items-center py-8 gap-4">
        <Link
          href="mailto:yanxinjiang@live.com"
          target="_blank"
          className="underline font-body leading-8 font-normal text-lg hover:text-lightAccent-100"
        >
          yanxinjiang@live.com
        </Link>

        <Link href="https://www.linkedin.com/in/yanxinn/" target="_blank">
          <LinkedinIcon />
        </Link>
      </div> */}
    </div>
  );
}
