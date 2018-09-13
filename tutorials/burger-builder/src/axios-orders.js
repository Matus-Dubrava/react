import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-32ae6.firebaseio.com/'
});

export default instance;