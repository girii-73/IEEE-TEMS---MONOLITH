import { EVENT, PASSES_DATA } from "@/data/event";

export function PassesSection() {
  return (
    <section
      id="passes"
      aria-labelledby="passes-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <h2
        id="passes-heading"
        className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
      >
        Passes
      </h2>
      <p className="mt-3 text-sm sm:text-base text-dusk">
        Fees are per person. For Day 2, teams register together.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {PASSES_DATA.map((pass) => {
          const url = EVENT.REG_URLS[pass.urlKey].trim();
          const hasUrl = url.length > 0;

          return (
            <article
              key={pass.id}
              className={`glass-panel flex flex-col justify-between rounded-[12px] p-7 sm:p-8 ${
                pass.featured ? "ring-1 ring-amethyst/60" : ""
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 min-h-[28px]">
                  <h3 className="text-base sm:text-lg font-semibold text-mist">
                    {pass.name}
                  </h3>
                  {pass.badge && (
                    <span className="rounded-full border border-lilac/40 bg-purple/65 px-3 py-0.5 text-xs font-medium text-lilac tabular-nums">
                      {pass.badge}
                    </span>
                  )}
                </div>

                <p className="mt-5 font-display text-4xl font-semibold text-mist tabular-nums">
                  {pass.price}
                </p>

                <p className="mt-3 text-sm font-medium text-lilac">
                  {pass.subtitle}
                </p>
                <p className="mt-1 text-sm text-dusk leading-relaxed">
                  {pass.detail}
                </p>
              </div>

              <div className="mt-8">
                {hasUrl ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold active:scale-[0.98] ${
                      pass.featured ? "cta-primary" : "cta-secondary"
                    }`}
                  >
                    {pass.buttonLabel}
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-center rounded-full border border-lilac/15 bg-deep/50 px-5 py-3 text-sm font-semibold text-dusk/60"
                  >
                    Opens soon
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
