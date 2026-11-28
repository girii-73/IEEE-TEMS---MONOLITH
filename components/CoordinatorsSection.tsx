import { EVENT } from "@/data/event";

export function CoordinatorsSection() {
  return (
    <section
      id="coordinators"
      aria-labelledby="coordinators-heading"
      className="section-y mx-auto max-w-6xl px-4 sm:px-8"
    >
      <p className="section-label">Team 10</p>
      <h2
        id="coordinators-heading"
        className="mt-4 font-display text-3xl font-semibold tracking-tight text-mist sm:text-4xl"
      >
        The people behind it
      </h2>
      <p className="mt-3 text-sm text-dusk">
        Student coordinators · IEEE TEMS SEC SBC
      </p>

      <ul className="heading-gap grid grid-cols-1 gap-x-10 border-t border-hairline sm:grid-cols-2 lg:grid-cols-3">
        {EVENT.COORDINATORS.map(({ name, phone }) => {
          const isPlaceholder = /x/i.test(phone);
          return (
            <li
              key={name}
              className="border-b border-hairline py-5 sm:py-6"
            >
              <p className="font-display text-base font-medium text-mist sm:text-lg">
                {name}
              </p>
              {isPlaceholder ? (
                <p className="mt-1 text-sm text-dusk tabular-nums">{phone}</p>
              ) : (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="mt-1 inline-block text-sm text-dusk tabular-nums transition-colors hover:text-mist"
                >
                  {phone}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
