import axios from 'axios';

import * as types from './actionTypes';

export const submitSurvey = values => {
    return {
        type: types.SUBMIT_SURVEY
    };
};
