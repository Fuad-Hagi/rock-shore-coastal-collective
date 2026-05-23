import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Truck, RotateCcw, Shield } from "lucide-react";
import { fetchProductByHandle, formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

const productQO = (handle: string) =>
  queryOptions({
    queryKey: ["product", handle],
    queryFn: async () => {
      const product = await fetchProductByHandle(handle);
      if (!product) throw notFound();
      return product;
    },
  });

export const Route = createFileRoute("/product/$handle")({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(productQO(params.handle)),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container-x py-32 text-center">
      <h1 className="font-display text-3xl">Product not found</h1>
      <Link to="/shop" className="mt-6 inline-block text-sm underline">
        Back to shop
      </Link>
    </div>
  ),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product } = useSuspenseQuery(productQO(handle));
  const [activeImg, setActiveImg] = useState(0);

  // selected options state: { [optionName]: value }
  const initialOptions: Record<string, string> = {};
  product.options.forEach((o) => {
    initialOptions[o.name] = o.values[0];
  });
  const [selected, setSelected] = useState(initialOptions);

  const variant =
    product.variants.edges.find((v) =>
      v.node.selectedOptions.every((o) => selected[o.name] === o.value),
    )?.node ?? product.variants.edges[0].node;

  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions,
    });
  };

  const images = product.images.edges.map((e) => e.node);

  return (
    <div className="container-x py-10 md:py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* GALLERY */}
        <div>
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            {images[activeImg] && (
              <img
                src={images[activeImg].url}
                alt={images[activeImg].altText ?? product.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square overflow-hidden bg-secondary ${
                    i === activeImg ? "ring-1 ring-foreground" : "opacity-70"
                  }`}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DETAILS */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          {product.productType && (
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {product.productType}
            </p>
          )}
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-semibold tracking-tight">
            {product.title}
          </h1>
          <p className="mt-4 text-xl tabular-nums">
            {formatPrice(variant.price.amount, variant.price.currencyCode)}
          </p>

          <div className="mt-8 space-y-6">
            {product.options.map((opt) => (
              <div key={opt.name}>
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {opt.name}: <span className="text-foreground">{selected[opt.name]}</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {opt.values.map((v) => {
                    const active = selected[opt.name] === v;
                    return (
                      <button
                        key={v}
                        onClick={() =>
                          setSelected({ ...selected, [opt.name]: v })
                        }
                        className={`h-10 min-w-10 px-3 border text-sm ${
                          active
                            ? "border-foreground bg-foreground text-background"
                            : "border-border hover:border-foreground"
                        }`}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleAdd}
            disabled={isLoading || !variant.availableForSale}
            className="mt-8 flex h-14 w-full items-center justify-center gap-2 bg-primary text-xs uppercase tracking-[0.25em] font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : variant.availableForSale ? (
              "Add to Cart"
            ) : (
              "Sold out"
            )}
          </button>

          {product.description && (
            <p className="mt-8 text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
              {product.description}
            </p>
          )}

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-xs text-muted-foreground">
            <div className="flex flex-col items-center text-center">
              <Truck className="h-5 w-5 mb-2" />
              Free shipping over $75
            </div>
            <div className="flex flex-col items-center text-center">
              <RotateCcw className="h-5 w-5 mb-2" />
              30-day returns
            </div>
            <div className="flex flex-col items-center text-center">
              <Shield className="h-5 w-5 mb-2" />
              Secure checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
