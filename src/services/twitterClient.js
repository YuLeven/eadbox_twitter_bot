const API_CONSTANTS = require('../constants/apiConstants')
const Twit = require('twit')
const TwitClient = new Twit({
  consumer_key:         API_CONSTANTS.CREDENTIALS.TWITTER_CONSUMER_KEY,
  consumer_secret:      API_CONSTANTS.CREDENTIALS.TWITTER_CONSUMER_SECRET,
  access_token:         API_CONSTANTS.CREDENTIALS.TWITTER_ACCESS_TOKEN,
  access_token_secret:  API_CONSTANTS.CREDENTIALS.TWITTER_ACCESS_TOKEN_SECRET,
  timeout_ms:           60 * 1000,  // HTTP request timeout to apply to all requests. Defaults to 60s.
});

class TwitterClient {

    /**
     * Publishes a new tweet
     * @param {String} The text to be published
     */
    static publishTweet({text, attachmentURL}) {

        return new Promise((resolve, reject) => {

            let data = {
                status: text
            };

            TwitClient.post(API_CONSTANTS.LOCATIONS.TWITTER.POST_NEW_TWEET, data, (err, data, response) => {
                if (err) return reject(err);

                return resolve(data);
            });
        });
    }

}

module.exports = TwitterClient;