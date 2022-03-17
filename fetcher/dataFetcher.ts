import cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import Job from '../jobs/job';

class DataFetcher {
  url: string;
  fetchedJobs: any;
  htmlData: any;

  fetched = false;
  data = [];

  constructor(url: string){
    this.url = url;
  };

  toFile (): void {
    fs.writeFile(`${__dirname}/jobs/jobData.json`,
      JSON.stringify(this.data),
      (err) => {
        if(err) throw err;
      })
  }

  toJson (): void {
    this.fetchedJobs.each((_, job) => {
      const content = this.htmlData(job.children[3]).text().split('\n');
      this.data.push(
        {
          title: content[1].trim(),
          location: content[3].trim().replace('in ', ''),
          description: this.htmlData(job.children[1]).text().trim(),
          technologies: [],
          experience: '',
          postedDate: this.htmlData(job.children[2]).text().trim(),
          responsibilites: '',
          companyName: content[2].trim().replace('at ', '')
        }
      )
    });

    this.toFile();
  }

  async getHtml(): Promise<string> {
    const response = await axios.get(this.url);
    return response.data;
  };

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
