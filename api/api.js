const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
async function getActivityAsync(type) {
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
    const reqUrl = `https://www.boredapi.com/api/activity?type=${type}`;
    console.log(new Date(), reqUrl);
    const response = await fetch(reqUrl);
    const activity = await response.json();
    console.log("Activity retrieved successfully", activity);
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

// export the functions
module.exports = {
  getActivityAsync,
  getYouTubeVideosAsync,
};
