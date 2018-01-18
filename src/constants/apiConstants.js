const EADBOX_CLIENT_LOCATION = process.env.EADBOX_CLIENT_LOCATION;

module.exports = {
    LOCATIONS: {
        EAD_BOX: {
            BASE_BOX_URL: `${EADBOX_CLIENT_LOCATION}/cursos`,
            FETCH_ALL_COURSES: `${EADBOX_CLIENT_LOCATION}/api/courses`
        },
        TWITTER: {
            POST_NEW_TWEET: `statuses/update`
        }
    },
    CREDENTIALS: {
        TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
        TWITTER_CONSUMER_SECRET: process.env.TWITTER_CONSUMER_SECRET,
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN,
        TWITTER_ACCESS_TOKEN_SECRET: process.env.TWITTER_ACCESS_TOKEN_SECRET
    }
};