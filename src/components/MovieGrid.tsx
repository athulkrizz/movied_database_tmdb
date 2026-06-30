import { ReactNode } from 'react';
import { Box, Grid, Text, Flex } from '@chakra-ui/react';
import MovieCard from './MovieCard';
import { Movie } from '../types/tmdb';

interface MovieGridProps {
  title?: string;
  movies: Movie[];
  icon?: ReactNode;
}

export default function MovieGrid({ title, movies, icon }: MovieGridProps) {
  if (!movies || movies.length === 0) return null;

  return (
    <Box mb="48px">
      {title && (
        <Flex align="center" gap="10px" mb="24px">
          {icon && (
            <Box color="#f5b800" display="flex" alignItems="center">
              {icon}
            </Box>
          )}
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="800"
            color="#e6edf3"
            letterSpacing="-0.5px"
          >
            {title}
          </Text>
        </Flex>
      )}

      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
          xl: 'repeat(6, 1fr)',
        }}
        gap={{ base: '12px', md: '20px' }}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
}
