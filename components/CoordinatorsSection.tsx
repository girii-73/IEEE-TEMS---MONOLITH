import { EVENT } from "@/data/event";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "";
  if (parts.length === 1) {
    return parts[0][0];
  }
  return `${parts[0][0]}${parts[1][0]}`;
}

export function CoordinatorsSection() {
  return (
    <section
      id="coordinators"
      aria-labelledby="coordinators-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <h2
        id="coordinators-heading"
        className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
      >
        Student coordinators
      </h2>

      <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 md:gap-y-8">
        {EVENT.COORDINATORS.map((name) => (
          <li key={name} className="flex items-center gap-3.5">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-lilac/30 text-sm font-semibold text-mist"
              style={{
                background:
                  "linear-gradient(145deg, var(--accent-violet), var(--bg-purple))",
              }}
            >
              {getInitials(name)}
            </span>
            <span className="text-sm sm:text-base font-medium text-mist">
              {name}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
