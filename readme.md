# React useFetch Models

![NPM](https://img.shields.io/npm/v/react-usefetch-models)
![NPM](https://img.shields.io/npm/dt/react-usefetch-models)
![NPM](https://img.shields.io/npm/dm/react-usefetch-models)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-usefetch-models)

A quick way to bind your react/react native code with predefined useFetches.

Compatible with JS and TS

## [Reach Me](reach-me)

If you need to report an issue or have suggestions feel free to contact me

<a href="https://www.linkedin.com/in/mmzaghlool/"><img align="center" src="https://icon-library.com/images/linkedin-icon-png-transparent-background/linkedin-icon-png-transparent-background-15.jpg" alt="LinkedIn profile" height="40" width="40" /></a>
<a href="mailto:mmzaghlool52@gmail.com"><img align="center" src="https://cdn.iconscout.com/icon/free/png-256/gmail-2981844-2476484.png" alt="Gmail account" height="40" width="40" /></a>

## [Installation](installation)

```bash
npm i react-usefetch-models
```

## [Initiating Project configs](initiating-project-configs)

```ts
import {BackendCall} from 'react-usefetch-models';

//  API Backend base url
const baseApiUrl = '';

// Default Headers containing headers to be set by default to any request unless it overwritten
const defaultHeaders = {};

/**
 * Function to be executed after the success and do whatever you want
 * @param {any} res
 */
async function defaultSuccessFunction(res: any): Promise<any> {
    return res;
}

/**
 * Function to be executed after the catching the error and do whatever you want
 * @param {any} err the error as a first and only parameter
 * @return {any} Whatever u want to be in the rejected state
 */
async function defaultErrorFunction(err: any): Promise<any> {
    return err;
}

const Backend = new BackendCall(
    baseApiUrl,
    defaultHeaders,
    defaultSuccessFunction,
    defaultErrorFunction,
    /**
     * OPTIONAL you can pass a configs that controls if the useFetch should return the data as Promise or not
     * Default is {promiseReject: true, promiseResolve: true}
     *
     * if promiseReject
     */
    {promiseReject: true, promiseResolve: true},
);

export default Backend;
```

## [Models](models)

```ts
import Backend from './Backend';

/**
 * Type to validate the execute input when being used
 * The optional values indicating that this variable already have a default valid value
 * This should contain any required data to be provided at execution (params, query params, body)
 */
export type loginUserType = {variable: string; bodyVariable?: string; bodyVariable2: number; queryVariable: string};

/**
 *
 */
export type loginUserResponseType = {variable: string};

export type getUserType = {uid: string};

class TestModel {
    loginUser() {
        // if other data passed to execute it will override this data, but it must have a default value here
        const bodyDefault = {
            bodyVariable: 'This is a default body variable',
            bodyVariable2: '',
        };

        // if other data passed to execute it will override this data, but it must have a default value here
        const queryDefault = {
            queryVariable: '',
        };

        /**
         * You can set variable in the routs using `:` before the variable name
         * and provide it's value at the execution
         * don't forget to put it at the type
         */
        const endPoint = 'path/to/your/endpoint/:variable';

        /**
         * You have a collection of functions like (postData, getData, updateData, patchData, deleteData, and custom)
         * Note that `getData` function can not have a body
         * and in the `custom` you can provide your method
         *
         * If you need to specify custom useFetchConfig for specific function you can pass `useFetchCustomConfig`
         */
        return Backend.postData<loginUserType, loginUserResponseType>({
            endPoint,
            bodyDefault,
            queryDefault,
            useFetchCustomConfig: {promiseReject: false, promiseResolve: false},
        });
    }

    getUser() {
        /**
         * You can set variable in the routs using `:` before the variable name
         * and provide it's value at the execution
         * don't forget to put it at the type
         */
        const endPoint = 'path/to/your/endpoint/:uid';

        /**
         * Note that `getData` function can not have a body
         */
        return Backend.getData<getUserType>({endPoint});
    }
}

export default TestModel;
```

## [Usage](usage)

```ts
import React from 'react';
import TestModel from './Model';

const model = new TestModel();

const Footer: React.FC = () => {
    /**
     * Every method returns useFetch after execution
     * every useFetch has 4 positional parameters (loading, execute, data, error)
     *
     * data here "dataLogin" will take the "loginUserResponseType" pre defined in the Model
     */
    const [loadingLogin, executeLogin, dataLogin, errorLogin] = model.loginUser();

    // you can also use it with the shorthand and use the data or error as promises
    const [loadingShort, executeShort] = model.getUser();

    // ...Other code

    const someFunction = () => {
        executeLogin({bodyVariable2: 10, queryVariable: '', variable: ''});

        /**
         * res here will be "any" because it's not defined in the Model
         */
        executeShort({uid: ''})
            .then((res) => {})
            .catch((err) => {});
    };

    return <div />;
};
```
