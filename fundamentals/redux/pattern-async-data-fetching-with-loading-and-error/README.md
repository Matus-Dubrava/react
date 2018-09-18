This pattern can be used when we want to load some data from the server and while we are waiting for them, we want to render some loading info (text, spinner...) so that user knows that our app is performing some action.

We will create 4 __action creator__ functions. 

__fetchDataStart__ indicates that app started fetching the data from server 

__fetchDataSuccess__ indicates that the data was successfuly fetched, carries the fetched data in its payload

__fetchDataFail__ indicates that fetching process  failed, carries error object in its payload

__fetchData__ async action creator that handles the process of fetching the data using ajax call and dispatching above action creators as needed

__actions.js__

```javascript
import axios from 'axios';

import * as actionTypes from './actionTypes';

export const fetchDataStart = () => {
  return {
    type: actionTypes.FETCH_DATA_START
  };
};

export const fetchDataFail = (error) => {
  return {
    type: actionTypes.FETCH_DATA_FAIL,
    error
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: actionTypes.FETCH_DATA_SUCCESS,
    data
  };
};

export const fetchData = () => {
  return (dispatch) => {
    dispatch(fetchDataStart());

    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => {
        dispatch(fetchDataSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchDataFail(err));
      });
  };
};
```

In our reducers, we have state with 3 properties: __data__ which holds the data, __loading__ that indicates that the data are currently being fetched and __error__ that holds error object if there were any errors (if the fetching failed). 


And then we need to handle 3 different action types.

__FETCH_DATA_START__ we want to show loading info as soon as app starts fetching the data, so we set the loading state to true

__FETCH_DATA_SUCCESS__ fetching is done so we set the loading state to false and update the data 

__FETCH_DATA_FAIL__ fetching failed so we set the loading state to false and update the error state

__reducer.js__

```javascript
import * as actionTypes from './actionTypes';

const initialState = {
  loading: false,
  error: false,
  data: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_START: 
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_DATA_FAIL: 
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      };
    
    default: return state;
  }
};

export default reducer;
```

And as it can be seen just by looking on the code above, we store *magic strings* in a separate file.

__actionTypes.js__

```javascript
export const FETCH_DATA_START = 'FETCH_DATA_START';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAIL = 'FETCH_DATA_FAIL';
```

