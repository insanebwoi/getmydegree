import { Reveal } from "./Reveal";

type Stat = { value: string; label: string };

export function Stats({
  items,
  dark = false,
}: {
  items: Stat[];
  dark?: boolean;
}) {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
      {items.map((s, i) => (
        <Reveal key={s.label} delay={i * 70}>
          <div className="text-center">
            <dt className={`text-sm ${dark ? "text-white/60" : "text-muted"}`}>
              {s.label}
            </dt>
            <dd
              className={`t-stat order-first font-display font-medium ${
                dark ? "text-white" : "text-ink"
              }`}
            >
              {s.value}
            </dd>
          </div>
        </Reveal>
      ))}
    </dl>
  );
}
