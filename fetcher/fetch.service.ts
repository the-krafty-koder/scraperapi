import DataFetcher from '../fetcher/dataFetcher';


/**
 * Service for fetching jobs
 */
export const fetchJobs = () => {
  const siteUrl = 'https://workinstartups.com/job-board/jobs/developers';
  const fetcher = new DataFetcher(siteUrl);

  fetcher.getData().then(data => console.log('Data fetched'));
}
