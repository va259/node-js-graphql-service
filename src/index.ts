import { GenreAPI } from './modules/genres/datasources/genre.api';
import { genreResolvers } from './modules/genres/resolvers/genre.resolver';
import { genreTypeDefs } from './modules/genres/schemas/genre.schema';

import { ArtistAPI } from './modules/artists/datasources/artist.api';
import { artistResolvers } from './modules/artists/resolvers/artist.resolver';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';

export { genreTypeDefs, artistTypeDefs };
export { GenreAPI, ArtistAPI };
export { genreResolvers, artistResolvers };
