const express = require("express");
const path = require("path");
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
// Set up Express server
const app = express();
const port = process.env.PORT || 3000;
// Set EJS as the view engine
app.set("view engine", "ejs");
// app.set("view engine", "pug");
// Set the views directory
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Set up for easier form data parsing
// Convert query string to object
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.render("index");
});

// Endpoint to get a random activity
app.post("/activity", async (req, res) => {
  const participants = req.body.participants;
  const type = req.body.type;
  const activityPayload = await getActivityAsync(participants, type);

  if (activityPayload == null) {
    res.render("error", "Error fetching activity, please contact admin");
    return;
  }

  const videoData = await getYouTubeVideosAsync(
    "How to" + activityPayload.activity
  );
  console.log(new Date(), "activityPayload", activityPayload);
  if (participants != activityPayload.participants) {
    const message =
      "There is no activity for the selected number of participants, here is a random activity:";
    res.render("activity", { activityPayload, videoData, message });
    return;
  } else {
    res.render("activity", { activityPayload, videoData, message: null });
    return;
  }
});

app.listen(port, () => {
  console.log(`App listening on port http://localhost:${port}`);
});

async function getActivityAsync(participants, type) {
  // Sample Response
  // {
  // 	"activity": "Learn Express.js",
  // 	"accessibility": 0.25,
  // 	"type": "education",
  // 	"participants": 1,
  // 	"price": 0.1,
  // 	"link": "https://expressjs.com/",
  // 	"key": "3943506"
  // }
  try {
    const reqUrl = `https://www.boredapi.com/api/activity?participants=${participants}&type=${type}`;
    console.log(new Date(), reqUrl);
    const response = await fetch(reqUrl);
    const activity = await response.json();
    console.log("Activity retrieved successfully", activity);
    if (activity.error != null) {
      // fall back to random activity without any filters
      const reqUrl = `https://www.boredapi.com/api/activity`;
      console.log(
        "Fall back to random activity without filter",
        new Date(),
        reqUrl
      );
      try {
        const response = await fetch(reqUrl);
        const activity = await response.json();
        return activity;
      } catch (error) {
        console.error(new Date(), error);
        return null;
      }
    }
    return activity;
  } catch (error) {
    console.error(new Date(), error);
  }
}

async function getYouTubeVideosAsync(query) {
  const requestUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${YOUTUBE_API_KEY}`;
  console.log(new Date(), requestUrl);

  try {
    const response = await fetch(requestUrl);
    const videos = await response.json();
    return videos;
  } catch (error) {
    console.error(new Date(), error);

    return null;
  }
}
