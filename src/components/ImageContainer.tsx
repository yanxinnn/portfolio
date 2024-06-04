type ImageContainerProps = {
  images: string[];
  description?: string;
  imageBordered?: boolean;
};

export function ImageContainer(props: ImageContainerProps) {
  return (
    <div className="flex flex-col gap-4 items-center pt-2 pb-6">
      <div className="self-stretch grid grid-flow-col gap-4 place-content-center">
        {/* project image */}
        {props.images.map((image) => (
          <img
            key={image}
            src={image}
            className={
              props.imageBordered ? "rounded-lg border border-[#D9DDE1]" : ""
            }
          />
        ))}
      </div>

      {/* description */}
      {props.description && (
        <p className="font-body italic text-sm font-medium text-stone-400">
          {props.description}
        </p>
      )}
    </div>
  );
}
