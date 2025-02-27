import { onDestroy, onMount } from 'svelte';
import { writable } from 'svelte/store';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';

/**
 * Creates a Svelte store that connects to an RxJS observable.
 *
 * @template D - The type of data.
 * @template E - The type of error.
 * @param subject - The RxJS observable.
 * @param initialValue - Initial value for the store.
 */
export function createBlocStore<D, E>(subject: Observable<D>, initialValue?: D) {
  const dataStore = writable<D | null>(initialValue || null);
  const loadingStore = writable<boolean>(initialValue === undefined);
  const errorStore = writable<E | null>(null);

  const subscription: Subscription = subject.subscribe({
    next: (data: D) => {
      dataStore.set(data);
      loadingStore.set(false);
      errorStore.set(null);
    },
    error: (err: E) => {
      dataStore.set(null);
      loadingStore.set(false);
      errorStore.set(err);
    },
    complete: () => {
      loadingStore.set(false);
    },
  });

  onDestroy(() => {
    subscription.unsubscribe();
  });

  return { dataStore, loadingStore, errorStore };
}

export function subscribeOnMount<T>(input: Observable<T>, callback: (value: T) => { destroy: () => void } | void) {
  let subscription: Subscription | null = null;
  let destroyCallback: (() => void) | undefined;

  onMount(() => {
    subscription = input.subscribe((value: T) => {
      const result = callback(value);
      if (result && result?.destroy && typeof result?.destroy === 'function') {
        destroyCallback = result?.destroy; // Store the destroy function if it exists
      } else {
        destroyCallback = undefined; // Reset if no destroy function is returned
      }
    });
  });

  onDestroy(() => {
    destroyCallback?.();
    subscription?.unsubscribe();
    destroyCallback = undefined;
    subscription = null;
  });
}

export function subscribeOnCreate<T>(input: Observable<T>, callback: (value: T) => { destroy: () => void } | void) {
  let subscription: Subscription | null = null;
  let destroyCallback: (() => void) | undefined;

  subscription = input.subscribe((value: T) => {
    const result = callback(value);
    if (result && result?.destroy && typeof result?.destroy === 'function') {
      destroyCallback = result?.destroy; // Store the destroy function if it exists
    } else {
      destroyCallback = undefined; // Reset if no destroy function is returned
    }
  });

  onDestroy(() => {
    destroyCallback?.();
    subscription?.unsubscribe();
    destroyCallback = undefined;
    subscription = null;
  });
}

/*
 * const data$ = partialObserve({name:"",family:""})
 * data$.observer("name").subscribe((value)=>{
 * console.log("name has changed to " + value)
 * })
 * */
export function partialObserve(observer:Observable ,field: string): Observable<any> {
  return observer.pipe(distinctUntilChanged((previous, current)=>{
    return previous[field] !== current[field];
  }))
}