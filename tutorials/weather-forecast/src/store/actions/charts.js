import * as actionTypes from './actionTypes';
import axios from 'axios';

export const weatherDataFetchSuccess = (data) => {
    return {
        type: actionTypes.WEATHER_DATA_FETCH_SUCCESS,
        data
    };
};

export const weatherDataFetchFail = (error) => {
    return {
        type: actionTypes.WEATHER_DATA_FETCH_FAIL,
        error
    };
};

export const weatherDataFetch = (city) => {
    return (dispatch) => {
        console.log(city);
        city = encodeURIComponent(city);
        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=0b540845d599e7c10bd897f6805b476d`)
            .then((res) => {
                dispatch(weatherDataFetchSuccess(res.data));
            })
            .catch((err) => {
                dispatch(weatherDataFetchFail(err));
            });
    }
}