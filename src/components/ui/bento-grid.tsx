import { cn } from "@/lib/utils";
import { MacosWindow } from "./macos-window";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn("grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto", className)}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  type = "small",
  img,
  imgWidth,
  imgClassName,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  type?: "large" | "small";
  img?: string;
  imgWidth?: number;
  imgClassName?: string;
}) => {
  if (type === "large") {
    return (
      <div
        className={cn(
          "overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col",
          className,
        )}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-120 h-120 rounded-full bg-accent/20 blur-3xl pointer-events-none" />

        {img && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="px-6 pt-6 pb-2 flex flex-col gap-1">
              <div className="text-accent text-xs font-semibold uppercase tracking-wide">
                {description}
              </div>
              <h3 className="text-lg lg:text-xl font-bold">{title}</h3>
            </div>
            <div className="flex-1 px-6 pb-0 overflow-hidden">
              <MacosWindow
                imageSrc={img}
                imageClassName={cn("w-full object-cover object-top", imgClassName)}
              />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col",
        className,
      )}
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden">
        {img && (
          <img
            src={img}
            alt=""
            width={imgWidth}
            className={cn(
              "transition duration-200 group-hover/bento:scale-105 max-h-60 object-contain",
              imgClassName,
            )}
          />
        )}
      </div>
      <div className="p-6 pt-2 flex flex-col gap-1">
        <p className="text-accent text-xs font-semibold uppercase tracking-wide">
          {description}
        </p>
        <h3 className="text-lg lg:text-xl font-bold">{title}</h3>
      </div>
    </div>
  );
};
