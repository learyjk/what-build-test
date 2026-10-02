# Coding agent prompt

Start your coding agent from the repository root, and review its proposed
changes before committing or pushing anything.

## Visualize the results

```text
Help me complete the activity in this repository.

Read the README, then inspect src/pages/index.astro. Find ACTIVITY STARTER and the buildResultRow() function.

Modify only src/pages/index.astro. Extend buildResultRow() so each result includes a horizontal percentage bar using the choice's accent color. Add visible "— your pick" text to the selected choice while preserving the existing sole-leader and tied-leader labels and data attributes.

Use the CSS in learner-resources/results-styles.css. Paste those rules into the designated <style is:global> block near the bottom of index.astro.

Do not change the database, migrations, API routes, choice definitions, or the learner resource files.

Run npm run build and git diff --check, then summarize the changes and validation results. Do not commit or push anything.
```
