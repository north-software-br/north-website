import { IconArrowRight } from "@tabler/icons-react"

import { cn } from "@/lib/utils"

export function InteractiveHoverButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border border-brand/40 bg-transparent p-2 px-6 text-center font-semibold text-brand",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        <div className="h-2 w-2 rounded-full bg-brand transition-all duration-300 group-hover:scale-[100.8]" />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>
      <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-brand-foreground opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
        <span>{children}</span>
        <IconArrowRight size={16} />
      </div>
    </button>
  )
}
