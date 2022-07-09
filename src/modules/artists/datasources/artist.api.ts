import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class ArtistAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3002/v1/';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getArtists() {
    const data = await this.get('artists');
    return data.items;
  };

  async getArtistById(id: string) {
    return this.get(`artists/${encodeURIComponent(id)}`);
  };
  
  async createArtist(body: any) {
    return this.post('artists', body);
  };

  async updateArtist(id: string, body: any) {
    return this.put(`artists/${encodeURIComponent(id)}`, body);
  };

  async deleteArtist(id: string) {
    return this.delete(`artists/${encodeURIComponent(id)}`);
  };
}
