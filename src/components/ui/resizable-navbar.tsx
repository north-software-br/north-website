"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";


interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    setVisible(latest > 100);
    if (latest > 800) {
      setHidden(latest > previous);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  return (
    <motion.div
      ref={ref}
      animate={{ y: hidden ? "-120%" : "0%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      initial={{
        maxWidth: "820px",
        backgroundColor: "rgba(3,11,23,0.4)",
        boxShadow: "0 8px 40px rgba(3,11,23,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px) saturate(150%)",
      }}
      animate={{
        maxWidth: visible ? "560px" : "820px",
        backgroundColor: "rgba(3,11,23,0.4)",
        boxShadow: "0 8px 40px rgba(3,11,23,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
        backdropFilter: "blur(16px) saturate(150%)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-60 mx-auto mt-8 hidden w-full h-16 flex-row items-center justify-between gap-8 self-start rounded-full",
        "border border-white/10 px-3 lg:flex",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 hidden flex-row items-center justify-center gap-1 text-sm font-medium lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}

          className="relative px-4 py-2 text-cumaru-300 hover:text-cumaru-100 transition-colors duration-200"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/8"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className }: MobileNavProps) => {
  return (
    <motion.div
      initial={{
        backgroundColor: "rgba(3,11,23,0.4)",
        backdropFilter: "blur(16px) saturate(150%)",
      }}
      animate={{
        backgroundColor: "rgba(3,11,23,0.4)",
        backdropFilter: "blur(16px) saturate(150%)",
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto mt-6 flex w-[calc(100%-3rem)] flex-col items-center justify-between rounded-full",
        "border border-white/10 px-5 py-3 lg:hidden",
        "shadow-[0_8px_40px_rgba(3,11,23,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose: _onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 28 }}
          className={cn(
            "flex w-full flex-col items-start justify-start gap-4 overflow-hidden pt-5",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-cumaru-200 cursor-pointer" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-cumaru-200 cursor-pointer" onClick={onClick} />
  );
};
