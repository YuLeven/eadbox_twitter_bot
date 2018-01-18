const EadBoxClient = require('../services/eadboxClient')
const LocalDB = require('../data/localDB')
const Publisher = require('./publisher')
const EADBOX_POOL_INTERVAL = process.env.EADBOX_POOL_INTERVAL || 5 * 1000;

class Pooler {

    // Pools eadbox for new courses according to the value set to EADBOX_POOL_INTERVAL (defaults to 30s)
    static beginPooling() {

        console.log(`Pooler started. Will begin pooling EadBox for new courses every ${EADBOX_POOL_INTERVAL / 1000} seconds`);

        setInterval(async () => {
            try {
                // Retrieves new courses and emits and event containig them
                let courses = await EadBoxClient.fetchAllCourses();
                await Pooler.handleNewContentReceived(courses);
            } catch (e) {
                console.log("Failed to fetch courses from EadBox");
                console.log(e);
            }
        }, EADBOX_POOL_INTERVAL);
    }

    static async handleNewContentReceived(content) {
        // Logs the number of successfully retrieved courses
        console.log(`${content.length} courses were sucessfully pooled from EadBox's API. New courses (if any) will be tweeted soon.`);
        await LocalDB.persistCoursesIfInexists(content);
        await Publisher.publishCourses();
    }

}

module.exports = Pooler;