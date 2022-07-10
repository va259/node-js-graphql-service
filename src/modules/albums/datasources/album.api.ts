import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class AlbumAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3005/v1/';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getAlbums() {
    const data = await this.get('albums');
    return data.items;
  };

  async getAlbumById(id: string) {
    return this.get(`albums/${encodeURIComponent(id)}`);
  };
  
  async createAlbum(body: any) {
    return this.post('albums', body);
  };

  async updateAlbum(id: string, body: any) {
    return this.put(`albums/${encodeURIComponent(id)}`, body);
  };

  async deleteAlbum(id: string) {
    return this.delete(`albums/${encodeURIComponent(id)}`);
  };
}
