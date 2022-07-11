import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class BandAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3003/v1/bands';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getBands(offset: number, limit: number) {
    const data = await this.get('', { offset, limit });
    return data.items;
  };

  async getBandById(id: string) {
    return this.get(`${encodeURIComponent(id)}`);
  };
  
  async createBand(body: any) {
    return this.post('', body);
  };

  async updateBand(id: string, body: any) {
    return this.put(`${encodeURIComponent(id)}`, body);
  };

  async deleteBand(id: string) {
    return this.delete(`${encodeURIComponent(id)}`);
  };
}
