import { Adapter, Builder } from "@sveltejs/kit";
import path from "path";

interface AdapaterOptions {
  build: string;
}

export default function plugin(
  options: AdapaterOptions = { build: "build" }
): Adapter {
  return {
    name: "svelte-adapter-github-pages",

    async adapt(builder) {
      builder.rimraf(options.build);

      builder.writeClient(options.build);
      builder.writePrerendered(options.build);

      await builder.generateFallback(path.join(options.build, "404.html"));

      // await builder.compress(options.build); // No need to compress
    },
  };
}
