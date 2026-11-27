import { EVENT } from "@/data/event";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0][0];
  return `${parts[0][0]}${parts[1][0]}`;
}

export function CoordinatorsSection() {
  return (
    <section
      id="coordinators"
      aria-labelledby="coordinators-heading"
      className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-32"
    >
      <div className="section-rule mb-16 md:mb-20" />

      <p className="section-label">Team 09</p>
      <h2
        id="coordinators-heading"
        className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-mist"
      >
        The people behind it
      </h2>
      <p className="mt-3 text-sm text-dusk">Student coordinators · IEEE TEMS SEC SBC</p>

      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6">
        {EVENT.COORDINATORS.map((name) => (
          <li key={name} className="flex flex-col items-start gap-3">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center border border-edge bg-raised text-xs font-semibold tracking-wider text-mist"
            >
              {getInitials(name)}
            </span>
            <span className="text-sm font-medium text-mist leading-snug">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
