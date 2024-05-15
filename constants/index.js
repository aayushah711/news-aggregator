const allowedPreferences = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const newsAPIEndpoint = "http://api.mediastack.com/v1/news";

module.exports = { allowedPreferences, newsAPIEndpoint };
