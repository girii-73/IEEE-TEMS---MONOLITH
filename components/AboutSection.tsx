import { Compass, Cpu, Network, Sparkles, Users } from "lucide-react";
import { ABOUT_COPY } from "@/data/event";

const GOAL_ICONS = [Sparkles, Cpu, Users, Compass, Network];

export function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-6xl px-5 py-20 sm:px-8 md:py-28"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2
            id="about-heading"
            className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-mist"
          >
            {ABOUT_COPY.title}
          </h2>
          <p className="mt-5 max-w-[60ch] text-base sm:text-lg text-dusk leading-relaxed">
            {ABOUT_COPY.description}
          </p>
        </div>

        <div className="lg:col-span-7">
          <ul className="divide-y divide-lilac/15 border-y border-lilac/15">
            {ABOUT_COPY.goals.map((goal, index) => {
              const Icon = GOAL_ICONS[index % GOAL_ICONS.length];
              return (
                <li key={goal} className="flex items-start gap-4 py-4 sm:py-5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-lilac/25 bg-deep/75 text-lilac">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-base font-medium text-mist leading-relaxed">
                    {goal}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
