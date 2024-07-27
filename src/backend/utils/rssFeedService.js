const Parser = require('rss-parser');
const { Article } = require('../models/Article.model'); // Adjust the path as needed
const parser = new Parser();

// Function to fetch and parse RSS feed
async function fetchAndSaveArticles(feedUrl) {
  try {
    const feed = await parser.parseURL(feedUrl);
    const articles = feed.items.map(item => ({
      title: item.title,
      description: item.contentSnippet,
      url: item.link,
      published: new Date(item.pubDate),
    }));

    // Save articles to database
    await Article.bulkCreate(articles, {
      updateOnDuplicate: ['title', 'description', 'url', 'published']
    });

    console.log('Articles saved to database successfully.');
  } catch (error) {
    console.error('Error fetching or saving articles:', error);
  }
}

module.exports = {
  fetchAndSaveArticles,
};
