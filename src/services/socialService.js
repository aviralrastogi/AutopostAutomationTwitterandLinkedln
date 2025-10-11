const axios = require("axios");

require("dotenv").config();
const { TwitterApi } = require("twitter-api-v2");

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN, // user token
  accessSecret: process.env.TWITTER_ACCESS_SECRET, // user token secret
});

const rwClient = client.readWrite;

async function postToTwitter(text) {
  try {
    const tweet = await rwClient.v2.tweet(text);
    console.log("✅ Posted to Twitter:", tweet.data);
    return tweet;
  } catch (err) {
    console.error("Twitter Error:", err.data || err.message);
    return {
      error: true,
      message: err.message,
      data: err.data || null,
    };
  }
}

async function postToInstagram(imageUrl, caption) {
  try {
    // Step 1: Create media container
    const mediaRes = await axios.post(
      `https://graph.instagram.com/v24.0/${process.env.IG_USER_ID}/media`,
      {
        image_url: imageUrl,
        caption: caption,
        access_token: process.env.IG_ACCESS_TOKEN,
      }
    );

    const creationId = mediaRes.data.id;

    // Step 2: Publish media
    const publishRes = await axios.post(
      `https://graph.instagram.com/v24.0/${process.env.IG_USER_ID}/media_publish`,
      {
        creation_id: creationId,
        access_token: process.env.IG_ACCESS_TOKEN,
      }
    );

    console.log("✅ Posted to Instagram successfully!");
    return publishRes;
  } catch (err) {
    const instaResult = {
      error: true,
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    };
    console.error("❌ Instagram post failed", instaResult);
    return instaResult;
  }
}

// Usage
// postToTwitter("Hello from Node.js 🚀");

module.exports = { postToTwitter, postToInstagram };
