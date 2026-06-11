"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const navLinks = [
  { name: "Serviços", link: "/#services" },
  { name: "Processos", link: "/#process" },
  { name: "Sobre", link: "/#about" },
  { name: "Projetos", link: "/#projects" },
];

function smoothScroll(href: string) {
  const id = href.split("#")[1];
  if (id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }
}

export default function NorthNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Navbar>
      {/* Desktop */}
      <NavBody>
        <Link
          href="/"
          aria-label="North Software — início"
          className="relative z-20 shrink-0"
        >
          <div className="relative w-9 h-7 overflow-hidden">
            <Image
              src={NORTH_N_LOGO}
              fill
              alt="North Software"
              className="object-cover object-top"
              priority
            />
          </div>
        </Link>

        <NavItems items={navLinks} />

        <InteractiveHoverButton
          onClick={() => smoothScroll("#contact")}
          className="relative z-20 text-sm"
        >
          Fale conosco
        </InteractiveHoverButton>
      </NavBody>

      {/* Mobile */}
      <MobileNav isOpen={mobileOpen}>
        <MobileNavHeader>
          <Link href="/" aria-label="North Software — início">
            <div className="relative w-8 h-6 overflow-hidden">
              <Image
                src={NORTH_N_LOGO}
                fill
                alt="North Software"
                className="object-cover object-top"
              />
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

          <InteractiveHoverButton
            onClick={() => {
              smoothScroll("#contact");
              setMobileOpen(false);
            }}
            className="w-full text-base py-3.5"
          >
            Fale conosco
          </InteractiveHoverButton>

          <p className="font-mono text-[10px] text-negro-400 tracking-[0.14em] uppercase">
            NS-V.2025 // MANAUS, BR
          </p>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
