# ki-khabo docs

Everything about the project lives here, one topic per file. Start with the overview, then read whatever you need.

| File | What's in it |
| --- | --- |
| [overview.md](overview.md) | What the project is, who it's for, goals, glossary |
| [architecture.md](architecture.md) | Tech stack, components, data flow, folder layout |
| [progress.md](progress.md) | Current status: what's done, in progress, blocked |
| [next-steps.md](next-steps.md) | Roadmap and prioritized backlog |
| [sprints/](sprints/) | One file per sprint: goal, tasks, outcome, retro |
| [features/](features/) | One file per feature: what it does, how it works, status |
| [decisions/](decisions/) | Important decisions and why they were made |

## Keeping docs current

- **Start of a sprint:** copy `sprints/_template.md` to `sprints/sprint-NN.md` and fill in the goal and planned tasks.
- **New feature:** copy `features/_template.md` to `features/<feature-name>.md` and add it to `features/README.md`.
- **Big choice made** (library, database, hosting, data model): add a file in `decisions/`.
- **End of a sprint:** fill in the sprint's outcome and retro, then update `progress.md` and `next-steps.md`.
