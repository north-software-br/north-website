"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { NORTH_N_LOGO } from "../../../public";

const links = [
  { href: "#services", label: "Serviços" },
  { href: "#projects", label: "Projetos" },
  { href: "#about", label: "Sobre" },
];

function scrollTo(href: string) {
  if (href.startsWith("#")) {
    document
      .getElementById(href.slice(1))
      ?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function DesktopNav() {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y <= lastY || y <= 50);
      setLastY(y);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={cn(
        "hidden lg:flex fixed w-full justify-center items-center mt-8 h-fit z-50",
        "transition-transform duration-500",
        visible ? "translate-y-0" : "translate-y-[-200%]",
      )}
    >
      <nav
        className={cn(
          "flex h-16 items-center gap-8 px-3 rounded-full",
          "bg-negro-900/40 backdrop-blur-xl backdrop-saturate-150",
          "border border-white/10",
          "shadow-[0_8px_40px_rgba(3,11,23,0.6),inset_0_1px_0_rgba(255,255,255,0.06)]",
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="North Software — início"
          className="inline-flex h-12 w-10 items-center justify-center overflow-hidden ml-1"
        >
          <Image
            src={NORTH_N_LOGO}
            width={170}
            height={168}
            alt="North Software — início"
            className="h-full w-full object-contain"
          />
        </Link>

        {/* Links */}
        <ul className="flex items-center gap-1 text-sm font-medium text-cumaru-300">
          {links.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(href);
                }}
                className="px-3 py-2 rounded-lg hover:bg-white/6 hover:text-cumaru-100 transition-colors duration-200"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className={cn(
            "inline-flex items-center gap-2 px-5 py-2 rounded-full",
            "bg-taruma-400 hover:bg-taruma-500 text-negro-900",
            "font-semibold text-sm transition-colors duration-200",
          )}
        >
          Fale conosco
        </Link>
      </nav>
    </header>
  );
}
