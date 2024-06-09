type VideoContainerProps = {
  videos: string[];
  description?: string;
  controls?: boolean;
  bordered?: boolean;
  muted?: boolean;
  autoplay?: boolean;
};

export function VideoContainer(props: VideoContainerProps) {
  return (
    <div className="flex flex-col gap-4 items-center pt-2 pb-6">
      <div className="self-stretch grid grid-flow-col gap-2 md:gap-4 place-content-center">
        {/* Video */}
        {props.videos.map((vid) => (
          <video
            preload="metadata"
            controls={props.controls}
            muted={props.muted}
            autoPlay={props.autoplay}
            className={props.bordered ? "rounded-lg" : ""}
          >
            <source src={vid} type="video/mp4" />
          </video>
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
