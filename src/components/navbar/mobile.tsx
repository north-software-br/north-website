'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const links = [
  { href: '#services', label: 'Serviços' },
  { href: '#projects', label: 'Projetos' },
  { href: '#about',    label: 'Sobre' },
];

function scrollTo(href: string) {
  if (href.startsWith('#')) {
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }
}

function Monogram() {
  return (
    <svg width="28" height="28" viewBox="0 0 240 240" aria-label="North Software" fill="none">
      <path d="M40 30 L92 30 L170 210 L118 210 Z" fill="#3DAFA6" />
      <path d="M62 30 L110 30 L196 198 L196 30 L240 30 L240 230 L192 230 L106 62 L106 230 L62 230 Z"
        fill="#F0EDE3" transform="translate(-10, 0)" />
    </svg>
  );
}

export default function MobileNav() {
  const [visible, setVisible] = useState(true);
  const [open, setOpen] = useState(false);
  const [lastY, setLastY] = useState(0);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y <= lastY || y <= 50);
      setLastY(y);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastY]);

  // lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Top bar */}
      <header
        className={cn(
          'lg:hidden fixed top-0 left-0 right-0 z-50',
          'transition-transform duration-500',
          visible ? 'translate-y-0' : '-translate-y-[200%]',
        )}
      >
        <nav className={cn(
          "flex items-center justify-between px-5 py-4",
          "bg-negro-900/50 backdrop-blur-xl backdrop-saturate-150",
          "border-b border-white/10",
        )}>
          <Link href="/" aria-label="North Software — início">
            <Monogram />
          </Link>

          {/* Hamburger / close button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            className="relative w-10 h-10 flex items-center justify-center"
          >
            {/* hamburger lines */}
            <span
              className={cn(
                'absolute flex flex-col gap-[5px] transition-all duration-300',
                open ? 'opacity-0 rotate-90 scale-75' : 'opacity-100 rotate-0 scale-100',
              )}
            >
              <span className="block w-5 h-[1.5px] bg-cumaru-200 rounded-full" />
              <span className="block w-5 h-[1.5px] bg-cumaru-200 rounded-full" />
              <span className="block w-3 h-[1.5px] bg-taruma-400 rounded-full" />
            </span>
            {/* X icon */}
            <span
              className={cn(
                'absolute transition-all duration-300',
                open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75',
              )}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
                <path d="M2 2L18 18M18 2L2 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="text-cumaru-200" />
              </svg>
            </span>
          </button>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          'lg:hidden fixed inset-0 z-40',
          'bg-negro-900/70 backdrop-blur-sm',
          'transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        className={cn(
          'lg:hidden fixed top-0 right-0 bottom-0 z-40',
          'w-full max-w-[320px]',
          'bg-negro-800 border-l border-white/[0.06]',
          'transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Menu de navegação"
      >
        <div className="flex flex-col h-full pt-24 px-8 pb-10">
          {/* Nav links */}
          <ul className="flex flex-col gap-1">
            {links.map(({ href, label }, i) => (
              <li
                key={href}
                className={cn(
                  'transition-all duration-300',
                  open
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4',
                )}
                style={{ transitionDelay: open ? `${120 + i * 50}ms` : '0ms' }}
              >
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); scrollTo(href); setOpen(false); }}
                  className="block text-cumaru-200 text-xl font-semibold py-3 hover:text-taruma-400 transition-colors duration-150"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="my-8 h-px bg-white/[0.08]" />

          {/* CTA */}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center justify-center gap-2',
              'bg-taruma-400 hover:bg-taruma-500 text-negro-900',
              'font-semibold text-base px-6 py-3.5 rounded-full',
              'transition-all duration-300',
              open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
            )}
            style={{ transitionDelay: open ? `${120 + links.length * 50}ms` : '0ms' }}
          >
            Fale conosco
          </Link>

          {/* Meta */}
          <p
            className={cn(
              'mt-auto font-mono text-[10px] text-negro-400 tracking-[0.14em] uppercase',
              'transition-all duration-300',
              open ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transitionDelay: open ? '350ms' : '0ms' }}
          >
            NS-V.2025 // MANAUS, BR
          </p>
        </div>
      </nav>
    </>
  );
}
