"use client";

import { useEffect, useState } from "react";

// true a partir do breakpoint lg (1024px); false no servidor e no primeiro render
export function useDesktop() {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const atualizar = () => setDesktop(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);
  return desktop;
}
