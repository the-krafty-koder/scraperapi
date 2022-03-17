import express from 'express';

const apiRouter = express.Router();

import { getJobs, getJobsByPage, getJobsBySort } from './controllers';

// Routes
apiRouter.route('/jobs')
      .get((req, res) => getJobs(req, res));

apiRouter.route('/jobs/page/:page')
      .get((req, res) => getJobsByPage(req, res));

apiRouter.route('/jobs/order/:order')
      .get((req, res) => getJobsBySort(req, res));

export default apiRouter;
