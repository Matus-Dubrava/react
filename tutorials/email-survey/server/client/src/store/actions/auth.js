import axios from 'axios';

import { FETCH_USER } from './actionTypes';

export const fetchUser = async () => {
    try {
        const response = await axios.get('/api/current_user');
    } catch (err) {}
};

// const proxy = require('http-proxy-middleware');

// const proxyTable = {
//     '/auth/google': 'http://localhost:5000/',
//     '/api/*': 'http://localhost:5000/'
// };

// const options = {
//     target: 'http://localhost:4000',
//     router: proxyTable
// };

// module.exports = function(app) {
//     app.use(proxy(options));
// };

// const proxy = require('http-proxy-middleware');

// module.exports = function(app) {
//     app.use('/auth/google', proxy({target: 'http://localhost:5000/', changeOrigin: true}));
// };
