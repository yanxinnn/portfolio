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
    <a href={"projects/" + props.pageLink}>
      <div className="flex flex-col gap-5">
        {/* project image */}
        <div className={`${props.backgroundColor} flex rounded-xl h-[22.5rem]`}>
          <img src={props.image} className="object-contain px-10" />
        </div>

        {/* title and tags */}
        <div className="flex flex-col gap-3">
          <h2>{props.title}</h2>

          <div className="flex flex-wrap gap-3">
            {props.tags.map((tag) => (
              <div key={tag} className="bg-neutral-150 rounded-full">
                <h3>{tag}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* description */}
        <p>{props.description}</p>
      </div>
    </a>
  );
}
