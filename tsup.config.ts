import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/abi/index.ts",
    "src/adapters/index.ts",
    "src/chains/index.ts",
    "src/ipfs/index.ts",
    "src/mirror/index.ts",
    "src/utils/index.ts",
  ],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: "dist",
});
