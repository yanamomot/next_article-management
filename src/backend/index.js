const { createServer } = require('./server');
const sequelize = require('./db/db');
const { fetchAndSaveArticles } = require('./utils/rssFeedService');

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');

  const feedUrl = 'http://feeds.bbci.co.uk/news/world/rss.xml'; // Replace with your RSS feed URL
  fetchAndSaveArticles(feedUrl);
});

// Start the scheduler
require('./utils/scheduler');

// Sync Sequelize models
sequelize.sync().then(() => {
  console.log('Database synced');
});
