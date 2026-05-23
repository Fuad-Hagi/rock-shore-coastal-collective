import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { z } from "zod";
import { fetchProducts } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";
import { EmptyProducts } from "@/components/EmptyProducts";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

const searchSchema = z.object({
  category: z.string().optional(),
});

const productsQO = queryOptions({
  queryKey: ["products", "all"],
  queryFn: () => fetchProducts(100),
});

export const Route = createFileRoute("/shop")({
  validateSearch: searchSchema,
  loader: ({ context }) => context.queryClient.ensureQueryData(productsQO),
  component: Shop,
  head: () => ({
    meta: [
      { title: "Shop — Rock & Shore" },
      {
        name: "description",
        content: "Coastal apparel and accessories. Filter by category, size, and color.",
      },
    ],
  }),
});

const CATEGORIES = ["Men", "Women", "Accessories"];
const SIZES = ["XS", "S", "M", "L", "XL"];
const COLORS = ["Sand", "White", "Slate", "Navy", "Ocean", "Black"];

function Shop() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data: products } = useSuspenseQuery(productsQO);

  const initialCategories = search.category ? [search.category] : [];
  const [cats, setCats] = useState<string[]>(initialCategories);
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(500);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const node = p.node;
      const price = parseFloat(node.priceRange.minVariantPrice.amount);
      if (price > maxPrice) return false;
      if (cats.length) {
        const matches = cats.some((c) => {
          const lc = c.toLowerCase();
          return (
            node.productType?.toLowerCase().includes(lc) ||
            node.tags?.some((t) => t.toLowerCase().includes(lc)) ||
            node.title.toLowerCase().includes(lc)
          );
        });
        if (!matches) return false;
      }
      if (sizes.length) {
        const variantSizes = node.variants.edges.flatMap((v) =>
          v.node.selectedOptions
            .filter((o) => o.name.toLowerCase() === "size")
            .map((o) => o.value.toUpperCase()),
        );
        if (!sizes.some((s) => variantSizes.includes(s))) return false;
      }
      if (colors.length) {
        const variantColors = node.variants.edges.flatMap((v) =>
          v.node.selectedOptions
            .filter((o) => o.name.toLowerCase() === "color")
            .map((o) => o.value.toLowerCase()),
        );
        if (!colors.some((c) => variantColors.includes(c.toLowerCase())))
          return false;
      }
      return true;
    });
  }, [products, cats, sizes, colors, maxPrice]);

  const toggle = (
    arr: string[],
    set: (v: string[]) => void,
    value: string,
  ) => {
    set(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const clearAll = () => {
    setCats([]);
    setSizes([]);
    setColors([]);
    setMaxPrice(500);
    navigate({ search: {} });
  };

  return (
    <div className="container-x py-12 md:py-16">
      <div className="mb-10 md:mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Shop
        </p>
        <h1 className="mt-2 font-display text-4xl md:text-5xl font-semibold tracking-tight">
          {cats.length === 1 ? cats[0] : "All Products"}
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
        {/* SIDEBAR */}
        <aside className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.25em] font-medium">
              Filters
            </h2>
            <button
              onClick={clearAll}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          </div>

          <FilterGroup title="Category">
            {CATEGORIES.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={cats.includes(c)}
                  onCheckedChange={() => toggle(cats, setCats, c)}
                />
                {c}
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => {
                const active = sizes.includes(s);
                return (
                  <button
                    key={s}
                    onClick={() => toggle(sizes, setSizes, s)}
                    className={`h-9 min-w-9 px-2 border text-xs ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </FilterGroup>

          <FilterGroup title="Color">
            {COLORS.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                <Checkbox
                  checked={colors.includes(c)}
                  onCheckedChange={() => toggle(colors, setColors, c)}
                />
                {c}
              </label>
            ))}
          </FilterGroup>

          <FilterGroup title={`Price · up to $${maxPrice}`}>
            <Slider
              min={20}
              max={500}
              step={10}
              value={[maxPrice]}
              onValueChange={(v) => setMaxPrice(v[0])}
              className="mt-2"
            />
          </FilterGroup>
        </aside>

        {/* GRID */}
        <div>
          {filtered.length === 0 ? (
            <EmptyProducts
              message={
                products.length === 0
                  ? "Your shop is empty. Tell the chat what to add — name, price, description — and we'll ship it to Shopify."
                  : "No products match these filters. Try clearing some."
              }
            />
          ) : (
            <>
              <p className="mb-6 text-xs uppercase tracking-widest text-muted-foreground">
                {filtered.length} product{filtered.length > 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6">
                {filtered.map((p) => (
                  <ProductCard key={p.node.id} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
