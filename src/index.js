const Pooler = require('./subpub/pooler')


function makeMissingEnvErrorMessage(missingEnv) {
    return `The environment variable ${missingEnv} must be set before this application is run`
}

// Ensure that the EadBox API location was provided
if (process.env.EADBOX_CLIENT_LOCATION == null) {
    console.log((makeMissingEnvErrorMessage("EADBOX_CLIENT_LOCATION")));
    process.exit(1);
}

// Ensure that the Twitter API keys were provided
if (process.env.TWITTER_CONSUMER_KEY == null) {
    console.log((makeMissingEnvErrorMessage("TWITTER_CONSUMER_KEY")));
    process.exit(1);
}

// Ensure that the Twitter API keys were provided
if (process.env.TWITTER_CONSUMER_SECRET == null) {
    console.log((makeMissingEnvErrorMessage("TWITTER_CONSUMER_SECRET")));
    process.exit(1);
}

// Ensure that the Twitter API keys were provided
if (process.env.TWITTER_ACCESS_TOKEN == null) {
    console.log((makeMissingEnvErrorMessage("TWITTER_ACCESS_TOKEN")));
    process.exit(1);
}

// Ensure that the Twitter API keys were provided
if (process.env.TWITTER_ACCESS_TOKEN_SECRET == null) {
    console.log((makeMissingEnvErrorMessage("TWITTER_ACCESS_TOKEN_SECRET")));
    process.exit(1);
}

console.log(':::EadBox Course Poster:::');
console.log(`Will fetch new courses from: ${process.env.EADBOX_CLIENT_LOCATION}`);
console.log(`New courses will be posted to Twitter account whose access token is ${process.env.TWITTER_ACCESS_TOKEN}`);

// Starts pooling for new courses
Pooler.beginPooling();
