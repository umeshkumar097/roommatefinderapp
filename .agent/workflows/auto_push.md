---
description: Automatically push code to GitHub after completing tasks
---

This workflow ensures that code is pushed to the remote repository frequently.

1. Check for changes
   Run `git status` to see if there are any changes to commit.

2. Add changes
   Run `git add .` to stage all changes.

3. Commit changes
   // turbo
   Run `git commit -m "chore: auto-push updates"` (or a more descriptive message if provided).

4. Push to remote
   // turbo
   Run `git push origin main`
