import Link from "next/link";

type ProjectCardProps = {
  title: string;
  pageLink: string;
  image: string;
  backgroundColor: string;
  tags: string[];
  description: string;
};

export function ProjectCard(props: ProjectCardProps) {
  return (
    <Link
      href={"projects/" + props.pageLink}
      className="group hover:bg-neutral-100 rounded-xl p-5 sm:p-7"
    >
      <div className="flex flex-col gap-5">
        {/* Project image */}
        <div
          className={`${props.backgroundColor} flex rounded-xl h-[16rem] md:h-[22.5rem]`}
        >
          <img
            src={props.image}
            className="object-contain p-6 sm:p-8 md:p-10 group-hover:scale-[1.08] transition ease-in-out"
          />
        </div>

        {/* Title and tags */}
        <div className="flex flex-col gap-3">
          <h2>{props.title}</h2>

          <div className="flex flex-wrap gap-3">
            {props.tags.map((tag) => (
              <div
                key={tag}
                className="bg-neutral-150 group-hover:bg-neutral-200 rounded-full"
              >
                <h3>{tag}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <p>{props.description}</p>
      </div>
    </Link>
  );
}
