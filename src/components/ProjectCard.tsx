import React from "react";

type ProjectCardProps = {
  title: string;
  image: string;
  tag: string[];
  description: string;
};

export function ProjectCard(props: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* project image */}
      <img src={props.image} />

      {/* title and tags */}
      <div className="flex flex-col gap-3">
        <h3>{props.title}</h3>

        <div className="flex flex-wrap gap-3">
          {props.tag.map((tag) => (
            <div key={tag} className="bg-neutral-150 rounded-full py-1 px-3">
              <p className="tracking-wider text-sm font-body uppercase font-medium text-stone-500">
                {tag}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* description */}
      <p>{props.description}</p>
    </div>
  );
}
