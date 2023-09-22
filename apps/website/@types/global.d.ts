declare type PromiseResolve<T> = T extends Promise<infer R> ? R : never;
