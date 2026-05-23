import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Mountain, Wind } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Rock & Shore" },
      {
        name: "description",
        content:
          "Let your river flow. The story of Rock & Shore — apparel built for outdoor lovers and streetwear enthusiasts.",
      },
    ],
  }),
});

const VALUES = [
  {
    icon: Droplets,
    title: "Let Your River Flow",
    desc: "A constant reminder that no matter the circumstance, always look inside, find that river flow, and push forward.",
  },
  {
    icon: Mountain,
    title: "Built for the Outdoors",
    desc: "Designed for durability, comfort, and water stain resistance — for hiking, biking, running, and every adventure.",
  },
  {
    icon: Wind,
    title: "Style Meets Function",
    desc: "Streetwear aesthetics meet outdoor performance. For the lovers of mountains, rivers, oceans, and urban fashion.",
  },
];

const PRODUCTS = [
  "Beanies",
  "Hats",
  "Backpacks for camping & sporting",
  "Winter waterproof Jackets",
  "Hoodies",
  "Pants",
  "Waterproof style performance pants",
  "Athlete shoes",
  "Fashion shoes",
  "Winter boots",
  "T-Shirts",
  "Long sleeves",
  "Flannel shirts",
  "Mug cups",
  "Tumblers",
];

function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1437846972679-9e6e537be46e?auto=format&fit=crop&w=2400&q=80"
          alt="Flowing river through rocky terrain"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container-x flex h-full items-end pb-14 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              Our story
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
              Let Your River Flow.
            </h1>
          </div>
        </div>
      </section>

      {/* Slogan / Philosophy */}
      <section className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Our slogan
          </p>
          <p className="mt-6 font-display text-2xl md:text-3xl leading-snug text-balance">
            "Let your river flow."
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            When you look to a river or ocean it is constantly rushing forward
            through any rocks or barriers hitting shores — this is a constant
            reminder no matter the circumstance to always look inside, find
            that river flow, and push forward.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand">
        <div className="container-x py-20 md:py-28">
          <div className="mb-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              What we stand for
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Our values
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="border border-border bg-background p-8"
              >
                <v.icon className="h-7 w-7 text-accent" />
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            How it began
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            The story of Rock & Shore
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed">
            Our wear was created for the outdoor lovers and streetwear styling
            people passionate about letting their river flow. Rock & Shore was
            first envisioned in 2019 before being founded in 2020 when the
            founder became passionate about how healing the river, ocean, and
            outdoors became.
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Rock & Shore was designed to enhance your day-to-day walk and
            travels. As an avid fashionista and traveler, the founder of Rock &
            Shore is inspired by and likes to frequent the various mountains,
            rivers, and oceans of the world as a constant reminder to "let your
            river flow."
          </p>
        </div>
      </section>

      {/* Product Line */}
      <section className="bg-sand">
        <div className="container-x py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              The collection
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Our product line
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The apparel and gear appeal to all ages and includes apparel lines
              for men, women, and children to enjoy. The clothing line is known
              for its durability, comfort, and water stain resistance.
            </p>
          </div>

          <div className="mt-14 grid gap-px bg-border sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {PRODUCTS.map((item) => (
              <div
                key={item}
                className="bg-background px-6 py-5 text-sm font-medium text-foreground text-center"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing / Purpose */}
      <section className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            For the journey
          </p>
          <p className="mt-6 font-display text-2xl md:text-3xl leading-snug text-balance">
            For the lovers of the mountains, the rivers, and the oceans.
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Whether you love hiking, biking, running, river rafting, or just
            urban fashion, Rock & Shore has something that will enhance your
            experience as you "let your river flow" on your everyday walk and
            travel expeditions.
          </p>
          <p className="mt-10 font-display text-sm uppercase tracking-[0.25em] text-slate-warm">
            John 7:38–39
          </p>
        </div>
      </section>
    </div>
  );
}
