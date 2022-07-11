import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class TrackAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3006/v1/tracks';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getTracks(offset: number, limit: number) {
    const data = await this.get('', { offset, limit });
    return data.items;
  };

  async getTrackById(id: string) {
    return this.get(`${encodeURIComponent(id)}`);
  };
  
  async createTrack(body: any) {
    return this.post('', body);
  };

  async updateTrack(id: string, body: any) {
    return this.put(`${encodeURIComponent(id)}`, body);
  };

  async deleteTrack(id: string) {
    return this.delete(`${encodeURIComponent(id)}`);
  };
}
