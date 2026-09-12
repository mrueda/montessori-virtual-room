import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
// Hosting is supplied at build time with --base; default / works on Vercel.
export default defineConfig({
  plugins: [
    react(),
    {
      name: "legacy-public-entry-pages",
      apply: "build",
      // Keep previously shared demo links working as ungated public classroom entry points.
      async writeBundle(options) {
        const output = resolve(options.dir ?? "dist");
        const html = await readFile(resolve(output, "index.html"), "utf8");
        for (const slug of ["greenwood"]) {
          const directory = resolve(output, "school", slug);
          await mkdir(directory, { recursive: true });
          await writeFile(resolve(directory, "index.html"), html);
        }
      },
    },
  ],
});
