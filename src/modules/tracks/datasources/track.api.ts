import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3006/v1/';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getTracks() {
    const data = await this.get('tracks');
    return data.items;
  };

  async getTrackById(id: string) {
    return this.get(`tracks/${encodeURIComponent(id)}`);
  };
  
  async createTrack(body: any) {
    return this.post('tracks', body);
  };

  async updateTrack(id: string, body: any) {
    return this.put(`tracks/${encodeURIComponent(id)}`, body);
  };

  async deleteTrack(id: string) {
    return this.delete(`tracks/${encodeURIComponent(id)}`);
  };
}
