export type Constructable<T> = new (...args: any[]) => T;
/**
 * Dependency Injection (DI) container for managing Bloc class instances.
 */
declare class BlocDi {
    private containerMap;
    /**
     * Retrieves an existing instance of the provided class or creates a new one.
     * @param input - The class constructor to instantiate or retrieve.
     * @returns The instance of the provided class.
     */
    get<T>(input: Constructable<T>): T;
    /**
     * Disposes of an existing instance of the provided class.
     * Calls the `dispose` method on the instance if it exists.
     * @param input - The class constructor to dispose.
     */
    dispose<T>(input: Constructable<T>): void;
    /**
     * Clears all stored instances and disposes of them if applicable.
     */
    clear(): void;
}
declare const _default: BlocDi;
export default _default;
