import { PRIZES_DATA } from "@/data/event";

export function PrizesSection() {
  return (
    <section
      id="prizes"
      aria-labelledby="prizes-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2
            id="prizes-heading"
            className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
          >
            Prizes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-dusk">
            {PRIZES_DATA.certificateNote}
          </p>
        </div>

        <div className="flex flex-col md:items-end">
          <span className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-mist tabular-nums">
            {PRIZES_DATA.totalPool}
          </span>
          <span className="mt-1 text-sm font-medium text-lilac">
            {PRIZES_DATA.totalLabel}
          </span>
        </div>
      </div>

      {/* Clean two-column prize ledger */}
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-mist">
            Day 1 — Management Summit
          </h3>
          <dl className="mt-4 divide-y divide-lilac/15 border-y border-lilac/15">
            {PRIZES_DATA.day1.map((row) => (
              <div
                key={row.place}
                className="flex items-baseline justify-between py-4"
              >
                <dt className="text-sm sm:text-base text-dusk">{row.place}</dt>
                <dd className="text-lg sm:text-xl font-semibold text-mist tabular-nums">
                  {row.amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-mist">
            Day 2 — Sprintathon
          </h3>
          <dl className="mt-4 divide-y divide-lilac/15 border-y border-lilac/15">
            {PRIZES_DATA.day2.map((row) => (
              <div
                key={row.place}
                className="flex items-baseline justify-between py-4"
              >
                <dt className="text-sm sm:text-base text-dusk">{row.place}</dt>
                <dd className="text-lg sm:text-xl font-semibold text-mist tabular-nums">
                  {row.amount}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
