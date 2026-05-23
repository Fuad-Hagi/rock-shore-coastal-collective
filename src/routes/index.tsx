import { createFileRoute, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { EmptyProducts } from "@/components/EmptyProducts";

const productsQO = queryOptions({
  queryKey: ["products", "new-arrivals"],
  queryFn: () => fetchProducts(4),
});

export const Route = createFileRoute("/")({
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: Home,
  head: () => ({
    meta: [
      { title: "Rock & Shore — Coastal Lifestyle Apparel" },
      {
        name: "description",
        content:
          "Coastal essentials for those who live between the waves and the shore.",
      },
    ],
  }),
});

const HERO =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=80";
const COLLECTIONS = [
  {
    title: "Men",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80",
    href: "/shop",
    category: "Men",
  },
  {
    title: "Women",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    href: "/shop",
    category: "Women",
  },
  {
    title: "Accessories",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80",
    href: "/shop",
    category: "Accessories",
  },
];

function Home() {
  const { data: products } = useSuspenseQuery(productsQO);

  return (
    <div>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[600px] w-full overflow-hidden">
        <img
          src={HERO}
          alt="Coastal shoreline at golden hour"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center text-white"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/80">
            Spring · Summer Collection
          </p>
          <h1 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-7xl lg:text-8xl text-balance">
            Rock & Shore
          </h1>
          <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg text-balance">
            Coastal essentials built for the rhythm of the tide. Salt-washed
            textures, sun-bleached neutrals, made for the long way home.
          </p>
          <Link
            to="/shop"
            className="mt-10 inline-flex items-center gap-3 bg-background px-8 py-4 text-xs uppercase tracking-[0.25em] font-medium text-foreground hover:bg-sand transition-colors"
          >
            Shop Now <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </section>

      {/* COLLECTIONS */}
      <section className="container-x py-20 md:py-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Shop by
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              Featured Collections
            </h2>
          </div>
          <Link
            to="/collections"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-accent"
          >
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.title}
              to="/shop"
              search={{ category: c.category }}
              className="group relative block aspect-[3/4] overflow-hidden bg-secondary"
            >
              <img
                src={c.image}
                alt={c.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <h3 className="font-display text-2xl font-semibold">{c.title}</h3>
                <p className="mt-1 inline-flex items-center gap-2 text-xs uppercase tracking-widest opacity-90">
                  Shop {c.title} <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="container-x pb-20 md:pb-28">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Just landed
            </p>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-semibold tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:text-accent"
          >
            Shop all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {products.length === 0 ? (
          <EmptyProducts />
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* BRAND STORY */}
      <section className="bg-sand">
        <div className="container-x grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <div className="relative aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1400&q=80"
              alt="Surfer walking toward the ocean"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="max-w-lg">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Our story
            </p>
            <h2 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight text-balance">
              Made for those who live by the tide.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Born on the Pacific coast, Rock & Shore is a quiet love letter to
              long mornings, salt air, and the gentle weight of a worn-in cotton
              tee. We design slowly, source carefully, and make pieces meant to
              soften with every wash and every wave.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium hover:text-accent"
            >
              Read more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
