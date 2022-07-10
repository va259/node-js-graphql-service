import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class BandAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3003/v1/';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getBands() {
    const data = await this.get('bands');
    return data.items;
  };

  async getBandById(id: string) {
    return this.get(`bands/${encodeURIComponent(id)}`);
  };
  
  async createBand(body: any) {
    return this.post('bands', body);
  };

  async updateBand(id: string, body: any) {
    return this.put(`bands/${encodeURIComponent(id)}`, body);
  };

  async deleteBand(id: string) {
    return this.delete(`bands/${encodeURIComponent(id)}`);
  };
}
