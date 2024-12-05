import app from '../index.js'; // Import your Express app

export default (req, res) => {
  app(req, res); // Wrap the Express app in a serverless function
};