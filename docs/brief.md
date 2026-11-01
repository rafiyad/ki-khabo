# Product brief: কি খাবো? (Ki Khabo?)

_Source of truth for features, rules and copy. Distilled from the product/strategy discussion on 2026-10-31. Visual style and screen flow: [ajke_ki_khabo_interactive_prototype.html](ajke_ki_khabo_interactive_prototype.html). Tokens: [ajke_ki_khabo_design_system.html](ajke_ki_khabo_design_system.html)._

## Vision

> The daily food decision maker that knows your mood, respects your budget, and makes you laugh.

A funny food-choosing platform for people who don't know what they want to eat. It solves a simple daily problem through **humor, personalization, and shareable experiences**.

**Platform:** an installable web app (PWA): mobile-first and app-like, can be added to the home screen, and hosted free on Vercel. No app store.

Main tagline: "খাবার আছে, টাকা আছে, ক্ষুধাও আছে — কিন্তু কী খাবো বুঝতেছি না!"

**Who it's for (first):** university students, office workers, friend groups, couples, and people living away from family, in Bangladesh.

## Core pillars

| Pillar | What it means |
| --- | --- |
| Personalization | Gender, age, mood, time |
| Recommendation | Food suggested to fit the user |
| Entertainment | Funny dialogue, roast, memes |
| Decision making | Random selection, food roulette |
| Social sharing | Result card, friend challenge |
| Retention | Daily challenge, history |

## User journey

One question per screen, with a progress bar:

