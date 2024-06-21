type ImageContainerProps = {
  images: string[];
  description?: string;
  bordered?: boolean;
};

export function ImageContainer(props: ImageContainerProps) {
  return (
    <div className="flex flex-col gap-4 items-center pt-2 pb-6">
      <div className="self-stretch grid grid-flow-row sm:grid-flow-col gap-8 sm:gap-4 place-content-center">
        {/* Images */}
        {props.images.map((image) => (
          <img
            key={image}
            src={image}
            className={
              props.bordered ? "rounded-lg border border-[#D9DDE1]" : ""
            }
            alt={props.description}
          />
        ))}
      </div>

      {/* Description */}
      {props.description && (
        <p className="font-body italic text-sm font-medium text-stone-400 text-center">
          {props.description}
        </p>
      )}
    </div>
  );
}
