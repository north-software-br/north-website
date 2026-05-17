import Container from "../container/container";
import { Separator } from "@/components/ui/separator";
import ContactForm from "./contact-form";

const contactDetails = [
  { label: "Telefone", value: "+55 (92) 99525-1477", href: "https://wa.me/5592995251477" },
  { label: "Email", value: "comercial@northsoftware.com.br", href: "mailto:comercial@northsoftware.com.br" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-32 bg-negro-900">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-negro-800 to-transparent pointer-events-none z-0"
      />

      <Container>
        <div className="relative z-10 grid grid-cols-12 items-start gap-12 md:gap-0">
          {/* Info side */}
          <div className="col-span-12 md:col-span-6 flex flex-col gap-10">
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-left-10 duration-1000 ease-in-out fill-mode-both">
              <div className="flex gap-3 items-center">
                <span className="size-2 rounded-full bg-taruma-400" />
                <p className="text-sm font-normal text-cumaru-400">
                  Vamos conversar
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight text-cumaru-200">
                Pronto para levar seu projeto ao{" "}
                <span className="text-accent">próximo nível?</span>
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-8 animate-in fade-in slide-in-from-left-10 duration-1000 delay-100 ease-in-out fill-mode-both">
              {contactDetails.map(({ label, value, href }) => (
                <div key={label} className="flex flex-col gap-1">
                  <p className="text-sm text-cumaru-400">{label}</p>
                  <a
                    href={href}
                    className="text-base font-medium text-cumaru-200 hover:text-taruma-400 transition-colors duration-200"
                  >
                    {value}
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1 animate-in fade-in slide-in-from-left-10 duration-1000 delay-200 ease-in-out fill-mode-both">
              <p className="text-sm text-cumaru-400">Localização</p>
              <p className="text-base font-medium text-cumaru-200">
                Amazonas, Brasil
              </p>
            </div>

            <Separator className="opacity-10" />
          </div>

          {/* Spacer */}
          <div className="col-span-1 hidden md:block" />

          {/* Form side */}
          <div className="col-span-12 md:col-span-5">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
