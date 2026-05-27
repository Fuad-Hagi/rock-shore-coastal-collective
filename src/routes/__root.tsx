import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";
import { CartDrawer } from "@/components/CartDrawer";
import { useCartSync } from "@/hooks/useCartSync";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-semibold tracking-tight">404</h1>
        <h2 className="mt-4 text-lg uppercase tracking-widest text-muted-foreground">
          Lost at sea
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for has drifted somewhere else.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center bg-primary px-6 py-3 text-xs uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          Back to shore
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl font-semibold">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground"
          >
            Try again
          </button>
          <a
            href="/"
            className="border border-border px-5 py-2.5 text-xs uppercase tracking-widest"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Rock & Shore — Coastal Lifestyle Apparel" },
      {
        name: "description",
        content:
          "Coastal lifestyle clothing built for those who live between the waves and the shore.",
      },
      { property: "og:title", content: "Rock & Shore — Coastal Lifestyle Apparel" },
      {
        property: "og:description",
        content:
          "Coastal lifestyle clothing built for those who live between the waves and the shore.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Rock & Shore — Coastal Lifestyle Apparel" },
      { name: "description", content: "Rock & Shore is a modern coastal lifestyle clothing brand website." },
      { property: "og:description", content: "Rock & Shore is a modern coastal lifestyle clothing brand website." },
      { name: "twitter:description", content: "Rock & Shore is a modern coastal lifestyle clothing brand website." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2911ab42-c005-4120-9ee4-db25c8b348d3/id-preview-59895603--433db09d-5c9a-4e85-91e7-c26fa49f4924.lovable.app-1779842895002.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/2911ab42-c005-4120-9ee4-db25c8b348d3/id-preview-59895603--433db09d-5c9a-4e85-91e7-c26fa49f4924.lovable.app-1779842895002.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppShell() {
  useCartSync();
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
      <CartDrawer />
      <Toaster position="top-center" />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AppShell />
    </QueryClientProvider>
  );
}
