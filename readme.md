# Activity Suggester

This is a Node.js application that suggests random activities to the user. It uses the Bored API to fetch activities and the YouTube API to fetch related videos.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm

### Installing

1. Clone the repository

```sh
git clone git@github.com:leonwongdev/activity-suggestion.git
```

2. Install dependencies

```
npm install
```

3. Start the server

```
npm run dev
```

The server will start on http://localhost:3000.

**Project Structure**

- `api/` - Contains the API calls to the Bored API and YouTube API.
- `public/` - Contains static files like CSS and JavaScript files.
- `views/` - Contains EJS view templates.
- `index.js` - The main server file.

**Built With**

- Node.js
- Express
- EJS
- Bootstrap
