import { GenreAPI } from './modules/genres/datasources/genre.api';
import { genreResolvers } from './modules/genres/resolvers/genre.resolver';
import { genreTypeDefs } from './modules/genres/schemas/genre.schema';

import { ArtistAPI } from './modules/artists/datasources/artist.api';
import { artistResolvers } from './modules/artists/resolvers/artist.resolver';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';

import { BandAPI } from './modules/bands/datasources/band.api';
import { bandResolvers } from './modules/bands/resolvers/band.resolver';
import { bandTypeDefs } from './modules/bands/schemas/band.schema';

export { genreTypeDefs, artistTypeDefs, bandTypeDefs };
export { GenreAPI, ArtistAPI, BandAPI };
export { genreResolvers, artistResolvers, bandResolvers };
