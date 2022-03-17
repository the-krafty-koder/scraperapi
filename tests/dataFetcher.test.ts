import DataFetcher from '../fetcher/dataFetcher';

describe('dataFetcher works when', () => {

  it('is given a valid url', async () => {
    const fetcher = new DataFetcher('http://localhost:3000/mocks/sample.html');
    const html = await fetcher.getHtml()
    expect(html).toBeDefined();
  })

  it('loads data into cheerio object', async () => {
    const fetcher = new DataFetcher('http://localhost:3000/mocks/sample.html');
    fetcher.getData().then(data => {
      expect(fetcher.fetched).toBeTruthy();
    });

  })

})
