
import axios from 'axios';
var axiosInstance = axios.create();
export const globalGetService = (url, params) => {
    return new Promise(
        function (resolve, reject) {
            axiosInstance({
                method: 'GET',
                url: url,
                params: params && Object.keys(params).length ? { ...params, timestamp: new Date().getTime() } : { timestamp: new Date().getTime() }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        }
    )
}
export const globalPostService = (url, data) => {
    return new Promise(
        function (resolve, reject) {
            axiosInstance({
                'method': 'POST',
                'url': url,
                'data': data,
                'X-Api-Key':'pg_VFAc44c58xnRaSMubDk_0_M2WyrLz9nG',
                'X-Playground-Token':'pg_VFAc44c58xnRaSMubDk_0_M2WyrLz9nG',
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        }
    )
}
export const globalPutService = (url, data) => {
    return new Promise(
        function (resolve, reject) {
            axiosInstance({
                method: 'PUT',
                url: url,
                data: data,
                params: { timestamp: new Date().getTime() }
            })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error)
                })
        }
    )
}

