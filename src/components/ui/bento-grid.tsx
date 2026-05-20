import { cn } from "@/lib/utils";
import { MacosWindow } from "./macos-window";
import { TextGenerateEffect } from "./text-generate-effect";
import { Terminal } from "./terminal";
import { ArchBeamDiagram } from "./arch-beam-diagram";

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
  terminalCommands,
  terminalOutputs,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  type?: "large" | "small" | "terminal" | "beam";
  img?: string;
  imgWidth?: number;
  imgClassName?: string;
  terminalCommands?: string[];
  terminalOutputs?: Record<number, string[]>;
}) => {
  if (type === "beam") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col",
          className,
        )}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="flex-1 flex items-center justify-center p-6 pt-10 overflow-hidden">
          <ArchBeamDiagram className="w-full h-full" />
        </div>
        <div className="p-6 pt-2 flex flex-col gap-1">
          <p className="text-lg lg:text-lg font-normal tracking-wide">
            {description}
          </p>
          <h3 className="text-xs lg:text-[1.1rem] font-normal text-cumaru-400">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  if (type === "terminal") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-3xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col",
          className,
        )}
      >
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">
          <Terminal
            commands={terminalCommands ?? []}
            outputs={terminalOutputs ?? {}}
            username="north-dev"
            typingSpeed={40}
            delayBetweenCommands={900}
            enableSound={false}
            className="w-full max-w-none px-0 text-[10px]"
            contentClassName="h-60"
          />
        </div>
        <div className="p-6 pt-2 flex flex-col gap-1">
          <p className="text-lg lg:text-lg font-normal tracking-wide">
            {description}
          </p>
          <h3 className="text-xs lg:text-[1.1rem] font-normal text-cumaru-400">
            {title}
          </h3>
        </div>
      </div>
    );
  }

  if (type === "large") {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-4xl bg-negro-700 group/bento hover:shadow-xl transition duration-200 flex flex-col",
          className,
        )}
      >
        <div className="absolute right-0 top-1/6 -translate-y-1/2 w-505 h-205 rounded-full bg-taruma-500/20 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center text-center px-6 pt-8 gap-1">
          <TextGenerateEffect words={typeof title === "string" ? title : ""} />
        </div>

        {img && (
          <div className="flex-1 px-6 overflow-hidden">
            <div
              className="relative mx-auto w-[80%] -bottom-15 border-4 border-[#6C6C6C] p-2 md:p-4 bg-[#222222] rounded-[30px] shadow-2xl"
              style={{
                boxShadow:
                  "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
              }}
            >
              <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900">
                <MacosWindow
                  imageSrc={img}
                  imageClassName={cn(
                    "w-full object-cover object-top",
                    imgClassName,
                  )}
                />
              </div>
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
        <p className=" text-lg lg:text-lg font-normal  tracking-wide">
          {description}
        </p>
        <h3 className="text-xs lg:text-[1.1rem] font-normal text-cumaru-400">
          {title}
        </h3>
      </div>
    </div>
  );
};
