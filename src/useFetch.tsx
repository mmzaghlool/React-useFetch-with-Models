/* eslint-disable guard-for-in */
import {useCallback, useState} from 'react';
import fetchData from './fetchData';
import {bodyType, objectStringsType, useFetchType} from './types';

function useFetch<D = bodyType>(
    endPoint: string,
    method: string = 'GET',
    bodyDefault: bodyType = {},
    queryDefault: objectStringsType = {},
    baseApiUrl: string,
    defaultHeaders: objectStringsType,
    defaultSuccessFunction: Function,
    defaultErrorFunction: Function,
    // isShortHand: boolean = false,
): useFetchType<D> {
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<objectStringsType>();

    const execute = useCallback((data: D, headers?: objectStringsType) => {
        setLoading(true);
        setData(undefined);
        setError(undefined);

        const [url, body] = bodyRefactoring(endPoint, data as bodyType, bodyDefault, queryDefault);
        const finalUrl = `${baseApiUrl}/${url}`;
        const finalHeaders = {...defaultHeaders, ...headers};

        return new Promise((resolve, reject) => {
            fetchData(finalUrl, body, method, finalHeaders, defaultSuccessFunction, defaultErrorFunction)
                .then((d: any) => {
                    setData(d);
                    resolve(d);
                    setLoading(false);
                    return d;
                })
                .catch((err) => {
                    setError(err);
                    // if (isShortHand) {
                    reject(err);
                    // }
                    setLoading(false);
                    return err;
                });
        });
    }, []);

    return [loading, execute, data, error];
}

function bodyRefactoring(
    url: string,
    data: bodyType,
    bodyDefault: bodyType,
    queryDefault: objectStringsType,
): [url: string, body: bodyType | undefined] {
    let body: bodyType | undefined = bodyDefault;
    let query = '?';

    for (const key in data) {
        const value = data[key];

        if (key in body) {
            body[key] = value;
        } else if (typeof value === 'undefined') {
            continue;
        } else if (key in queryDefault) {
            query = query.concat(`${key}=${value}&`);
        } else if (url.includes(`:${key}`)) {
            url = url.replace(`:${key}`, value);
        } else {
            throw new Error(`key: ${key} has no corresponding data type`);
        }
    }

    query = query.substring(0, -1);

    const bodyLength = Object.keys(body).length;
    if (bodyLength === 0) {
        body = undefined;
    }

    return [url.concat(query), body];
}

export default useFetch;
