// Node ESM loader that appends `.js` when a relative import omits the extension
// (Next.js permits this; plain Node ESM doesn't). Required to import beevago's
// calculator directly from a Node script.

import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".")) {
    const hasExt = /\.(m?js|cjs|json)$/.test(specifier);
    if (!hasExt) {
      const parentUrl = context.parentURL;
      if (parentUrl) {
        const parentPath = fileURLToPath(parentUrl);
        const base = path.resolve(path.dirname(parentPath), specifier);
        for (const candidate of [`${base}.js`, `${base}.mjs`, `${base}/index.js`]) {
          if (existsSync(candidate)) {
            return nextResolve(`${specifier}${candidate.slice(base.length)}`, context);
          }
        }
      }
    }
  }
  return nextResolve(specifier, context);
}
