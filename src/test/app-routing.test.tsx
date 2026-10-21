import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("opens a standalone work page rather than the services page or portfolio listing", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/trabajos/fundaciones-edificio");
    const last = matches.at(-1);

    expect(last?.routeId).toBe("/trabajos_/$trabajoId");
    expect((last?.params as { trabajoId?: string }).trabajoId).toBe("fundaciones-edificio");
    expect(
      matches.some((match) => match.routeId === "/trabajos" || match.routeId === "/servicios"),
    ).toBe(false);
  });
});