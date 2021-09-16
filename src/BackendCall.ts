import {bodyType, objectStringsType} from './types';
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
    ) {}

    public postData<D>(endPoint: string, bodyDefault?: bodyType, queryDefault?: objectStringsType) {
        return useFetch<D>(
            endPoint,
            'POST',
            bodyDefault,
            queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
        );
    }

    public getData<D>(endPoint: string, queryDefault?: objectStringsType) {
        return useFetch<D>(
            endPoint,
            'GET',
            undefined,
            queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
        );
    }

    public updateData<D>(endPoint: string, bodyDefault?: bodyType, queryDefault?: objectStringsType) {
        return useFetch<D>(
            endPoint,
            'PUT',
            bodyDefault,
            queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
        );
    }

    public patchData<D>(endPoint: string, bodyDefault?: bodyType, queryDefault?: objectStringsType) {
        return useFetch<D>(
            endPoint,
            'PATCH',
            bodyDefault,
            queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
        );
    }

    public deleteData<D>(endPoint: string, bodyDefault?: bodyType, queryDefault?: objectStringsType) {
        return useFetch<D>(
            endPoint,
            'DELETE',
            bodyDefault,
            queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
        );
    }

    public custom<D>(endPoint: string, method: string, bodyDefault?: bodyType, queryDefault?: objectStringsType) {
        return useFetch<D>(
            endPoint,
            method,
            bodyDefault,
            queryDefault,
            this.baseApiUrl,
            this.defaultHeaders,
            this.defaultSuccessFunction,
            this.defaultErrorFunction,
        );
    }
}
