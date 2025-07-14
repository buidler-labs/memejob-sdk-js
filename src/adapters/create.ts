import type { OperationalMode } from "../types";
import type { MJAdapter, MJAdapterParameters } from "./MJAdapter";

/**
 * Symbol used as a guard to restrict direct construction of MJAdapter instances.
 * This ensures that MJAdapter instances can only be created through the official factory function.
 */
export const MJ_ADAPTER_CONSTRUCTOR_GUARD = Symbol(
  "MJ_ADAPTER_CONSTRUCTOR_GUARD"
);

/**
 * Type constraint for MJAdapter constructor functions.
 * Defines the signature that all MJAdapter subclass constructors must follow.
 *
 * @template Mode - The operational mode of the adapter, defaults to any OperationalMode
 */
export type MJAdapterConstructor<M extends OperationalMode = OperationalMode> =
  new (
    guard: symbol,
    params: any
  ) => MJAdapter<M>;

/**
 * Parameters type for createAdapter function, excluding base MJAdapterParameters.
 * This type represents the adapter-specific parameters that can be passed to createAdapter,
 * with the common MJAdapterParameters fields omitted to avoid duplication.
 *
 * @template M - The operational mode of the adapter, defaults to "returnResult"
 * @template A - The MJAdapter constructor type, defaults to MJAdapterConstructor<M>
 */
export type CreateAdapterParams<
  M extends OperationalMode = "returnResult",
  A extends MJAdapterConstructor<M> = MJAdapterConstructor<M>,
> = Omit<ConstructorParameters<A>[1], keyof MJAdapterParameters<M>> & {
  /** The operational mode of the adapter - determines return type behavior */
  operationalMode?: M;
};

/**
 * Factory function type to create an instance of an MJAdapter.
 * This type defines the signature of the function returned by createAdapter.
 *
 * @template A - The MJAdapter subclass type
 * @param overrides - Optional configuration overrides for the adapter constructor parameters
 * @returns An instance of the adapter type
 */
export type CreateAdapterFunc<A extends MJAdapter> = (
  overrides?: Partial<ConstructorParameters<typeof MJAdapter>[1]>
) => A;

/**
 * Creates a factory function that instantiates a given MJAdapter subclass with predefined parameters.
 * This function provides type-safe adapter creation with proper operational mode inference.
 *
 * When operationalMode is explicitly provided, the Mode generic is inferred from the provided value.
 * When operationalMode is not provided, it defaults to "returnResult" both at type and runtime level.
 *
 * @template A - The constructor type of the adapter class that extends MJAdapter
 * @template M - The operational mode of the adapter
 * @param Adapter - The MJAdapter subclass constructor
 * @param params - Parameters for the adapter constructor with explicit operationalMode
 * @returns A function that creates an instance of the specific adapter type with inferred mode
 *
 * @example
 * ```typescript
 * // Mode inferred as "returnBytes" from operationalMode
 * const adapter = createAdapter(NativeAdapter, {
 *   operationalMode: "returnBytes",
 *   operator: {
 *      account: <account-id>,
 *      privateKey: <private-key>
 *   }
 * });
 *
 * const adapter = createAdapter(NativeAdapter, {
 *   operationalMode: "returnResult",
 *   operator: {
 *      account: <account-id>,
 *      privateKey: <private-key>
 *   }
 * });
 *
 * // Mode defaults to "returnResult"
 * const adapter = createAdapter(EvmAdapter, {
 *   account: privateKeyToAccount(<private-key>)
 * });
 * ```
 */
export function createAdapter<
  M extends OperationalMode,
  A extends MJAdapterConstructor<M>,
>(
  Adapter: A,
  params: CreateAdapterParams<M, A> & { operationalMode: M }
): (config?: Partial<MJAdapterParameters>) => MJAdapter<M>;

/**
 * Creates a factory function that instantiates a given MJAdapter subclass with default operational mode.
 * This overload is used when operationalMode is not explicitly provided, defaulting to "returnResult".
 *
 * @template A - The constructor type of the adapter class that extends MJAdapter
 * @param Adapter - The MJAdapter subclass constructor
 * @param params - Optional parameters for the adapter constructor
 * @returns A function that creates an instance of the adapter with "returnResult" mode
 *
 * @example
 * ```typescript
 * // Defaults to "returnResult" mode
 * const adapter = createAdapter(NativeAdapter, { hederaClient: client });
 * ```
 */
export function createAdapter<A extends MJAdapterConstructor<any>>(
  Adapter: A,
  params?: CreateAdapterParams<"returnResult", A>
): (config?: Partial<MJAdapterParameters>) => MJAdapter<"returnResult">;

/**
 * Implementation of the createAdapter function.
 * Handles both overloads and provides runtime behavior for adapter instantiation.
 *
 * @template A - The constructor type of the adapter class that extends MJAdapter
 * @param Adapter - The MJAdapter subclass constructor
 * @param params - Optional parameters for the adapter constructor
 * @returns A function that creates adapter instances with proper configuration merging
 */
export function createAdapter<A extends MJAdapterConstructor<any>>(
  Adapter: A,
  params?: CreateAdapterParams<any, A>
) {
  return (config?: Partial<MJAdapterParameters>) => {
    return new Adapter(MJ_ADAPTER_CONSTRUCTOR_GUARD, {
      operationalMode: "returnResult",
      ...params,
      ...config,
    }) as MJAdapter<any>;
  };
}
