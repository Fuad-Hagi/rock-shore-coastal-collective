import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="font-display text-xl font-semibold uppercase tracking-tight">
              Rock & Shore
            </h3>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Coastal essentials built for those who live between the waves and the
              shore. Designed in California, made to wander.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("You're in. Welcome to the shore.");
                setEmail("");
              }}
              className="mt-6 flex max-w-sm items-center border-b border-foreground/40 focus-within:border-foreground"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                className="text-xs uppercase tracking-widest font-medium hover:text-accent"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
              Shop
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/shop" className="hover:text-accent">All</Link></li>
              <li><Link to="/shop" search={{ category: "Men" }} className="hover:text-accent">Men</Link></li>
              <li><Link to="/shop" search={{ category: "Women" }} className="hover:text-accent">Women</Link></li>
              <li><Link to="/shop" search={{ category: "Accessories" }} className="hover:text-accent">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-muted-foreground">
              Company
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-accent">About</Link></li>
              <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
              <li><Link to="/collections" className="hover:text-accent">Collections</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Rock & Shore. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground">
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Youtube" className="hover:text-foreground"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
