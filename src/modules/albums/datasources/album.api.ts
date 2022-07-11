import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class AlbumAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3005/v1/albums';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getAlbums(offset: number, limit: number) {
    const data = await this.get('', { offset, limit });
    return data.items;
  };

  async getAlbumById(id: string) {
    return this.get(`${encodeURIComponent(id)}`);
  };
  
  async createAlbum(body: any) {
    return this.post('', body);
  };

  async updateAlbum(id: string, body: any) {
    return this.put(`${encodeURIComponent(id)}`, body);
  };

  async deleteAlbum(id: string) {
    return this.delete(`${encodeURIComponent(id)}`);
  };
}
