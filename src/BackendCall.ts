import {bodyType, objectStringsType, useFetchConfig} from './types';
import useFetch from './useFetch';

/**
 * @abstract
 * Generic class to be extended by any Model class
 */
export default class BackendCall {
    constructor(
        private baseApiUrl: string,
        private defaultHeaders: objectStringsType = {},
        private defaultSuccessFunction: Function = (res: any) => res,
        private defaultErrorFunction: Function = (err: any) => err,
        private useFetchConfig: useFetchConfig = {promiseReject: true, promiseResolve: true},
    ) {}

    handleIsShortHanded(useFetchCustomConfig?: useFetchConfig): useFetchConfig {
        if (useFetchCustomConfig) {
            return useFetchCustomConfig;
        } else {
            return this.useFetchConfig;
        }
    }

    public postData<D, T = any>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D, T>(
            config.endPoint,
            'POST',
            config.bodyDefault,
            config.queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
            this.handleIsShortHanded(config.useFetchCustomConfig),
        );
    }

    public getData<D, T = any>(config: {
        endPoint: string;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D, T>(
            config.endPoint,
            'GET',
            undefined,
            config.queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
            this.handleIsShortHanded(config.useFetchCustomConfig),
        );
    }

    public updateData<D, T = any>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D, T>(
            config.endPoint,
            'PUT',
            config.bodyDefault,
            config.queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
            this.handleIsShortHanded(config.useFetchCustomConfig),
        );
    }

    public patchData<D, T = any>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D, T>(
            config.endPoint,
            'PATCH',
            config.bodyDefault,
            config.queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
            this.handleIsShortHanded(config.useFetchCustomConfig),
        );
    }

    public deleteData<D, T = any>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D, T>(
            config.endPoint,
            'DELETE',
            config.bodyDefault,
            config.queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
            this.handleIsShortHanded(config.useFetchCustomConfig),
        );
    }

    public custom<D, T = any>(config: {
        endPoint: string;
        method: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D, T>(
            config.endPoint,
            config.method,
            config.bodyDefault,
            config.queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
            this.handleIsShortHanded(config.useFetchCustomConfig),
        );
    }
}
