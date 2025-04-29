/** Returns true if the error is retry-able and we have retries remaining */
export declare function shouldRetry(error: Error, retries: number): boolean;
/** Returns an promise with timeout. Used for retries. */
export declare function waitPromise(purpose?: string, time?: number): Promise<void>;
