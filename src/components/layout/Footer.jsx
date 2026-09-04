import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { CallButton } from "@/components/common/CallButton";
import { Logo } from "./Logo";
import { footerNav } from "@/config/navigation.config";
import { business, mapsLink } from "@/config/business.config";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="texture-grain bg-[var(--color-ink)] text-[var(--color-text-on-dark)]">
      <Container className="py-16 md:py-20">
        {/* Brand | Explore | Services | Contact */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] md:gap-10">
          <div>
            <Logo tone="light" size="md" />
            <p className="text-body mt-6 max-w-xs text-[var(--color-text-on-dark-muted)]">
              24×7 one way, round trip, local and airport cab service based in
              Bangalore, Karnataka.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CallButton />
              <WhatsAppButton />
            </div>
          </div>

          <div>
            <p className="font-display text-[19px] font-semibold text-[var(--color-text-on-dark)]">Explore</p>
            <ul className="mt-5 space-y-3.5">
              {footerNav.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[17px] text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-accent-soft)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[19px] font-semibold text-[var(--color-text-on-dark)]">Services</p>
            <ul className="mt-5 space-y-3.5">
              {footerNav.services.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[17px] text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-accent-soft)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-display text-[19px] font-semibold text-[var(--color-text-on-dark)]">Contact</p>
            <ul className="mt-5 space-y-3 text-[17px] text-[var(--color-text-on-dark-muted)]">
              <li>
                <a href={`tel:+91${business.phone.primary}`} className="font-medium text-[var(--color-text-on-dark)] hover:text-[var(--color-accent-soft)]">
                  {business.phone.primaryDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:+91${business.phone.secondary}`} className="hover:text-[var(--color-accent-soft)]">
                  {business.phone.secondaryDisplay}
                </a>
              </li>
              <li>
                <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-soft)]">
                  {business.address.city}, {business.address.state}
                </a>
              </li>
              <li className="pt-1 font-medium text-[var(--color-accent-soft)]">
                {business.availabilityLabel}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row — phones, email, address, copyright */}
        <div className="mt-14 border-t border-[var(--color-line-on-dark)] pt-7">
          <div className="flex flex-col gap-4 text-[16px] text-[var(--color-text-on-dark-muted)] md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-x-8">
            <div className="flex flex-wrap gap-x-6 gap-y-2.5">
              <a href={`tel:+91${business.phone.primary}`} className="font-medium text-[var(--color-text-on-dark)] hover:text-[var(--color-accent-soft)]">
                {business.phone.primaryDisplay} (Primary)
              </a>
              <a href={`tel:+91${business.phone.secondary}`} className="font-medium text-[var(--color-text-on-dark)] hover:text-[var(--color-accent-soft)]">
                {business.phone.secondaryDisplay} (Alternate)
              </a>
              <a href={`mailto:${business.email}`} className="hover:text-[var(--color-accent-soft)]">
                {business.email}
              </a>
            </div>
            <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent-soft)]">
              {business.address.full}
            </a>
          </div>
          <p className="mt-6 text-[15px] text-[var(--color-text-on-dark-muted)]/70">
            © {year} Manoj Tours and Travels (Manoj Taxi Service). All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
