export type bodyType = {[key: string]: any};
export type objectStringsType = {[key: string]: string};
export type useFetchType<D = bodyType> = [
    loading: boolean,
    execute: (data: D, headers?: objectStringsType) => Promise<any>,
    data: any | undefined,
    error: objectStringsType | string | undefined,
];

// export type useFetchConfig = {
//     promiseResolve: boolean;
//     promiseReject: boolean;
// };
