import type { MJClient } from "../MJClient";
import type { MJAdapter, MJAdapterParameters } from "./MJAdapter";

/**
 * Symbol used as a guard to restrict direct construction of MJAdapter instances.
 */
export const MJ_ADAPTER_CONSTRUCTOR_GUARD = Symbol(
  "MJ_ADAPTER_CONSTRUCTOR_GUARD"
);

/**
 * Factory function type to create an instance of an MJAdapter.
 * @template A - The MJAdapter subclass type.
 * @param client - The MJClient instance to associate with the adapter.
 * @param overrides - Optional partial overrides for the adapter constructor parameters.
 * @returns An instance of the adapter type A.
 */
export type CreateAdapterFunc<A extends MJAdapter> = (
  client: MJClient<A>,
  overrides?: Partial<ConstructorParameters<typeof MJAdapter>[1]>
) => A;

/**
 * Creates a factory function that instantiates a given MJAdapter subclass with predefined parameters.
 *
 * @template T - The constructor type of the adapter class that extends MJAdapter.
 * @param Adapter - The MJAdapter subclass constructor.
 * @param params - Parameters for the adapter constructor.
 * @returns A function that, given a client and optional overrides, returns an instance of the specific adapter type.
 *
 * @example
 * ```typescript
 * const native = createAdapter(NativeAdapter, { hederaClient: ... });
 * const evm = createMyAdapter(EvmAdapter, { account: ... });
 * ```
 */
export function createAdapter<T extends new (...args: any[]) => MJAdapter>(
  Adapter: T,
  params: Omit<ConstructorParameters<T>[1], keyof MJAdapterParameters>
): CreateAdapterFunc<
  T extends new (...args: any[]) => infer ReturnType ? ReturnType : never
> {
  return (client, overrides) => {
    return new Adapter(MJ_ADAPTER_CONSTRUCTOR_GUARD, {
      client,
      ...params,
      ...overrides,
    }) as T extends new (
      ...args: any[]
    ) => infer ReturnType
      ? ReturnType
      : never;
  };
}
