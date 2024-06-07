import Link from "next/link";
import { ArrowIcon } from "./icons/ArrowIcon";

type ProjectBotNavProps = {
  prevProjectName?: string;
  prevProjectLink?: string;
  nextProjectName?: string;
  nextProjectLink?: string;
};

export function ProjectBotNav(props: ProjectBotNavProps) {
  return (
    <div className="flex flex-row h-36 items-center px-16">
      {/* Previous project */}
      {props.prevProjectLink && (
        <Link href={props.prevProjectLink} className="group">
          <div className="flex flex-row gap-4 items-center group-hover:text-lightAccent-300">
            <ArrowIcon className="scale-[-1] group-hover:stroke-lightAccent-300" />
            <div className="flex flex-col text-left">
              <p>Previous</p>
              <h2>{props.prevProjectName}</h2>
            </div>
          </div>
        </Link>
      )}

      <div className="grow" />

      {/* Next project */}
      {props.nextProjectLink && (
        <Link href={props.nextProjectLink} className="group">
          <div className="flex flex-row gap-4 items-center group-hover:text-lightAccent-300">
            <div className="flex flex-col text-right">
              <p>Next</p>
              <h2>{props.nextProjectName}</h2>
            </div>
            <ArrowIcon className="group-hover:stroke-lightAccent-300" />
          </div>
        </Link>
      )}
    </div>
  );
}
