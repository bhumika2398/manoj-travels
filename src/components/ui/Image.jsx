import NextImage from "next/image";
import { cn } from "@/lib/utils";

/** Thin wrapper around next/image with sensible fill+cover defaults. */
export function Image({ className, wrapperClassName, fill = true, sizes, ...props }) {
  if (fill) {
    return (
      <div className={cn("relative overflow-hidden", wrapperClassName)}>
        <NextImage
          fill
          sizes={sizes || "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className={cn("object-cover", className)}
          {...props}
        />
      </div>
    );
  }
  return <NextImage className={className} {...props} />;
}
