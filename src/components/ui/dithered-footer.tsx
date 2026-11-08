"use client";

import { useRef, useState, type CSSProperties, type FormEvent, type PointerEvent, type ReactNode } from "react";
import { getAssetUrl } from "@/lib/utils";

export type FooterLink = { label: string; href: string };
export type FooterColumn = { title: string; links: FooterLink[] };
export type FooterSocial = { label: string; href: string; icon: ReactNode };

export type DitheredFooterProps = {
    brand?: string;
    /** Where the wordmark links to. */
    brandHref?: string;
    tagline?: string;
    logo?: ReactNode;
    columns?: FooterColumn[];
    socials?: FooterSocial[];
    legal?: FooterLink[];
    copyright?: string;
    /** Link to your real status page, shown with a green dot. Off unless you pass one. */
    status?: FooterLink | null;
    /** Colour of the dot field. It is the footer's only colour, so it carries the brand. */
    accent?: string;
    /** Whether to show the newsletter form. Default is false to match clean layout. */
    showSubscribe?: boolean;
    /** Called with the email address. Resolve to show the success message. */
    onSubscribe?: (email: string) => void | Promise<void>;
};

// Stochastic dither: vertical noise, sparse at the top and dense at the bottom,
// thresholded to on/off in one inline SVG filter. Used as a mask, so the dots
// take whatever accent colour you pass.
const DITHER =
    "url('data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20width%3D%27360%27%20height%3D%27240%27%3E%3Cdefs%3E%3ClinearGradient%20id%3D%27g%27%20x1%3D%270%27%20y1%3D%270%27%20x2%3D%270%27%20y2%3D%271%27%3E%3Cstop%20offset%3D%270.04%27%20stop-color%3D%27%23000%27%2F%3E%3Cstop%20offset%3D%270.96%27%20stop-color%3D%27%23fff%27%2F%3E%3C%2FlinearGradient%3E%3Cfilter%20id%3D%27f%27%20x%3D%270%27%20y%3D%270%27%20width%3D%27100%25%27%20height%3D%27100%25%27%20color-interpolation-filters%3D%27sRGB%27%3E%3CfeTurbulence%20type%3D%27fractalNoise%27%20baseFrequency%3D%270.45%27%20numOctaves%3D%272%27%20seed%3D%277%27%20stitchTiles%3D%27stitch%27%20result%3D%27n%27%2F%3E%3CfeColorMatrix%20in%3D%27n%27%20type%3D%27matrix%27%20values%3D%271%200%200%200%200%201%200%200%200%200%201%200%200%200%200%200%200%200%200%201%27%20result%3D%27ng%27%2F%3E%3CfeComposite%20in%3D%27SourceGraphic%27%20in2%3D%27ng%27%20operator%3D%27arithmetic%27%20k2%3D%270.5%27%20k3%3D%270.5%27%20result%3D%27s%27%2F%3E%3CfeComponentTransfer%20in%3D%27s%27%20result%3D%27t%27%3E%3CfeFuncR%20type%3D%27discrete%27%20tableValues%3D%270%201%27%2F%3E%3C%2FfeComponentTransfer%3E%3CfeColorMatrix%20in%3D%27t%27%20type%3D%27matrix%27%20values%3D%270%200%200%200%201%200%200%200%200%200.5%200%200%200%200%200%201%200%200%200%200%27%2F%3E%3C%2Ffilter%3E%3C%2Fdefs%3E%3Crect%20width%3D%27100%25%27%20height%3D%27100%25%27%20fill%3D%27url%28%23g%29%27%20filter%3D%27url%28%23f%29%27%2F%3E%3C%2Fsvg%3E')";

const GRID = "radial-gradient(circle, #000 0.9px, transparent 1.3px)";

