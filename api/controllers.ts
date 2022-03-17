import fs from 'fs';
import { Request, Response } from 'express';

/**
 * Reads downloaded jobs from file
 */
const jobsFile = fs.readFileSync(
    `${__dirname}/models/jobData.json`,
    {encoding:'utf8', flag:'r'}
  )

let jobs = JSON.parse(jobsFile);

/**
 * Returns all jobs
 *
 * @param {req}  Request - A request object.
 * @param {res} Response - An response object
 * @returns {Response} Json response
 */
export const getJobs = (req: Request, res: Response) => {
  return res.json(jobs);
}

/**
 * Returns specific number of jobs per page
 *
 * @param {req}  Request - A request object.
 * @param {res} Response - An response object
 * @returns {Response} Json response
 */
export const getJobsByPage = (req: Request, res: Response) => {
  const pageNum = parseInt(req.params.page);
  const displayPerPage = 10; // 10 jobs per page

  const result = jobs.slice((pageNum-1)*displayPerPage, pageNum*displayPerPage);

  return res.json(result);
}

/**
 * Returns sorted jobs, either ascending or descending
 *
 * @param {req}  Request - A request object.
 * @param {res} Response - An response object
 * @returns {Response} Json response
 */
export const getJobsBySort = (req: Request, res: Response) => {
  const order = req.params.order;

  return order == 'asc' ? res.json(jobs) : res.json(jobs.reverse());
}
