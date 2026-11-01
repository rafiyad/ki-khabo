import { useState } from "react";
import { Button, ButtonLink } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Confetti } from "@/components/Confetti";
import { useConfetti } from "@/components/use-confetti";
import { FoodCard } from "@/components/FoodCard";
import { Heading } from "@/components/Heading";
import { HealthMeter, HealthWarning } from "@/components/HealthNote";
import { Mascot } from "@/components/Mascot";
import { OptionCard } from "@/components/OptionCard";
import { OptionGroup } from "@/components/OptionGroup";
import { ProgressBar } from "@/components/ProgressBar";
import { bn } from "@/content/bn";
import { catalog, getHealth } from "@/data";
import { BUDGETS, CATEGORIES, DIETS, RESTRICTIONS, type CategoryId } from "@/data/options";
import { bnDigits } from "@/lib/bn-number";
import { GROUP_MAX, GROUP_MIN, groupPick, type GroupMember, type GroupSetup, type GroupVerdict } from "@/lib/group";
import { mealForHour } from "@/lib/meal-time";

const toggle = <T,>(list: T[], item: T) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]);
const SIZES = Array.from({ length: GROUP_MAX - GROUP_MIN + 1 }, (_, i) => GROUP_MIN + i);
const newMember = (): GroupMember => ({ name: "", veto: null, budget: null });

type Phase = { kind: "setup" } | { kind: "member"; index: number } | { kind: "verdict" };

/** "আড্ডা মোড": pass the phone round, everyone vetoes one category, the app gives the verdict. */
export function Group() {
  const [phase, setPhase] = useState<Phase>({ kind: "setup" });
  const [setup, setSetup] = useState<GroupSetup>({ diet: "any", avoid: [], members: [newMember(), newMember()] });
  const t = bn.group;
  const title = setup.members.length === 2 ? t.pairTitle : t.title;

  if (phase.kind === "member") {
    return (
      <MemberStep
        key={phase.index}
        index={phase.index}
        setup={setup}
        onChange={(member) =>
          setSetup((s) => ({ ...s, members: s.members.map((m, i) => (i === phase.index ? member : m)) }))
        }
        onBack={() => setPhase(phase.index === 0 ? { kind: "setup" } : { kind: "member", index: phase.index - 1 })}
        onNext={() =>
          setPhase(phase.index === setup.members.length - 1 ? { kind: "verdict" } : { kind: "member", index: phase.index + 1 })
        }
      />
    );
  }

  if (phase.kind === "verdict") {
    return (
      <Verdict
        setup={setup}
        onAgain={() => {
          setSetup({ diet: "any", avoid: [], members: [newMember(), newMember()] });
          setPhase({ kind: "setup" });
        }}
      />
    );
  }

  return (
    <section>
      <Heading title={title} className="text-[22px] leading-snug">
        {title}
      </Heading>
      <p className="mt-0.5 mb-3 text-muted">{t.subtitle}</p>

      <OptionGroup label={t.howMany} columns={5}>
        {SIZES.map((n) => (
          <OptionCard
            key={n}
            label={t.people(bnDigits(n))}
            selected={setup.members.length === n}
            onClick={() =>
              setSetup((s) => ({
                ...s,
                members: Array.from({ length: n }, (_, i) => s.members[i] ?? newMember()),
              }))
            }
          />
        ))}
      </OptionGroup>

      <OptionGroup label={t.shared} columns={3}>
        {DIETS.map((d) => (
          <OptionCard
            key={d.id}
            emoji={d.emoji}
            label={d.label}
            selected={setup.diet === d.id}
            onClick={() => setSetup((s) => ({ ...s, diet: d.id }))}
          />
        ))}
      </OptionGroup>
      <OptionGroup min={110} className="mt-2.5">
        {RESTRICTIONS.map((r) => (
          <OptionCard
            key={r.id}
            emoji={r.emoji}
            label={r.label}
            selected={setup.avoid.includes(r.id)}
            onClick={() => setSetup((s) => ({ ...s, avoid: toggle(s.avoid, r.id) }))}
          />
        ))}
      </OptionGroup>

      <Button variant="primary" className="mt-4 w-full" onClick={() => setPhase({ kind: "member", index: 0 })}>
        {t.start}
      </Button>
    </section>
  );
}