// Scoped by the df- prefix. Masks and motion live here rather than in utility
// classes, so the component renders the same on Tailwind v3 and v4.
const STYLES = `
.df-field { position: absolute; inset: 0; }
.df-field.df-lit {
  -webkit-mask-image: radial-gradient(circle 190px at var(--df-x, 50%) var(--df-y, 50%), #000 35%, rgb(0 0 0 / .22) 100%);
  mask-image: radial-gradient(circle 190px at var(--df-x, 50%) var(--df-y, 50%), #000 35%, rgb(0 0 0 / .22) 100%);
}
.df-dots {
  position: absolute; top: 0; bottom: 0; left: 0;
  width: calc(100% + 360px);
  background: var(--df-accent);
  -webkit-mask-image: ${GRID}, ${DITHER};
  mask-image: ${GRID}, ${DITHER};
  -webkit-mask-size: 4px 4px, 360px 240px;
  mask-size: 4px 4px, 360px 240px;
  -webkit-mask-repeat: repeat, repeat-x;
  mask-repeat: repeat, repeat-x;
  -webkit-mask-position: 0 0, left bottom;
  mask-position: 0 0, left bottom;
  -webkit-mask-composite: source-in;
  mask-composite: intersect;
}
@media (prefers-reduced-motion: no-preference) {
  .df-dots { animation: df-drift 40s linear infinite; }
  @supports (animation-timeline: view()) {
    .df-band { view-timeline: --df-band; }
    .df-mark { animation: df-rise linear both; animation-timeline: --df-band; animation-range: entry 20% entry 100%; }
  }
}
@keyframes df-drift { to { translate: -360px 0; } }
@keyframes df-rise { from { translate: 0 30%; } }
`;

const DEFAULT_COLUMNS: FooterColumn[] = [
    {
        title: "Explore",
        links: [
            { label: "Events", href: "/student" },
            { label: "Arena & Tracks", href: "#hackathons" },
            { label: "Leaderboard", href: "/student" },
            { label: "Student Ecosystem", href: "/student" },
        ],
    },
    {
        title: "Resources",
        links: [
            { label: "Rules & Policies", href: "#" },
            { label: "FAQs", href: "#" },
            { label: "Support", href: "mailto:support@campuscode.in" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#about" },
            { label: "Privacy Policy", href: "#" },
            { label: "Terms of Service", href: "#" },
        ],
    },
];

const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--df-accent)]";
const coarse = "[@media(pointer:coarse)]:inline-flex [@media(pointer:coarse)]:min-h-11 [@media(pointer:coarse)]:items-center";

