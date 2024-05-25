import React from "react";
import ProjectCard from "@/projectCard";

export default function Home() {
  return (
    <div className="w-screen bg-slate-200">
      <div className="bg-slate-400 p-2 flex">
        <h3 className="grow">YJ</h3>
        <div className="flex gap-12">
          <a>About</a>
          <a>Work</a>
          <a>Resume</a>
        </div>
      </div>

      <div className="bg-slate-500 flex max-w-3xl m-auto py-8">
        <div>
          <h1>Hey, I'm Yanxin (yang-sheen)!</h1>
          <p>
            A UX Designer and Developer passionate about creating impactful,
            delightful, and human experiences.
          </p>
        </div>
        <img
          src="/assets/yanxin.gif"
          alt="A pixelated Yanxin GIF"
          className="transform scale-x-[-1]"
        />
      </div>

      <div className="grid grid-cols-2 max-w-3xl m-auto gap-x-16 gap-y-24">
        <ProjectCard
          title="Pypeline"
          tag={["SaaS", "Data Lifecycle Management"]}
          description="Designing a SaaS application empowering data professionals to streamline data lifecycle operations."
        />
      </div>
    </div>
  );
}
4;
