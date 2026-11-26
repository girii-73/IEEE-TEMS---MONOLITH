import { EVENT } from "@/data/event";

export function Footer() {
  const phone = EVENT.CONTACT.phone.trim();
  const email = EVENT.CONTACT.email.trim();
  const instagram = EVENT.SOCIALS.instagram.trim();
  const linkedin = EVENT.SOCIALS.linkedin.trim();
  const hasContact = phone.length > 0 || email.length > 0;
  const hasSocials = instagram.length > 0 || linkedin.length > 0;

  return (
    <footer className="border-t border-lilac/15 bg-void/85">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <span className="font-display text-sm font-semibold tracking-[0.14em] text-mist">
            MONOLITH
          </span>
          {EVENT.ORGANISER.trim().length > 0 && (
            <p className="mt-2 text-sm text-dusk">
              Organised by {EVENT.ORGANISER}
            </p>
          )}
        </div>

        {(hasContact || hasSocials) && (
          <div className="flex flex-col gap-6 sm:flex-row sm:gap-12">
            {hasContact && (
              <div className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-mist">Contact</span>
                {email.length > 0 && (
                  <a
                    href={`mailto:${email}`}
                    className="text-dusk transition-colors hover:text-mist rounded-sm"
                  >
                    {email}
                  </a>
                )}
                {phone.length > 0 && (
                  <a
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="text-dusk transition-colors hover:text-mist tabular-nums rounded-sm"
                  >
                    {phone}
                  </a>
                )}
              </div>
            )}

            {hasSocials && (
              <div className="flex flex-col gap-1.5 text-sm">
                <span className="font-semibold text-mist">Follow</span>
                {instagram.length > 0 && (
                  <a
                    href={instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dusk transition-colors hover:text-mist rounded-sm"
                  >
                    Instagram
                  </a>
                )}
                {linkedin.length > 0 && (
                  <a
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dusk transition-colors hover:text-mist rounded-sm"
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>
        )}

        <p className="text-sm text-dusk md:text-right">
          Copyright 2026 MONOLITH
        </p>
      </div>
    </footer>
  );
}
