<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Admin editors register unsaved state and discard/overview callbacks with the shared AdminNavigationProvider; all category returns and route exits use this guard to prevent silent loss and clear discarded previews.
- Every destructive action in the admin panel (deleting a post, a repeatable block or similar) must ask for confirmation in a dialog before any data is mutated, so nothing disappears from the site on a single click.
- Generated customer-case images are bundled imports in the reference seed data; existing content merging supplies them only when no customer image is set, preserving editorial replacements.
