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

    public postData<D>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D>(
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

    public getData<D>(config: {
        endPoint: string;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D>(
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

    public updateData<D>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D>(
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

    public patchData<D>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D>(
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

    public deleteData<D>(config: {
        endPoint: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D>(
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

    public custom<D>(config: {
        endPoint: string;
        method: string;
        bodyDefault?: bodyType;
        queryDefault?: objectStringsType;
        useFetchCustomConfig?: useFetchConfig;
    }) {
        return useFetch<D>(
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
