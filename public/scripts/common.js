// window.onload = () => {
console.log("common js loaded");
const activities = [
  "Go for a walk in the park",
  "Read a book for 30 minutes",
  "Cook a new recipe",
  "Try a new hobby",
  "Write in your journal",
  "Listen to your favorite music",
  "Practice meditation for 10 minutes",
  "Call a friend or family member",
  "Do a random act of kindness",
  "Learn something new online",
  "Take a nap",
  "Go for a bike ride",
  "Watch a movie",
  "Visit a local museum or gallery",
  "Organize your workspace",
  "Start a DIY project",
  "Exercise for 20 minutes",
  "Visit a nearby coffee shop",
  "Take a photography walk",
  "Volunteer for a cause you care about",
];

const activityElement = document.getElementById("activity");
const activityContainer = document.getElementById("activity-container");
// get current time
const currentTime = new Date();
function generateRandomActivity() {
  // check if it has been 3 seconds after the current time
  if (new Date() - currentTime > 5000) {
    // Clear the timer
    clearInterval(randomTextTimer);
    // Hide the activity container
    activityContainer.style.display = "none";
    console.log("Timer cleared! Activity container is hidden");
    // Display the result-container
    document.getElementById("result-container").style.display = "block";
    return;
  }
  const randomIndex = Math.floor(Math.random() * activities.length);
  activityElement.innerHTML =
    "Generating activities:<br>" + activities[randomIndex];
}

const randomTextTimer = setInterval(generateRandomActivity, 100);
// };
