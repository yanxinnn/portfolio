import React from "react";

type ProjectCardProps = {
  title: string;
  tag: string[];
  description: string;
};

export default function ProjectCard(props: ProjectCardProps) {
  return (
    <div>
      <img src="https://placehold.co/450x350" />
      <h3>{props.title}</h3>

      {props.tag.map((t, index) => (
        <div key={index} className="bg-slate-500">
          <div className="bg-slate-100">{t}</div>
        </div>
      ))}

      <p>{props.description}</p>
    </div>
  );
}
