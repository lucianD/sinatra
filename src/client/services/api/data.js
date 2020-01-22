import api from './handler';

export default {
    /**
     * Get data
     * @returns {Promise<{body, status}|*>}
     */
    getData() {
        return api.get('/api/data');
    },
    getSports() {
        return api.get('/api/sports');
    },
    getSportById(id) {
        return api.get(`/api/sports/${id}`);
    },

};
