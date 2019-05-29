import axios from 'axios';

let api = axios.create({
    baseURL: '/',
    timeout: 100000,
    headers: {
        // 'X-CSRF-TOKEN': $('meta[name="csrf_token"]').attr('content'),
        // 'X-Requested-With': 'XMLHttpRequest',
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        //     "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"

    },
});

export default {
    get(url) {
        url = normalizeUrl(url);

        return api.get(url)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    delete(url) {
        url = normalizeUrl(url);

        return api.delete(url)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    post(url, data) {
        url = normalizeUrl(url);

        return api.post(url, data)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    put(url, data) {
        url = normalizeUrl(url);

        return api.put(url, data)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    },

    patch(url, data) {
        url = normalizeUrl(url);

        return api.patch(url, data)
            .then((response) => Promise.resolve(response.data))
            .catch((error) => Promise.reject(error));
    }
}

function normalizeUrl(url) {
    return url.replace(/^\//gm, '');
}
