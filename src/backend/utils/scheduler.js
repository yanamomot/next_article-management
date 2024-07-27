const cron = require('node-cron');
const { fetchAndSaveArticles } = require('./rssFeedService.js');

// Schedule to run every hour (adjust as needed)
cron.schedule('0 * * * *', () => {
  const feedUrl = 'http://feeds.bbci.co.uk/news/world/rss.xml'; // Replace with your RSS feed URL
  fetchAndSaveArticles(feedUrl);
});
