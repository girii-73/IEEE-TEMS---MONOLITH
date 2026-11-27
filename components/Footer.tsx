import { EVENT, getDisplayVenue } from "@/data/event";

export function Footer() {
  const phone = EVENT.CONTACT.phone.trim();
  const email = EVENT.CONTACT.email.trim();
  const instagram = EVENT.SOCIALS.instagram.trim();
  const linkedin = EVENT.SOCIALS.linkedin.trim();

  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <span className="font-display text-sm font-semibold tracking-[0.18em] text-mist">
              MONOLITH
            </span>
            <p className="mt-3 text-sm text-dusk leading-relaxed">
              A two-day student technology festival by {EVENT.ORGANISER}.{" "}
              {EVENT.EVENT_DATES.shortRange} · {getDisplayVenue()}.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div className="flex flex-col gap-2 text-sm">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                Explore
              </span>
              <a href="#about" className="text-dusk hover:text-mist transition-colors">
                About
              </a>
              <a href="#schedule" className="text-dusk hover:text-mist transition-colors">
                Timeline
              </a>
              <a href="#passes" className="text-dusk hover:text-mist transition-colors">
                Register
              </a>
              <a href="#faq" className="text-dusk hover:text-mist transition-colors">
                FAQ
              </a>
            </div>

            <div className="flex flex-col gap-2 text-sm">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                Contact
              </span>
              {email.length > 0 && (
                <a
                  href={`mailto:${email}`}
                  className="text-dusk hover:text-mist transition-colors break-all"
                >
                  {email}
                </a>
              )}
              {phone.length > 0 && (
                <a
                  href={`tel:${phone.replace(/\s+/g, "")}`}
                  className="text-dusk hover:text-mist transition-colors tabular-nums"
                >
                  {phone}
                </a>
              )}
            </div>

            <div className="flex flex-col gap-2 text-sm col-span-2 sm:col-span-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mute">
                Follow
              </span>
              {instagram.length > 0 && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dusk hover:text-mist transition-colors"
                >
                  Instagram
                </a>
              )}
              {linkedin.length > 0 && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dusk hover:text-mist transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-mute">
            © 2026 MONOLITH · Organised by {EVENT.ORGANISER}
          </p>
          <p className="text-xs text-mute">
            Sri Sai Ram Engineering College · IEEE Madras Section
          </p>
        </div>
      </div>
    </footer>
  );
}
