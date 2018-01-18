const LocalDB = require('../data/localDB')
const TwitterClient = require('../services/twitterClient')
const API_CONSTANTS = require('../constants/apiConstants')

//http://harugakita.eadbox.com/cursos/curso-teste-de-japones
class Publisher {
    
    static async publishCourses() {
        let publishableCourses = await LocalDB.getUnpublishedCourses();

        for (let course of publishableCourses) {

            // Marks the course as published
            await LocalDB.markCourseAsPublished(course.id);

            try {
                //Publishes the cours to twitter
                await TwitterClient.publishTweet({
                    text: `Try our new course ${course.title}! Check it out now at ${API_CONSTANTS.LOCATIONS.EAD_BOX.BASE_BOX_URL}/${course.course_slug}`,
                    attachmentURL: course.logo_url
                });
            
                console.log(`Successfully published new course ${course.title} to Twitter!`);
            } catch (e) {
                console.log('\n');
                console.log(`Failed to publish course ${course.title} to Twiter. Will attempt to post again at the next batch. Please check the logs bellow.`);
                console.log(e);
                await LocalDB.markCourseAsUnpublished(course.id);
            }
        }
    }    
}

module.exports = Publisher;