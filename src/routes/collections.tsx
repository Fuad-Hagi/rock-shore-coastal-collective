import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/collections")({
  component: Collections,
  head: () => ({
    meta: [
      { title: "Collections — Rock & Shore" },
      {
        name: "description",
        content: "Explore the Men, Women, and Accessories collections.",
      },
    ],
  }),
});

const COLLECTIONS = [
  {
    title: "Men",
    tagline: "Salt-washed staples for the long swell.",
    image:
      "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?auto=format&fit=crop&w=2200&q=80",
  },
  {
    title: "Women",
    tagline: "Effortless layers built for the in-between hours.",
    image:
      "https://images.unsplash.com/photo-1483381616219-c357d627a3a8?auto=format&fit=crop&w=2200&q=80",
  },
  {
    title: "Accessories",
    tagline: "Small things, big horizons.",
    image:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=2200&q=80",
  },
];

function Collections() {
  return (
    <div>
      <div className="container-x py-16 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Lookbook
        </p>
        <h1 className="mt-2 max-w-2xl font-display text-4xl md:text-6xl font-semibold tracking-tight text-balance">
          Collections shaped by the coast.
        </h1>
      </div>

      <div className="space-y-2">
        {COLLECTIONS.map((c, i) => (
          <section
            key={c.title}
            className="relative h-[70vh] min-h-[480px] w-full overflow-hidden"
          >
            <img
              src={c.image}
              alt={c.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div
              className={`relative z-10 flex h-full ${
                i % 2 === 0 ? "items-end" : "items-start"
              } container-x py-16`}
            >
              <div className="max-w-md text-white">
                <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                  Collection 0{i + 1}
                </p>
                <h2 className="mt-3 font-display text-4xl md:text-6xl font-semibold tracking-tight">
                  {c.title}
                </h2>
                <p className="mt-3 text-white/85">{c.tagline}</p>
                <Link
                  to="/shop"
                  search={{ category: c.title }}
                  className="mt-8 inline-flex items-center gap-3 bg-background px-7 py-3.5 text-xs uppercase tracking-[0.25em] font-medium text-foreground hover:bg-sand"
                >
                  Shop Collection <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
