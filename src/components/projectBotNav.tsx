import Link from "next/link";

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
        <Link href={props.prevProjectLink}>
          <div className="flex flex-row gap-4">
            <img src="/images/arrowIcon.svg" className="transform scale-[-1]" />
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
        <Link href={props.nextProjectLink}>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col text-right">
              <p>Next</p>
              <h2>{props.nextProjectName}</h2>
            </div>
            <img src="/images/arrowIcon.svg" />
          </div>
        </Link>
      )}
    </div>
  );
}
