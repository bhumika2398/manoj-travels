import { cn } from "@/lib/utils";

export function Container({ as: Tag = "div", className, children, ...props }) {
  return (
    <Tag className={cn("container-edge mx-auto w-full max-w-7xl", className)} {...props}>
      {children}
    </Tag>
  );
}
