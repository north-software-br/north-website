import Container from "../container/container";
import { Separator } from "@/components/ui/separator";
import ContactForm from "./contact-form";
import { Marquee } from "@/components/ui/animated-marquee";

const contactDetails = [
  { label: "Telefone", value: "+55 (92) 99525-1477", href: "https://wa.me/5592995251477" },
  { label: "Email", value: "comercial@northsoftware.com.br", href: "mailto:comercial@northsoftware.com.br" },
];

const brandList = [
  { image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-1.svg", name: "Brand 1" },
  { image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-2.svg", name: "Brand 2" },
  { image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-3.svg", name: "Brand 3" },
  { image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-4.svg", name: "Brand 4" },
  { image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-5.svg", name: "Brand 5" },
];

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-32 bg-negro-900">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-negro-800 to-transparent pointer-events-none z-0"
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

            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300 ease-in-out fill-mode-both">
              <p className="text-sm text-cumaru-400">Empresas que confiam em nós</p>
              <Marquee pauseOnHover className="[--duration:20s] p-0">
                {brandList.map((brand, index) => (
                  <img
                    key={index}
                    src={brand.image}
                    alt={brand.name}
                    className="w-36 h-8 mr-6 lg:mr-20"
                  />
                ))}
              </Marquee>
            </div>
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