export default function DitheredFooter({
    brand = "CAMPUSCODE",
    brandHref = "/",
    tagline = "Where student builders learn, compete & ship.",
    logo = (
        <img
            src={getAssetUrl('campuscode-logo.png')}
            alt="CampusCode"
            className="h-8 w-auto object-contain object-left dark:brightness-110"
        />
    ),
    columns = DEFAULT_COLUMNS,
    socials = [],
    legal = [],
    copyright = `© ${new Date().getFullYear()} CampusCode. All rights reserved.`,
    status = null,
    accent = "#7665FF",
    showSubscribe = false,
    onSubscribe,
}: DitheredFooterProps) {
    const [email, setEmail] = useState("");
    const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
    const field = useRef<HTMLDivElement>(null);
    const frame = useRef(0);

    const submit = async (e: FormEvent) => {
        e.preventDefault();
        setState("sending");
        try {
            await onSubscribe?.(email);
            setState("done");
            setEmail("");
        } catch {
            setState("error");
        }
    };

    // Spotlight: dots under a mouse pointer stay at full strength and the rest dim.
    // Touch and pen get the plain field; there is no hover to follow.
    const onMove = (e: PointerEvent<HTMLDivElement>) => {
        if (e.pointerType !== "mouse" || !field.current) return;
        const el = field.current;
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            el.style.setProperty("--df-x", `${x}px`);
            el.style.setProperty("--df-y", `${y}px`);
            el.classList.add("df-lit");
        });
    };
    const onLeave = () => {
        cancelAnimationFrame(frame.current);
        field.current?.classList.remove("df-lit");
    };

    const toTop = () =>
        window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });

    return (
        <footer
            className="relative z-20 overflow-hidden border-t border-border bg-[#FFFFFF] text-foreground transition-colors duration-200"
            style={{ "--df-accent": accent } as CSSProperties}
        >
            <style>{STYLES}</style>

            <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-6 pb-16 pt-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_repeat(3,minmax(0,1fr))] lg:gap-0">
                {/* Column 1: Brand & Tagline */}
                <div className="lg:pr-10">
                    <a href={brandHref} className={`inline-block rounded-sm ${focus}`}>
                        {logo || <span className="text-xl font-bold tracking-tight text-foreground">{brand}</span>}
                    </a>
                    <h3 className="mt-5 text-xl font-bold tracking-tight leading-tight text-foreground sm:text-2xl">
                        {tagline.includes("learn") ? (
                            <>
                                Where student builders
                                <br />
                                learn, compete &amp; ship.
                            </>
                        ) : (
                            tagline
                        )}
                    </h3>

                    {(showSubscribe || onSubscribe) && (
                        <form className="mt-8 max-w-sm" onSubmit={submit}>
                            <label htmlFor="df-email" className="block text-sm font-medium">Get product updates by email</label>
                            <div className="mt-2 flex gap-2">
                                <input
                                    id="df-email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
                                    className="h-10 min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 text-sm transition-colors focus:border-[var(--df-accent)] focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-[var(--df-accent)] [@media(pointer:coarse)]:h-11"
                                />
                                <button
                                    disabled={state === "sending"}
                                    className={`h-10 shrink-0 rounded-md bg-foreground px-4 text-sm font-medium text-background transition hover:opacity-90 active:scale-[0.97] disabled:opacity-60 ${focus} [@media(pointer:coarse)]:h-11`}
                                >
                                    {state === "sending" ? "Subscribing…" : "Subscribe"}
                                </button>
                            </div>
                            <p role="status" className="mt-2 min-h-5 text-sm text-muted-foreground">
                                {state === "done" && "Thanks. You're on the list."}
                                {state === "error" && "That didn't go through. Please try again."}
                            </p>
                        </form>
                    )}
                </div>

                {/* Columns 2, 3, 4 with subtle vertical dividers matching reference */}
                {columns.map((col) => (
                    <nav
                        key={col.title}
                        aria-label={col.title}
                        className="lg:border-l lg:border-border/70 lg:pl-10"
                    >
                        <p className="text-base font-bold text-foreground">{col.title}</p>
                        <ul className="mt-4 space-y-3 [@media(pointer:coarse)]:space-y-0">
                            {col.links.map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className={`rounded-sm text-[15px] font-normal text-muted-foreground transition-colors hover:text-foreground ${focus} ${coarse}`}>{l.label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                ))}
            </div>

            {/* Dithered Band with cutout Wordmark (renders "CAMPUSCODE" instead of "ACME") */}
            <div aria-hidden="true" className="df-band relative h-60 overflow-hidden" onPointerMove={onMove} onPointerLeave={onLeave}>
                <div ref={field} className="df-field">
                    {/* One tile wider than the band, slid left by exactly one tile, so the loop is seamless. */}
                    <div className="df-dots" />
                </div>
                <p className="df-mark pointer-events-none absolute -bottom-[0.05em] inset-x-0 mx-auto w-full text-center select-none text-[clamp(3.5rem,13.8vw,11.5rem)] font-black uppercase leading-[0.8] tracking-[-0.03em] text-[#FFFFFF] [font-weight:950] [-webkit-text-stroke:1.5px_#FFFFFF]">
                    {brand}
                </p>
            </div>

            {/* Optional Bottom Bar if socials/legal provided (copyright and empty space removed) */}
            {(legal.length > 0 || socials.length > 0) && (
                <div className="border-t border-border">
                    <div className="mx-auto flex max-w-[1320px] flex-col gap-4 px-6 py-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                            {legal.map((l) => (
                                <a key={l.label} href={l.href} className={`rounded-sm transition-colors hover:text-foreground ${focus} ${coarse}`}>{l.label}</a>
                            ))}
                            {status && (
                                <a href={status.href} className={`inline-flex items-center gap-2 rounded-sm transition-colors hover:text-foreground ${focus} ${coarse}`}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                                    {status.label}
                                </a>
                            )}
                        </div>
                        {socials.length > 0 && (
                            <div className="-mr-2 flex items-center gap-1">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        aria-label={s.label}
                                        className={`grid h-9 w-9 place-items-center rounded-md transition-colors hover:bg-foreground/5 hover:text-foreground ${focus} [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11`}
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                                <span className="mx-2 h-4 w-px bg-border" aria-hidden="true" />
                                <button type="button" onClick={toTop} className={`inline-flex items-center gap-1.5 rounded-sm px-1 transition-colors hover:text-foreground ${focus} ${coarse}`}>
                                    Back to top
                                    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </footer>
    );
}

export { DitheredFooter };
