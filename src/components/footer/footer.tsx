"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { NORTH_FULL_LOGO } from "../../../public";
import Container from "../container/container";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#services", label: "Serviços" },
  { href: "#projects", label: "Projetos" },
  { href: "#about", label: "Sobre" },
];

const contactLinks = [
  {
    href: "mailto:contato@northsoftware.com.br",
    label: "contato@northsoftware.com.br",
  },
  { href: "https://wa.me/5592995251477", label: "+55 (92) 99525-1477" },
  { href: "#", label: "Amazonas, Brasil" },
];

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/north-software",
    label: "LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    href: "https://instagram.com/northsoftware",
    label: "Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      className="bg-negro-900 border-t border-white/6"
    >
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link
              href="/"
              aria-label="North Software — início"
              className="inline-flex w-fit cursor-pointer"
            >
              <Image
                src={NORTH_FULL_LOGO}
                width={200}
                height={60}
                alt="North Software"
                className="h-auto w-30 md:w-35"
              />
            </Link>
            <p className="text-cumaru-400 text-sm leading-relaxed max-w-xs">
              Transformamos desafios de negócio em produtos digitais que
              escalam. Da estratégia ao lançamento, em um só lugar.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={cn(
                    "flex size-8 items-center justify-center rounded-lg",
                    "text-cumaru-400",
                    "hover:border-taruma-400/40 hover:text-taruma-400 transition-colors duration-200",
                  )}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-4">
            <span className="text-cumaru-200 text-xs font-semibold uppercase tracking-widest">
              Empresa
            </span>
            <ul className="flex flex-col gap-3">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="text-cumaru-400 text-sm hover:text-taruma-400 transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="text-cumaru-400 text-sm hover:text-taruma-400 transition-colors duration-200"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <span className="text-cumaru-200 text-xs font-semibold uppercase tracking-widest">
              Fale conosco
            </span>
            <ul className="flex flex-col gap-3">
              {contactLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-cumaru-400 text-sm hover:text-taruma-400 transition-colors duration-200 break-all"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cumaru-500 text-xs">
            © {year} North Software. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: "Termos de uso", href: "/terms" },
              { label: "Política de privacidade.", href: "/privacy" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-cumaru-600 text-xs hover:text-cumaru-400 transition-colors duration-200"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}
