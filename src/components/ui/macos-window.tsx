import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Compare } from "./compare";
import Image from "next/image";

export interface MacosWindowProps extends HTMLAttributes<HTMLDivElement> {
  imageSrc?: string;
  secondImageSrc?: string;
  title?: string;
  imageClassName?: string;
  compareSlideMode?: "hover" | "drag";
  imageWidth?: number;
  imageHeight?: number;
}

export function MacosWindow({
  imageSrc,
  secondImageSrc,
  title,
  imageClassName,
  compareSlideMode = "hover",
  imageWidth = 1200,
  imageHeight = 800,
  className,
  ...props
}: MacosWindowProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl",
        className,
      )}
      {...props}
    >
      <div className="flex lg:h-7 h-5 items-center gap-1.5 border-b border-white/10 bg-[#2a2a2a] px-4">
        <span className=" h-2 w-2 rounded-full bg-[#ff5f57]" />
        <span className=" h-2 w-2 rounded-full bg-[#febc2e]" />
        <span className=" h-2 w-2 rounded-full bg-[#28c840]" />
        {title && (
          <span className="flex-1 text-center text-xs text-white/40 select-none">
            {title}
          </span>
        )}
      </div>

      {imageSrc && secondImageSrc ? (
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <Compare
            firstImage={imageSrc}
            secondImage={secondImageSrc}
            slideMode={compareSlideMode}
            firstImageClassName="object-cover object-top"
            secondImageClassname="object-cover object-top"
            className={cn(
              "absolute! inset-0! w-full! h-full! rounded-none",
              imageClassName,
            )}
          />
        </div>
      ) : imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          width={imageWidth}
          height={imageHeight}
          unoptimized={imageSrc.endsWith(".svg")}
          sizes="(max-width: 768px) 100vw, 60vw"
          className={cn("block w-full object-cover object-top", imageClassName)}
        />
      ) : null}
    </div>
  );
}
