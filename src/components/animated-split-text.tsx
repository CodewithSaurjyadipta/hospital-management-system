"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedSplitTextProps {
  text: string;
  el?: keyof JSX.IntrinsicElements;
  className?: string;
}

export function AnimatedSplitText({
  text,
  el: Wrapper = "h1",
  className,
}: AnimatedSplitTextProps) {
  const letters = text.split("");

  return (
    <Wrapper className={cn("relative overflow-hidden", className)}>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: "circOut",
        }}
        className="inline-block"
      >
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={cn(
              "inline-block",
              letter === " " ? "w-[0.25em]" : ""
            )}
          >
            {letter}
          </span>
        ))}
      </motion.span>
    </Wrapper>
  );
}
