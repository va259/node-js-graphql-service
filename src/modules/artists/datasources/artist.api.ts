import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class ArtistAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3002/v1/artists';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getArtists(offset: number, limit: number) {
    const data = await this.get('', { offset, limit });
    return data.items;
  };

  async getArtistById(id: string) {
    return this.get(`${encodeURIComponent(id)}`);
  };
  
  async createArtist(body: any) {
    return this.post('', body);
  };

  async updateArtist(id: string, body: any) {
    return this.put(`${encodeURIComponent(id)}`, body);
  };

  async deleteArtist(id: string) {
    return this.delete(`${encodeURIComponent(id)}`);
  };
}
