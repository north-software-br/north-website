"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NORTH_N_LOGO } from "../../../public";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

const navLinks = [
  { name: "Serviços", link: "#services" },
  { name: "Projetos", link: "#projects" },
  { name: "Sobre",    link: "#about" },
];

function smoothScroll(href: string) {
  if (href.startsWith("#")) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function NorthNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <Link href="/" aria-label="North Software — início" className="relative z-20 shrink-0">
          <div className="relative w-9 h-7 overflow-hidden">
            <Image src={NORTH_N_LOGO} fill alt="North Software" className="object-cover object-top" />
          </div>
        </Link>

        <NavItems items={navLinks} />

        <Link
          href="/contact"
          className={cn(
            "relative z-20 inline-flex items-center gap-2 px-5 py-2 rounded-full",
            "bg-taruma-400 hover:bg-taruma-500 text-negro-900",
            "font-semibold text-sm transition-colors duration-200",
          )}
        >
          Fale conosco
        </Link>
      </NavBody>

      {/* Mobile */}
      <MobileNav className={cn(mobileOpen && "rounded-[28px]")}>
        <MobileNavHeader>
          <Link href="/" aria-label="North Software — início">
            <div className="relative w-8 h-6 overflow-hidden">
              <Image src={NORTH_N_LOGO} fill alt="North Software" className="object-cover object-top" />
            </div>
          </Link>

          <MobileNavToggle
            isOpen={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)}>
          <ul className="flex flex-col gap-1 w-full">
            {navLinks.map(({ name, link }) => (
              <li key={link}>
                <a
                  href={link}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScroll(link);
                    setMobileOpen(false);
                  }}
                  className="block rounded-2xl px-4 py-3 text-lg font-semibold text-cumaru-200 transition-colors duration-150 hover:bg-white/8 hover:text-taruma-400"
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>

          <div className="w-full h-px bg-white/8" />

          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className={cn(
              "w-full flex items-center justify-center",
              "bg-taruma-400 hover:bg-taruma-500 text-negro-900",
              "font-semibold text-base px-6 py-3.5 rounded-full",
              "transition-colors duration-200",
            )}
          >
            Fale conosco
          </Link>

          <p className="font-mono text-[10px] text-negro-400 tracking-[0.14em] uppercase">
            NS-V.2025 // MANAUS, BR
          </p>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
