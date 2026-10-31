# কি খাবো? docs

Everything about the project lives here, one topic per file. Start with the brief and overview.

| File | What's in it |
| --- | --- |
| [brief.md](brief.md) | **Source of truth:** vision, scope, product rules, moods, engine, limits, privacy |
| [overview.md](overview.md) | What the app is, who it's for, goals, glossary |
| [architecture.md](architecture.md) | Stack, how the code fits together, routes, folders, design tokens, rules |
| [progress.md](progress.md) | Current status: done, in progress, known issues |
| [next-steps.md](next-steps.md) | Priorities, roadmap and backlog |
| [features/](features/README.md) | One file per feature |
| [sprints/](sprints/README.md) | One file per sprint |
| [decisions/](decisions/README.md) | Important decisions and why |
| [ajke_ki_khabo_interactive_prototype.html](ajke_ki_khabo_interactive_prototype.html) | Interactive prototype (visual and flow reference) |
| [ajke_ki_khabo_design_system.html](ajke_ki_khabo_design_system.html) | Design system: colours, type, buttons, spacing, motion |

## Keeping docs current

- **Start of a sprint:** copy `sprints/_template.md` to `sprints/sprint-NN.md`.
- **New feature:** copy `features/_template.md` to `features/<name>.md` and list it in `features/README.md`.
- **Big choice made:** add a file in `decisions/`.
- **Product rule changes:** update `brief.md` first.
- **End of a sprint:** fill in outcome and retro, then update `progress.md` and `next-steps.md`.
