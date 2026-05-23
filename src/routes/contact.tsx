import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { MapPin, Mail, Instagram, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — Rock & Shore" },
      {
        name: "description",
        content: "Get in touch with the Rock & Shore team.",
      },
    ],
  }),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  return (
    <div className="container-x py-16 md:py-24">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Get in touch
      </p>
      <h1 className="mt-2 max-w-xl font-display text-4xl md:text-5xl font-semibold tracking-tight">
        We're always happy to hear from you.
      </h1>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSending(true);
            setTimeout(() => {
              toast.success("Message sent. We'll be in touch soon.");
              setForm({ name: "", email: "", message: "" });
              setSending(false);
            }, 600);
          }}
          className="space-y-6"
        >
          <Field label="Name">
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border-b border-border bg-transparent py-3 outline-none focus:border-foreground"
            />
          </Field>
          <Field label="Email">
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border-b border-border bg-transparent py-3 outline-none focus:border-foreground"
            />
          </Field>
          <Field label="Message">
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full resize-none border-b border-border bg-transparent py-3 outline-none focus:border-foreground"
            />
          </Field>
          <Button
            type="submit"
            disabled={sending}
            className="h-12 rounded-none bg-primary px-10 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-primary/90"
          >
            {sending ? "Sending…" : "Send Message"}
          </Button>
        </form>

        <aside className="space-y-8 lg:border-l lg:border-border lg:pl-12">
          <Info icon={MapPin} title="Visit the shop">
            218 Coastline Hwy<br />Half Moon Bay, CA 94019
          </Info>
          <Info icon={Mail} title="Email">
            hello@rockandshore.co
          </Info>
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Follow
            </p>
            <div className="mt-3 flex gap-4 text-muted-foreground">
              <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram className="h-5 w-5" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter className="h-5 w-5" /></a>
              <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}

function Info({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-accent" />
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm leading-relaxed">{children}</p>
    </div>
  );
}
