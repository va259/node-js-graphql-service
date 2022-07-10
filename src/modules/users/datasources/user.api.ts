import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:3004/v1/users';
  }

  willSendRequest(req: RequestOptions) {
    req.headers.set('Authorization', this.context.token);
  }

  async getJWT(email: string, password: string) {
    const data = await this.post('/login', {email, password});
    return data;
  }

  async register(body: any) {
    const user = await this.post('/register', body);
    return user;
  }

  async verify() {
    const user = await this.post('/verify');
    return user;
  }
}