function MemberStep({
  index,
  setup,
  onChange,
  onBack,
  onNext,
}: {
  index: number;
  setup: GroupSetup;
  onChange: (member: GroupMember) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const t = bn.group;
  const member = setup.members[index];
  const total = setup.members.length;
  const shownName = member.name.trim() || t.defaultName(bnDigits(index + 1));
  const last = index === total - 1;

  return (
    <section>
      <ProgressBar value={((index + 1) / total) * 100} label={`${bnDigits(index + 1)}/${bnDigits(total)}`} className="mb-3" />
      <Heading title={t.title} className="text-[22px] leading-snug">
        {t.passTo(t.defaultName(bnDigits(index + 1)))}
      </Heading>

      <label htmlFor="member-name" className="mt-3 mb-1 block font-bold">
        {t.nameLabel}
      </label>
      <input
        id="member-name"
        className="ink-outline min-h-12 w-full rounded-btn bg-white px-3 text-base"
        placeholder={t.defaultName(bnDigits(index + 1))}
        maxLength={20}
        value={member.name}
        onChange={(e) => onChange({ ...member, name: e.target.value })}
      />

      <OptionGroup label={`${shownName}: ${t.vetoTitle}`} min={110}>
        <OptionCard label={t.noVeto} selected={member.veto === null} onClick={() => onChange({ ...member, veto: null })} />
        {CATEGORIES.map((c) => (
          <OptionCard
            key={c.id}
            emoji={c.emoji}
            label={c.label}
            selected={member.veto === c.id}
            onClick={() => onChange({ ...member, veto: c.id })}
          />
        ))}
      </OptionGroup>

      <OptionGroup label={t.budgetTitle} min={110}>
        {BUDGETS.map((b) => (
          <OptionCard
            key={b.id}
            emoji={b.emoji}
            label={b.label}
            sub={b.sub}
            selected={member.budget === b.id}
            onClick={() => {
              onChange({ ...member, budget: b.id });
              setError(null);
            }}
          />
        ))}
      </OptionGroup>

      <p role="alert" className="mt-1.5 min-h-5 text-[13px] font-semibold text-morich-dark">
        {error}
      </p>
      <div className="mt-2 flex gap-2.5">
        <Button onClick={onBack}>{t.back}</Button>
        <Button variant="primary" className="flex-1" onClick={() => (member.budget ? onNext() : setError(t.needBudget))}>
          {last ? t.finish : t.next}
        </Button>
      </div>
    </section>
  );
}

function Verdict({ setup, onAgain }: { setup: GroupSetup; onAgain: () => void }) {
  const { pieces, fire } = useConfetti();
  const [meal] = useState(() => mealForHour(new Date().getHours()));
  const [verdict, setVerdict] = useState<GroupVerdict | null>(() => groupPick(catalog.foods, setup, meal, Math.random));
  const [appeal, setAppeal] = useState<"none" | "granted" | "denied">("none");
  const t = bn.group;

  if (!verdict) {
    return (
      <section className="py-6 text-center">
        <Mascot expression="sad" className="mx-auto w-24" />
        <p className="mt-2 mb-4 font-semibold">{t.none}</p>
        <Button variant="primary" onClick={onAgain}>
          {t.again}
        </Button>
      </section>
    );
  }

  const { food } = verdict.rec;
  const health = getHealth(food.id);
  const vetoers = (c: CategoryId) =>
    setup.members
      .map((m, i) => (m.veto === c ? m.name.trim() || t.defaultName(bnDigits(i + 1)) : null))
      .filter((n) => n !== null)
      .join(", ");
  const vetoList = verdict.vetoed.map((c) => `${bn.health.categoryNames[c]} (${vetoers(c)})`).join(" · ");
  const budget = BUDGETS.find((b) => b.id === verdict.budget)!;

  function onAppeal() {
    if (appeal !== "none") {
      setAppeal("denied");
      return;
    }
    const again = groupPick(catalog.foods, setup, meal, Math.random, [food.id]);
    if (again) setVerdict(again);
    setAppeal("granted");
    fire();
  }

  return (
    <section>
      <Confetti pieces={pieces} />
      <div className="mb-3 flex items-end gap-2.5">
        <Mascot expression={appeal === "denied" ? "surprised" : "happy"} className="w-20 flex-none" />
        <p aria-live="polite" className="ink-outline flex-1 rounded-[18px_18px_18px_4px] bg-white px-3.5 py-2.5 text-[15px] font-semibold">
          {appeal === "denied" ? t.appealDenied : appeal === "granted" ? t.appealGranted : t.verdictLine}
        </p>
      </div>

      <FoodCard food={food} badge={t.verdictTitle(bnDigits(setup.members.length))}>
        <Heading title={food.name} className="text-[22px] leading-snug">
          {food.name}
        </Heading>
        <div className="mt-2 mb-3 flex flex-wrap gap-2">
          <Chip>{bn.result.price(bnDigits(food.price))}</Chip>
          <Chip tone="white">{t.people(bnDigits(setup.members.length))}</Chip>
        </div>
        <ul className="mb-3 list-disc pl-5 text-sm">
          {verdict.vetoed.length === 0 ? <li>{t.allYaIchchha}</li> : <li>{t.vetoed(vetoList)}</li>}
          {verdict.vetoesIgnored && <li>{t.vetoesIgnored}</li>}
          <li>{t.budgetUsed(budget.label)}</li>
        </ul>
        <HealthWarning health={health} />
        <HealthMeter health={health} className="mt-3" />
        <p className="mt-3 text-xs text-muted">{bn.result.allergyNote}</p>
      </FoodCard>

      <div className="mt-3.5 grid grid-cols-2 gap-2.5">
        <Button onClick={onAppeal} disabled={appeal === "denied"}>
          {t.appeal}
        </Button>
        <ButtonLink to={`/share?food=${food.id}&mode=group`} variant="fun">
          {t.share}
        </ButtonLink>
        <Button variant="primary" className="col-span-2" onClick={onAgain}>
          {t.again}
        </Button>
      </div>
    </section>
  );
}
