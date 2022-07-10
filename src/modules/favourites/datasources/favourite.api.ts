import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class FavouriteAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3007/v1/favourites';
  };

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getFavourites() {
    const data = await this.get('');
    return data;
  };

  async addToFavourites(type: string, id: string) {
    return this.put('/add',
      {
        "type": type,
        "id": id
      }
    );
  };

  async removeFromFavourites(body: any) {
    return this.put('/remove', body);
  }
}
