import { Manifest } from "../types";
import { build } from "esbuild";

export class Bundler {
  #manifest: Manifest;
  #pathToBundle: Map<string, string>;
  constructor(manifest: Manifest) {
    this.#manifest = manifest;
    this.#pathToBundle = new Map();
  }

  async get(p: string) {
    if (this.#pathToBundle.has(p)) {
      return this.#pathToBundle.get(p);
    }
    const metafile = await build({
      entryPoints: [p],
      write: false,
      metafile: true,
      bundle: true,
      format: "esm",
      external: ["react", "react-dom"],
    });
    const content = metafile.outputFiles[0].text;
    this.#pathToBundle.set(p, content);
    return content;
  }
}
