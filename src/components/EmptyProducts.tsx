import { PackageOpen } from "lucide-react";

export function EmptyProducts({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-border bg-secondary/40 px-6 py-20 text-center">
      <PackageOpen className="h-10 w-10 text-muted-foreground" />
      <h3 className="mt-4 font-display text-lg">No products found</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        {message ??
          "Your shop is empty. Tell the chat what you want to sell — name, price, and a short description — and we'll add it to Shopify."}
      </p>
    </div>
  );
}
