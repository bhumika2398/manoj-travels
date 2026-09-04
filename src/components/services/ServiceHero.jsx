import { Image } from "@/components/ui/Image";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";

export function ServiceHero({ service }) {
  return (
    <section className="relative flex h-[65vh] min-h-[460px] items-end overflow-hidden bg-[var(--color-ink)]">
      <div className="absolute inset-0">
        <Image src={service.heroImage} alt="" wrapperClassName="h-full w-full" priority sizes="100vw" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/50 to-[var(--color-ink)]/10" />
      <div className="container-edge relative z-10 mx-auto w-full max-w-7xl pb-14 pt-32">
        <p className="text-eyebrow text-[var(--color-accent-soft)]">
          {service.shortName}
        </p>
        <h1 className="text-balance text-h2 mt-4 max-w-2xl font-display text-[var(--color-text-on-dark)]">
          {service.name}
        </h1>
        <p className="text-lead mt-5 max-w-xl text-[var(--color-text-on-dark-muted)]">
          {service.tagline}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Button href="/fleet" variant="accent" size="lg">
            Book / Enquire Now
          </Button>
          <WhatsAppButton
            message={`Hello Manoj Tours and Travels, I would like to enquire about ${service.name}.`}
          />
        </div>
      </div>
    </section>
  );
}
