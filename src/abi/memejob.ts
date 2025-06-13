import memejobBuy from "./memejob-buy";
import memejobCreate from "./memejob-create";
import memejobErrors from "./memejob-errors";
import memejobEvents from "./memejob-events";
import memejobGetTokens from "./memejob-get-tokens";
import memejobQuote from "./memejob-quote";
import memejobSell from "./memejob-sell";

/** Compose and export full memejob ABI from given fragments. */
export default [
  ...memejobBuy,
  ...memejobCreate,
  ...memejobErrors,
  ...memejobEvents,
  ...memejobGetTokens,
  ...memejobQuote,
  ...memejobSell,
];
