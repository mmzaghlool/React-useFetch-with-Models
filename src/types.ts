export type bodyType = {[key: string]: any};
export type objectStringsType = {[key: string]: string};
export type useFetchType<D, T = any> = [
    loading: boolean,
    execute: (data: D, headers?: objectStringsType) => Promise<T>,
    data: T | undefined,
    error: any,
];

export type useFetchConfig = {
    promiseResolve: boolean;
    promiseReject: boolean;
};
