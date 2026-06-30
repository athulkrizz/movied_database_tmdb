import { Link as RouterLink } from 'react-router-dom';
import { Box, Text, Flex } from '@chakra-ui/react';
import { FiStar, FiCalendar } from 'react-icons/fi';
import { getImageUrl } from '../services/tmdb';
import { Movie } from '../types/tmdb';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <RouterLink to={`/movie/${movie.id}`}>
      <Box
        className="movie-card"
        position="relative"
        borderRadius="12px"
        overflow="hidden"
        bg="#161b22"
        border="1px solid #1c2333"
        cursor="pointer"
        height="100%"
        display="flex"
        flexDirection="column"
      >
        {/* Poster Image */}
        <Box position="relative" overflow="hidden" aspectRatio="2/3">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />
          ) : (
            <Flex
              w="100%"
              h="100%"
              bg="#1c2333"
              align="center"
              justify="center"
              color="#484f58"
              fontSize="sm"
            >
              No Image
            </Flex>
          )}

          {/* Rating Badge */}
          <Box
            position="absolute"
            top="10px"
            right="10px"
            bg="rgba(0, 0, 0, 0.75)"
            backdropFilter="blur(10px)"
            borderRadius="8px"
            px="8px"
            py="4px"
            border="1px solid rgba(245, 184, 0, 0.3)"
          >
            <Flex align="center" gap="4px">
              <FiStar size={12} color="#f5b800" fill="#f5b800" />
              <Text fontSize="xs" fontWeight="700" color="#f5b800">
                {rating}
              </Text>
            </Flex>
          </Box>

          {/* Bottom gradient */}
          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            h="60px"
            bg="linear-gradient(to top, #161b22, transparent)"
          />
        </Box>

        {/* Info Section */}
        <Box p="12px" flex="1" display="flex" flexDirection="column" justifyContent="space-between">
          <Text
            fontSize="sm"
            fontWeight="600"
            color="#e6edf3"
            lineClamp={2}
            mb="6px"
            lineHeight="1.4"
          >
            {movie.title}
          </Text>
          <Flex align="center" gap="6px" color="#6e7681">
            <FiCalendar size={11} />
            <Text fontSize="xs">{year}</Text>
          </Flex>
        </Box>
      </Box>
    </RouterLink>
  );
}
