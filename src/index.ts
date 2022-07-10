import { GenreAPI } from './modules/genres/datasources/genre.api';
import { genreResolvers } from './modules/genres/resolvers/genre.resolver';
import { genreTypeDefs } from './modules/genres/schemas/genre.schema';

import { ArtistAPI } from './modules/artists/datasources/artist.api';
import { artistResolvers } from './modules/artists/resolvers/artist.resolver';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';

import { BandAPI } from './modules/bands/datasources/band.api';
import { bandResolvers } from './modules/bands/resolvers/band.resolver';
import { bandTypeDefs } from './modules/bands/schemas/band.schema';

import { UserAPI } from './modules/users/datasources/user.api';
import { userResolvers } from './modules/users/resolvers/user.resolver';
import { userTypeDefs } from './modules/users/schemas/user.schema';

import { TrackAPI } from './modules/tracks/datasources/track.api';
import { trackResolvers } from './modules/tracks/resolvers/track.resolver';
import { trackTypeDefs } from './modules/tracks/schemas/track.schema';

export { genreTypeDefs, artistTypeDefs, bandTypeDefs, userTypeDefs, trackTypeDefs };
export { GenreAPI, ArtistAPI, BandAPI, UserAPI, TrackAPI };
export { genreResolvers, artistResolvers, bandResolvers, userResolvers, trackResolvers };
