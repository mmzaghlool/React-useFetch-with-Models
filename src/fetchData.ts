import {bodyType, objectStringsType} from './types';

function fetchData(
    url: string,
    body?: bodyType,
    method: string = 'GET',
    headers: objectStringsType = {},
    defaultSuccessFunction: Function = (res: any) => res,
    defaultErrorFunction: Function = (err: any) => err,
): Promise<any> {
    const stringifyBody = body ? JSON.stringify(body) : undefined;

    return new Promise((resolve, reject) => {
        fetch(url, {method, headers, body: stringifyBody})
            .then((res) => res.json())
            .then((res) => defaultSuccessFunction(res))
            .then((res) => resolve(res))
            .catch((err) => defaultErrorFunction(err))
            .then((err) => reject(err));
    });
}

export default fetchData;
