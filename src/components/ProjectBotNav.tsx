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
    <div className="flex flex-row justify-between gap-8 py-4 sm:py-8 px-4 lg:px-16">
      {/* Previous project */}
      {props.prevProjectLink && (
        <Link
          href={props.prevProjectLink}
          className="hover:text-lightAccent-300"
        >
          <div className="flex flex-row flex-wrap gap-x-4 items-center justify-start">
            <ArrowIcon className="transform scale-[-1]" />

            <div className="text-left">
              <p>Previous</p>
              <h2>{props.prevProjectName}</h2>
            </div>
          </div>
        </Link>
      )}

      <div className="grow" />

      {/* Next project */}
      {props.nextProjectLink && (
        <Link
          href={props.nextProjectLink}
          className="hover:text-lightAccent-300"
        >
          <div className="flex flex-row flex-wrap-reverse gap-x-4 items-center justify-end">
            <div className="text-right">
              <p>Next</p>
              <h2>{props.nextProjectName}</h2>
            </div>

            <ArrowIcon />
          </div>
        </Link>
      )}
    </div>
  );
}
