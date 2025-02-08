/**
 * Dependency Injection (DI) container for managing Bloc class instances.
 */
class BlocDi {
    constructor() {
        this.containerMap = new Map();
    }
    /**
     * Retrieves an existing instance of the provided class or creates a new one.
     * @param input - The class constructor to instantiate or retrieve.
     * @returns The instance of the provided class.
     */
    get(input) {
        if (this.containerMap.has(input)) {
            return this.containerMap.get(input);
        }
        const instance = new input();
        this.containerMap.set(input, instance);
        return instance;
    }
    /**
     * Disposes of an existing instance of the provided class.
     * Calls the `dispose` method on the instance if it exists.
     * @param input - The class constructor to dispose.
     */
    dispose(input) {
        const instance = this.containerMap.get(input);
        if (instance?.dispose) {
            instance.dispose();
        }
        this.containerMap.delete(input);
    }
    /**
     * Clears all stored instances and disposes of them if applicable.
     */
    clear() {
        for (const instance of this.containerMap.values()) {
            if (instance?.dispose) {
                instance.dispose();
            }
        }
        this.containerMap.clear();
    }
}
export default new BlocDi();
