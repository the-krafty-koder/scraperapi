import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import { Job } from '../api/models/job';

class DataFetcher {
  /**
   * Fetches scarped data from a site url.
   *
   */

  url: string;
  fetchedJobs: any;
  htmlData: any;

  fetched = false;
  data: Job[] = [];

  /**
 * @param {string}  url - A site url
 */
  constructor(url: string){
    this.url = url;
  };

  /**
   * Saves data to local file
   * @returns {void}
   */
  toFile (): void {
    fs.writeFile(`${__dirname.replace('fetcher', 'api')}/models/jobData.json`,
      JSON.stringify(this.data),
      (err) => {
        if(err) throw err;
      })
  }

  /**
   * Converts fetched data to json

   * @returns {void}
   */
  toJson (): void {
    this.fetchedJobs.each((_, job) => {
      const content = this.htmlData(job.children[3]).text().split('\n');
      const date = this.htmlData(job.children[5]).text().trim()
      const posted = date.includes('-') ? date : '10-03-2022';

      this.data.push(
        {
          title: content[1].trim(),
          location: content[3].trim().replace('in ', ''),
          description: this.htmlData(job.children[3]).text()
                                                     .trim()
                                                     .replace(/\s{2}|[\t,\n]/g, ''),
          technologies: [],
          experience: '',
          postedDate: posted,
          responsibilites: '',
          companyName: content[2].trim().replace('at ', '')
        }
      )
    });
    this.data.sort((a, b) => a.postedDate > b.postedDate ? 1 : -1);
    this.toFile();
  }

  /**
 * Gets site html
 *
 * @returns {Promise<string>} Html content of site
 */
  async getHtml(): Promise<string> {
    const response = await axios.get(this.url);
    return response.data;
  };

  /**
 * Scrapes job data from html
 *
 * @returns {Promise<void>}
 */
  async getData(): Promise<void> {
    if(!this.fetched){
      try {
        const html = await this.getHtml();
        this.htmlData = cheerio.load(html, { ignoreWhitespace: true });
        const jobs = this.htmlData(`div.job-listings div.job-listing.mb-2`);

        this.fetchedJobs = jobs;
        this.toJson();
        this.fetched = true;
      } catch (error) {
        console.log(error);
      }
    }
  }


}


export default DataFetcher;
