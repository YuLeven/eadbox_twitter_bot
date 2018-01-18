const reqwest = require('reqwest')
const API_CONSTANTS = require('../constants/apiConstants')

class EadBoxClient {
    /**
     * Retrieves all published courses
     */
    static fetchAllCourses() {
        return reqwest({
            url: API_CONSTANTS.LOCATIONS.EAD_BOX.FETCH_ALL_COURSES, 
            method: 'get'
        });
    }
}

module.exports = EadBoxClient;