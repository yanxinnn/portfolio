import React from "react";
import { ProjectCard } from "@/components/ProjectCard";

export default function Home() {
  return (
    <div className="bg-earthy-50 flex flex-col items-center">
      {/* header */}
      <div className="font-header  self-stretch flex px-12 py-6">
        <div className="logo">YJ</div>

        <div className="font-medium flex gap-12">
          <a>About</a>
          <a>Work</a>
          <a>Resume</a>
        </div>
      </div>

      {/* intro */}
      <div className="flex pt-16 gap-8 max-w-2xl">
        <div className="flex flex-col gap-4">
          <h1>Hey, I'm Yanxin (yang-sheen)!</h1>

          <p className="leading-7 pb-20">
            A <span className="text-accent">UX Designer and Developer</span>{" "}
            passionate about creating impactful, delightful, and human
            experiences.
          </p>
        </div>

        <img
          src="/images/yanxin.gif"
          alt="A pixelated Yanxin GIF"
          className="transform scale-x-[-1] object-none self-end bg-auto"
        />
      </div>

      {/* projects */}
      <div className="bg-white self-stretch p-16">
        <div className="grid grid-cols-2 max-w-4xl m-auto gap-x-16 gap-y-24">
          <ProjectCard
            title="Pypeline"
            image="images/pypelineCard.png"
            tag={["SaaS", "Data Lifecycle Management"]}
            description="A SaaS application empowering data professionals to streamline data lifecycle operations."
          />
          <ProjectCard
            title="Float-it Notes"
            image="images/floatItNotesCard.png"
            tag={["Chrome Extension", "Productivity"]}
            description="A Chrome extension helping students to keep track of their tasks in a stress-free way."
          />
        </div>
      </div>

      {/* link to interactive portfolio */}
      <div className="pt-16 flex gap-16">
        <img
          src="/images/yanxin.gif"
          alt="A pixelated Yanxin GIF"
          className="transform object-none self-end bg-auto"
        />

        <div className="flex flex-col">
          <h3>Got a bit more time to sp-hare?</h3>
          <button className="bg-yellow-200 p-2">Click me!</button>
        </div>
      </div>

      <div className="bg-earthy-700 text-white self-stretch flex flex-col items-center py-8 gap-4">
        <p>yanxinjiang@live.com</p>

        <p>(LinkedIn Icon)</p>
      </div>
    </div>
  );
}
