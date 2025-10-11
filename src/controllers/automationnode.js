const cron = require("node-cron");

const {
  postToTwitter,
  postToInstagram
} = require("../services/socialService");
const { appendRow } = require("../services/googleSheetServices");

const SHEET_ID =
  process.env.SHEET_ID;

const messages = [
  "Good morning! 🌞 Stay positive!",
  "Keep grinding 💪 Success is near!",
  "Automated wisdom dropping in 🚀",
  "Another day, another opportunity ✨",
  "Your daily dose of motivation 🤖"
];

function getRandomMessage() {
  return messages[Math.floor(Math.random() * messages.length)];
}

exports.triggerController = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    cron.schedule("0 10 * * *", async () => {
  console.log("⏰ Running scheduled post...");
const combinedResult={};
  const imageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png";
  const message = getRandomMessage();

  try {
    const instaResult = await postToInstagram(imageUrl, message);
    console.log("✅ Instagram Posted:", instaResult);

    const twitterResult = await postToTwitter(message);
    console.log("✅ Twitter Posted:", twitterResult);
         combinedResult = {
      twitter: twitterResult,
      Instagram: instaResult
        };
  } catch (err) {
    console.error("❌ Posting Failed:", err);
  }
});
    

    // No need to call toJSON()
    // console.log(resultedvalue);
    

    // // You can combine them into one JSON object if needed
    // const combinedResult = {
    //   twitter: resultedvalue,
    //   Instagram: resultedvalues,
    // };
    // Log to Google Sheets
    await appendRow(SHEET_ID, [
      new Date().toLocaleString(),
      message,
      JSON.stringify(combinedResult, null, 2),
    ]);

    res.status(200).json({ success: true, message: combinedResult });
  } catch (err) {
    console.error("Trigger Error:", err.message);
    res.status(500).json({ error: "Failed to trigger posts" });
  }
};
