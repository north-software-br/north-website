"use client";

import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IconArrowRight, IconCheck, IconLoader2 } from "@tabler/icons-react";

type ButtonState = "idle" | "loading" | "success";

interface AnimatedButtonProps {
  type?: "submit" | "button" | "reset";
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  state?: ButtonState;
  onClick?: () => void;
}

export function AnimatedButton({
  type = "button",
  children,
  className,
  disabled,
  state = "idle",
  onClick,
}: AnimatedButtonProps) {
  const [hovered, setHovered] = useState(false);

  const isDisabled = disabled || state === "loading";

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: isDisabled ? 1 : 1.015 }}
      whileTap={{ scale: isDisabled ? 1 : 0.975 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(
        "relative w-full h-11 overflow-hidden rounded-xl cursor-pointer",
        "bg-taruma-400 text-negro-900 font-medium text-sm",
        "flex items-center justify-center gap-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {/* shimmer on hover */}
      <AnimatePresence>
        {hovered && !isDisabled && (
          <motion.span
            key="shimmer"
            initial={{ x: "-100%", opacity: 0.6 }}
            animate={{ x: "200%", opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
            className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="flex"
            >
              <IconLoader2 size={16} />
            </motion.span>
            Enviando...
          </motion.span>
        )}

        {state === "success" && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            className="flex items-center gap-2"
          >
            <IconCheck size={16} />
            Mensagem enviada!
          </motion.span>
        )}

        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2"
          >
            {children}
            <motion.span
              animate={{ x: hovered ? 3 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <IconArrowRight size={16} />
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
