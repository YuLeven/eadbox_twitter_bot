# Eadbox Twitter Bot
==================================

This is a simple test of a Twitter bot responsible for fetching new courses at Eadbox and posting them to Twitter

To run this project, please follow the steps bellow:

- This project requires a version of NodeJS with support for async-await (7.6+), stable is recommended.

## Getting Started
---------------

```sh
# clone the project
git clone https://github.com/YuLeven/eadbox_twitter_bot.git
cd eadbox_twitter_bot

# Install dependencies
npm install

# Run the server. Please note that the environment variables in the command below must be set
EADBOX_CLIENT_LOCATION=http://your_box.eadbox.com TWITTER_CONSUMER_KEY=you_twitter_app_consumer_key TWITTER_CONSUMER_SECRET=your_twitter_app_consumer_secret TWITTER_ACCESS_TOKEN=your_twitter_access_token TWITTER_ACCESS_TOKEN_SECRET=your_twitter_access_token_secret npm start
```

## Details
---------

#### Publishing tracking
This app uses a local sqlite database to keep track of published courses, thus avoiding duplicates. 
If needed, the table `published_courses` may be purged to force all courses to be republished.
Individual courses can be republished by nulling their `published_at` atrribute.

#### Configuration
A enviroment variable `EADBOX_POOL_INTERVAL` may be optionally set to an integer representing how often should EadBox be pooled for new courses in seconds. If unset, it defaults to 30 seconds.


License
-------

MIT