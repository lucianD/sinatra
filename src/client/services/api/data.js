import api from './handler';

export default {
    /**
     * Get data
     * @returns {Promise<{body, status}|*>}
     */
    getData() {
        return api.get('/api/data');
    },
    /**
     * Gets the list of sports
     * @returns {Promise<{body, status}|*>}
     */
    getSports() {
        return api.get('/api/sports');
    },
    /**
     * Gets the list of events within a sport
     * @param id The id of the sport
     * @returns {Promise<{body, status}|*>}
     */
    getSportById(id) {
        return api.get(`/api/sports/${id}`);
    },
    /**
     * Gets the outcome for a given event
     * @param sportId The id of the sport
     * @param eventId The id of the event
     * @returns {Promise<{body, status}|*>}
     */
    getEventOutcomeById(sportId, eventId) {
        return api.get(`/api/sports/${sportId}/events/${eventId}`);
    },
};