1. **Landing:** funny welcome.
2. **Gender:** পুরুষ (male) or নারী (female).
3. **Age:** ১৮-এর কম, ১৮–২৫, ২৬–৩৫, ৩৬–৫০, ৫০+.
4. **Mood:** "🤷 জানি না" (not sure) first for everyone, then the list for the selected gender, plus "সব Mood দেখুন" (see all moods).
5. **Meal time:** pre-selected from the clock; the user can change it.
6. **Budget and food restrictions:** veg/non-veg, allergies, favorite categories.
7. **Loading:** funny messages.
8. **Result:** **one dish at a time**, with "আরেকটা দেখাও" (show another), "না ভাই, এটা হবে না" (reject), "এইটাই খাবো" (I'll eat this) and "বন্ধুকে পাঠাও" (send to a friend).
9. **Share card.**

## Scope

**P0 (MVP must-have):** landing page, gender and age input, mood selection, meal-time detection, recommendation engine, budget filter, funny result, try again and reject.

**P1 (should have):** food roulette, roast mode, food battle, shareable result card, food personality test, favorite foods, food history.

**P2 (future):** AI food companion, daily food horoscope, friend challenge, leaderboard, restaurant recommendations, location-based discovery.

**Feature scoring** for deciding what's next: user value 30%, viral potential 25%, engagement 20%, development cost 15%, business value 10%.

**Idea filter.** A new idea goes into development only if it passes all five:

1. Does it solve a user problem?
2. Will it make people laugh or enjoy themselves?
3. Is it worth sharing?
4. Will it bring people back?
5. Is it realistic to build?

## Product rules

1. **5-second rule.** Within 5 seconds a visitor understands what the site does, how to use it, and where the fun is. No registration or login, ever, to get started.
2. **Shareability.** Every recommendation can become a share card, with options to share on Facebook, share on WhatsApp, and download the meme.
3. **Surprise.** The same inputs shouldn't always give the same result. The criteria stay the same, but there's variety among the good matches.
4. **Humor.** Joke about the situation, never the person. No jokes targeting **gender, age, body shape, mental health, or financial condition**.
5. **Viral loop.** Visit → funny recommendation → meme card → share → friends visit.
6. **Habit-forming, not annoying.** Daily challenges and new messages are fine. No unnecessary notifications, no forced registration, no dark patterns.

## Moods and gender

- Gender options are **Male and Female**.
- Mood is always **self-reported**. Nothing is inferred from gender.
- The mood list shown can depend on the selected gender:
  - **Female:** Happy, Sad, Angry, Confused, Anxiety, Depressed, Overthinking, Irritated, Lonely, Stressed, Insecure, Fearful, Guilty, Disappointed, Frustrated, Overwhelmed, Low Energy, Restless, Calm, Very Energetic, Bored, Jealous, Heartbroken.
  - **Male:** a separate list, to be defined later. Until then, men see the full list.
- Moods are **not locked to gender**: any user can pick any mood (for example via a "show all moods" option).
- **"🤷 জানি না"** is always the first option. No dish is matched to it, so the engine picks a surprise among dishes that fit the budget, meal time and preferences. The result explains it ("আজকে ভাগ্যই আপনার শেফ!") and hides the mood-match bar. (Added 2026-11-01.)
- Anxiety, Depressed and similar words are self-reported moods, **not diagnoses**.

## Recommendation engine

Rule-based first; AI later, if ever.

**Inputs:** gender, age, mood, meal time, budget, food preference, food type, allergies and dietary restrictions, rejected foods.

**Pipeline:**

1. **Eligibility (hard rules):** remove foods that break dietary restrictions, contain the user's allergens, or that the user rejected. Hard rules can never be outweighed by score.
2. **Scoring (soft rules):** `score = 0.35·Mood + 0.25·Budget + 0.20·Time + 0.20·Preference`, each 0–100.
3. **Diversity:** reduce repeats of recently shown foods.
4. **Selection:** weighted random among the top results, so higher scores are more likely but not guaranteed.
5. **Humor:** funny copy is chosen by a separate step after the food is picked.

**Further rules:**

- Gender and age **never** affect which foods are suitable. Gender only decides which mood list is shown first.
- Allergy filters are never ignored. If a food's ingredient data is incomplete, it must not be treated as safe.
- Food, mood and mapping data are kept as data, separate from engine code, so adding a mood or food doesn't change the engine.
- Keep the engine independent of where the data comes from (file today, database later).

## Daily limits: 3 chances

Part of the joke: stop overthinking and decide.

- **Suggestions:** 3 dishes per day. The first result counts, then 2 more via "আরেকটা দেখাও" or "না ভাই".
- **Food wheel:** 3 spins per day, counted separately from suggestions.
- Limits reset at local midnight and are saved on the device. The screen shows how many chances are left.
- **At the limit:** the last dish becomes "শেষ সিদ্ধান্ত!" (final decision) with a roast line. Only "এইটাই খাবো" and sharing stay available. Restarting the quiz shows the same final dish until midnight.
- **Safety exception:** if the user changes allergies or veg/non-veg and the final dish no longer fits, they get a safe dish without it counting as a chance.
- Opening a wheel result's details doesn't use a suggestion.

## Food battle

Without a server there are no real votes. Each pair has **fixed poll numbers** in the data, clearly labelled "মজার জরিপ" (fun poll, not real votes).

## Accessibility

- Text must meet WCAG AA contrast:
  - **dark ink text** on masala (orange) and dhonepata (green) buttons
  - the emergency button uses a **darker morich `#C0312A`** with white text
  - darker green and red for small text on cream
- 48px minimum tap targets, keyboard accessible, Lighthouse accessibility 95+.

## Privacy, safety and trust

- Gender and age stay on the device for the current visit only (session storage), and never affect which foods are recommended.
- Personal data isn't stored on a server. Preferences and history may live in the browser (local storage), and the user can clear them.
- The share card doesn't show personal info (such as mood) by default.
- Allergy and dietary filters are separate and always enforced.
- Mood data is never sent to analytics.

## Analytics (later)

Track daily active users, recommendation conversion, reject rate, share rate, return rate and session duration, using privacy-friendly analytics without mood data.

Viral coefficient `K = I × C` (shares per user × conversion per share); K > 1 suggests viral growth.

## Definition of done

A feature is done when it is:

- documented
- designed
- validated
- tested
- error-handled
- mobile-responsive
- covered for loading and empty states
- accessibility-checked
- free of critical security issues
- passing its acceptance criteria

## Technology (decided)

Static, installable web app on free Vercel: Vite + React + TypeScript + Tailwind CSS, with no backend. **No Spring Boot.** See [decisions/](decisions/).

## Open product decisions

- Target market: Bangladesh first (assumed), global later?
- Brand personality: the prototype reads as funny + desi + lightly savage.
- Male mood list.

