#!/usr/bin/env node
import openapiTS, { astToString } from "openapi-typescript";
import { writeFileSync } from "node:fs";
import meow from "meow";
import chalk from "chalk";

const OPEN_API_SCHEMA_URL =
  "https://mainnet-public.mirrornode.hedera.com/api/v1/docs/openapi.yml";
const log = console.log;

const cli = meow(
  `
	Usage
	  $ happer

	Options
	  --schema, -s  OpenAPI schema (default: mainnet-public)
   --output, -o  Typescript schema output path
`,
  {
    importMeta: import.meta,
    booleanDefault: undefined,
    flags: {
      schema: {
        type: "string",
        default: OPEN_API_SCHEMA_URL,
        shortFlag: "s",
      },
      output: {
        type: "string",
        default: "./src/mirror/openapi/schema.d.ts",
        shortFlag: "o",
      },
    },
  }
);

try {
  log(chalk.blue(`Fetching openAPI schema: ${cli.flags.schema}`));

  const abstractSyntaxTree = await openapiTS(cli.flags.schema);
  const contents = astToString(abstractSyntaxTree);

  log("Writing declaration file...");
  writeFileSync(cli.flags.output, contents);

  log(chalk.green(`File successfully written: ${cli.flags.output}`));
} catch (error) {
  console.error("Failed to generate the schema.", error);
}
