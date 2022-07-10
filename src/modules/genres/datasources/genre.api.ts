import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class GenreAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/v1/genres';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getGenres(offset: number, limit: number) {
    const data = await this.get('', { offset, limit });
    return data.items;
  };

  async getGenreById(id: string) {
    return this.get(`${encodeURIComponent(id)}`);
  };
  
  async createGenre(body: any) {
    return this.post('', body);
  };

  async updateGenre(id: string, body: any) {
    return this.put(`${encodeURIComponent(id)}`, body);
  };

  async deleteGenre(id: string) {
    return this.delete(`${encodeURIComponent(id)}`);
  };
}
