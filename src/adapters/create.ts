import type { MJClient } from "../MJClient";
import type { MJAdapter, MJAdapterParameters } from "./MJAdapter";

export const MJ_ADAPTER_CONSTRUCTOR_GUARD = Symbol(
  "MJ_ADAPTER_CONSTRUCTOR_GUARD"
);

export type CreateAdapterFunc<A extends MJAdapter> = (
  client: MJClient<A>,
  overrides?: Partial<ConstructorParameters<typeof MJAdapter>[1]>
) => A;

export function createAdapter<
  A extends MJAdapter,
  T extends new (
    ...args: any[]
  ) => A,
>(
  Adapter: T,
  params: Omit<ConstructorParameters<T>[1], keyof MJAdapterParameters>
): CreateAdapterFunc<A> {
  return (client, overrides) => {
    return new Adapter(MJ_ADAPTER_CONSTRUCTOR_GUARD, {
      client,
      ...params,
      ...overrides,
    }) as A;
  };
}
