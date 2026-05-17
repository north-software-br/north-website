import Container from "../container/container";
import { Marquee } from "../marquee/animations/animations-marquee";
type Client = {
  name: string;
  logo: string;
};

const clients: Client[] = [
  {
    name: "Brand 1",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-1.svg",
  },
  {
    name: "Brand 2",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-2.svg",
  },
  {
    name: "Brand 3",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-3.svg",
  },
  {
    name: "Brand 4",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-4.svg",
  },
  {
    name: "Brand 5",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-5.svg",
  },
  {
    name: "Brand 6",
    logo: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-light-6.svg",
  },
];

export default function Clients() {
  return (
    <section id="clients" className="relative w-full py-20">

      <Container>
        <p className="text-center text-sm font-medium uppercase tracking-widest text-cumaru-400 mb-10">
          Empresas que confiam na North
        </p>
      </Container>

      <div className="relative z-10 overflow-hidden mask-[linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <Marquee className="[--duration:30s]" pauseOnHover>
          {clients.map((client) => (
            <div
              key={client.name}
              className="flex items-center justify-center mx-10"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="h-8 w-auto opacity-40 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
