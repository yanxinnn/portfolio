type ProjectCardProps = {
  title: string;
  image: string;
  backgroundColor: string;
  tags: string[];
  description: string;
};

export function ProjectCard(props: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-5">
      {/* project image */}
      <div className={`${props.backgroundColor} flex p-8 rounded`}>
        <img src={props.image} />
      </div>

      {/* title and tags */}
      <div className="flex flex-col gap-3">
        <h3>{props.title}</h3>

        <div className="flex flex-wrap gap-3">
          {props.tags.map((tag) => (
            <div
              key={tag}
              className="bg-neutral-150 rounded-full px-3 tracking-wider text-sm font-body uppercase text-stone-500"
            >
              <p className="font-medium">{tag}</p>
            </div>
          ))}
        </div>
      </div>

      {/* description */}
      <p>{props.description}</p>
    </div>
  );
}
