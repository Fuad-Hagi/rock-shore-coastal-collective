import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Plus, Loader2 } from "lucide-react";
import type { ShopifyProduct } from "@/lib/shopify";
import { formatPrice } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";

export function ProductCard({ product }: { product: ShopifyProduct }) {
  const p = product.node;
  const img = p.images.edges[0]?.node;
  const img2 = p.images.edges[1]?.node ?? img;
  const variant = p.variants.edges[0]?.node;
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const price = p.priceRange.minVariantPrice;

  const quickAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
  };

  return (
    <Link
      to="/product/$handle"
      params={{ handle: p.handle }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        {img && (
          <motion.img
            src={img.url}
            alt={img.altText ?? p.title}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            initial={false}
          />
        )}
        {img2 && (
          <img
            src={img2.url}
            alt=""
            className="absolute inset-0 h-full w-full object-cover scale-105 transition-transform duration-700 group-hover:scale-110"
          />
        )}

        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={quickAdd}
            disabled={!variant || isLoading}
            className="flex w-full items-center justify-center gap-2 bg-background py-3 text-xs uppercase tracking-widest font-medium hover:bg-primary hover:text-primary-foreground transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" /> Quick add
              </>
            )}
          </button>
        </div>
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-3">
        <h3 className="text-sm font-medium leading-tight">{p.title}</h3>
        <p className="text-sm text-muted-foreground tabular-nums">
          {formatPrice(price.amount, price.currencyCode)}
        </p>
      </div>
      {p.productType && (
        <p className="mt-0.5 text-xs uppercase tracking-wider text-muted-foreground">
          {p.productType}
        </p>
      )}
    </Link>
  );
}
