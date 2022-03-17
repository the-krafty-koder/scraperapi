import express from 'express';
import apiRouter from './api/router';
import rateLimit from 'express-rate-limit'

import { fetchJobs } from './fetcher/fetch.service';

const app = express();
const port = 3000;
const apiLimiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute window
	max: 20, // Limit to 20 requests per minute
	standardHeaders: true,
	legacyHeaders: false,
})

app.listen(port, () => {
  fetchJobs();
});

app.use(express.static('public'));
app.use(apiLimiter);

// Routes
app.use('/api', apiRouter, apiLimiter);
