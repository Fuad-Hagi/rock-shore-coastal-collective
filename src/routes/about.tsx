import { createFileRoute } from "@tanstack/react-router";
import { Waves, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About — Rock & Shore" },
      {
        name: "description",
        content:
          "Built for those who live between the waves and the shore. The story of Rock & Shore.",
      },
    ],
  }),
});

const VALUES = [
  {
    icon: Leaf,
    title: "Sustainability",
    desc: "Organic fibers, low-impact dyes, and packaging that returns to the earth.",
  },
  {
    icon: Waves,
    title: "Quality",
    desc: "Garments built to soften with use — not fall apart with it.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Designed alongside surfers, fishermen, and coastal makers we love.",
  },
];

const TEAM = [
  {
    name: "Maren Holloway",
    role: "Founder & Creative Director",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Eli Vasquez",
    role: "Head of Design",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Saoirse Bay",
    role: "Materials Lead",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=600&q=80",
  },
];

function About() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1437846972679-9e6e537be46e?auto=format&fit=crop&w=2400&q=80"
          alt="Empty coastal beach at dawn"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 container-x flex h-full items-end pb-14 text-white">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
              Our story
            </p>
            <h1 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
              Between the waves and the shore.
            </h1>
          </div>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Mission
          </p>
          <p className="mt-6 font-display text-2xl md:text-3xl leading-snug text-balance">
            "Built for those who live between the waves and the shore."
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Rock & Shore began as a quiet conversation between two friends about
            what coastal living actually feels like — not the postcard version,
            but the worn-in, sand-on-the-floorboards reality. Every piece we make
            is a small answer to that question.
          </p>
        </div>
      </section>

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

      <section className="container-x py-20 md:py-28">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            The crew
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            Meet the team
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {TEAM.map((t) => (
            <div key={t.name}>
              <div className="aspect-[4/5] overflow-hidden bg-secondary">
                <img
                  src={t.img}
                  alt={t.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 font-display text-lg">{t.name}</h3>
              <p className="text-sm text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
