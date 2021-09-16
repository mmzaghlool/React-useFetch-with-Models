# React useFetch Models

A quick way to bind your react/react native code with predefined useFetches

## Initiating Project configs

```ts
import {BackendCall} from '../build';

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

const Backend = new BackendCall(baseApiUrl, defaultHeaders, defaultSuccessFunction, defaultErrorFunction);

export default Backend;
```

## Models

```ts
import Backend from './Backend';

/**
 * Type to validate the execute input when being used
 * The optional values indicating that this variable already have a default valid value
 * This should contain any required data to be provided at execution (params, query params, body)
 */
export type loginUserType = {variable: string; bodyVariable?: string; bodyVariable2: number; queryVariable: string};

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
         */
        return Backend.postData<loginUserType>(endPoint, bodyDefault, queryDefault);
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
        return Backend.postData<getUserType>(endPoint);
    }
}

export default TestModel;
```

## Usage

```ts
import React from 'react';
import TestModel from './Model';

const model = new TestModel();

const Footer: React.FC = () => {
    /**
     * Every method returns useFetch after execution
     * every useFetch has 4 positional parameters (loading, execute, data, error)
     */
    const [loadingLogin, executeLogin, dataLogin, errorLogin] = model.loginUser();

    // you can also use it with the shorthand and use the data or error as promises
    const [loadingShort, executeShort] = model.getUser();

    // ...Other code

    const someFunction = () => {
        executeLogin({bodyVariable2: 10, queryVariable: '', variable: ''});

        executeShort({uid: ''})
            .then((res) => {})
            .catch((err) => {});
    };

    return <div />;
};
```
