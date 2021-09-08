import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';
import moment from 'moment';

const { useGlobalState } = createGlobalState({date:moment()})

const test = ()=><div>testpart</div>
export {
    useGlobalState
}
export default test;