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

## Architecture
- Keep the shared site header and footer in the root layout; each named content page has its own route and metadata for direct navigation.
- Keep service descriptions and illustrative assets in a shared browser-safe module so pages remain consistent.
- Use the shared service carousel on specialty cards and service detail sections; keep its controls outside navigation links to avoid accidental page changes.
- Contact inquiries are insert-only for visitors, validated by a shared Zod schema and database constraints; no visitor may read submitted personal data.
- Store portfolio records and typed photo/video media separately from service data; standalone `trabajos_.$trabajoId` pages avoid nesting project details inside the portfolio listing.
- Use the work gallery for project media, with native video controls and photo enlargement; this keeps mixed-media behavior independent from service carousels.
