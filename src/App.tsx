import { LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import { buttonClass } from "@/components/button-class";
import { Chip } from "@/components/Chip";
import { bn } from "@/content/bn";
import { Landing } from "@/screens/Landing";
import { AppStateProvider } from "@/state/app-state";

// Landing loads with the app; every other screen loads when first opened.
const Battle = lazy(() => import("@/screens/Battle").then((mod) => ({ default: mod.Battle })));
const Challenge = lazy(() => import("@/screens/Challenge").then((mod) => ({ default: mod.Challenge })));
const ChallengePlay = lazy(() => import("@/screens/ChallengePlay").then((mod) => ({ default: mod.ChallengePlay })));
const Group = lazy(() => import("@/screens/Group").then((mod) => ({ default: mod.Group })));
const Loading = lazy(() => import("@/screens/Loading").then((mod) => ({ default: mod.Loading })));
const Quick = lazy(() => import("@/screens/Quick").then((mod) => ({ default: mod.Quick })));
const NotFound = lazy(() => import("@/screens/NotFound").then((mod) => ({ default: mod.NotFound })));
const Result = lazy(() => import("@/screens/Result").then((mod) => ({ default: mod.Result })));
const Roulette = lazy(() => import("@/screens/Roulette").then((mod) => ({ default: mod.Roulette })));
const ShareCard = lazy(() => import("@/screens/ShareCard").then((mod) => ({ default: mod.ShareCard })));
const StepAge = lazy(() => import("@/screens/StepAge").then((mod) => ({ default: mod.StepAge })));
const StepBudget = lazy(() => import("@/screens/StepBudget").then((mod) => ({ default: mod.StepBudget })));
const StepGender = lazy(() => import("@/screens/StepGender").then((mod) => ({ default: mod.StepGender })));
const StepMeal = lazy(() => import("@/screens/StepMeal").then((mod) => ({ default: mod.StepMeal })));
const StepMood = lazy(() => import("@/screens/StepMood").then((mod) => ({ default: mod.StepMood })));
const Wrapped = lazy(() => import("@/screens/Wrapped").then((mod) => ({ default: mod.Wrapped })));

function AnimatedRoutes() {
  const location = useLocation();
  return (
    // Screen in: fade + rise 12px, 350ms. Entrance only, so the old screen is never
    // left on screen (or clickable) while the new one appears.
    <m.div
      key={location.pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Suspense fallback={null}>
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
        <Route path="/step/gender" element={<StepGender />} />
        <Route path="/step/age" element={<StepAge />} />
        <Route path="/step/mood" element={<StepMood />} />
        <Route path="/step/meal" element={<StepMeal />} />
        <Route path="/step/budget" element={<StepBudget />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/result" element={<Result />} />
        <Route path="/roulette" element={<Roulette />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/share" element={<ShareCard />} />
        <Route path="/quick" element={<Quick />} />
        <Route path="/group" element={<Group />} />
        <Route path="/challenge" element={<Challenge />} />
        <Route path="/c" element={<ChallengePlay />} />
        <Route path="/wrapped" element={<Wrapped />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Suspense>
    </m.div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        {/* Honors prefers-reduced-motion for every motion component. */}
        <LazyMotion features={domAnimation} strict>
        <MotionConfig reducedMotion="user">
          <div className="mx-auto max-w-2xl px-3 py-3 sm:px-4 sm:py-6">
            <div className="ink-outline relative overflow-hidden rounded-frame bg-cream p-4.5">
              <header className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                <Link to="/" className={buttonClass("neutral", "border-b-[3px] px-3 text-[17px]")}>
                  {bn.brandWithEmoji}
                </Link>
                <Chip tone="dhonepata">{bn.noSignup}</Chip>
              </header>
              <main>
                <AnimatedRoutes />
              </main>
            </div>
          </div>
        </MotionConfig>
        </LazyMotion>
      </AppStateProvider>
    </BrowserRouter>
  );
}
