import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class GenreAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3001/v1/';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getGenres() {
    const data = await this.get('genres');
    return data.items;
  };

  async getGenreById(id: string) {
    return this.get(`genres/${encodeURIComponent(id)}`);
  };
  
  async createGenre(body: any) {
    return this.post('genres', body);
  };

  async updateGenre(id: string, body: any) {
    return this.put(`genres/${encodeURIComponent(id)}`, body);
  };

  async deleteGenre(id: string) {
    return this.delete(`genres/${encodeURIComponent(id)}`);
  };
}
