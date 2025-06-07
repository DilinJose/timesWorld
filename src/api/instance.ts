import axios from "axios";


export const instance = axios.create({
    baseURL: 'https://restcountries.com/v2/',
    timeout: 1000,
    // headers: { 'X-Custom-Header': 'foobar' }
});