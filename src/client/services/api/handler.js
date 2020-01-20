import fetch from 'unfetch';
const SERVER_ROOT = 'http://localhost:8080';

const apiCall = (method, json = true) => async (url, fetchOptions) => {
    fetchOptions = {
        method,
        ...fetchOptions,
    };

    const response = await fetch(`${SERVER_ROOT}${url}`, fetchOptions);

    if (json) {
        return {
            status: response.status,
            body: await response.json(),
        };
    }

    return response;
};

const handler = {
    get: apiCall('get'),
    post: apiCall('post'),
    put: apiCall('put'),
    delete: apiCall('delete'),

    /**
     * Do a POST request with a JSON body
     * @param {String} url the url
     * @param {Object} body the body of the post request
     * @returns {Promise}
     */
    postJson(url, body) {
        return this.post(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    },

    /**
     * Do a PUT request with a JSON body
     * @param {String} url the url
     * @param {Object} body the body of the put request
     * @returns {Promise}
     */
    putJson(url, body) {
        return this.put(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
    },
};

export default handler;
