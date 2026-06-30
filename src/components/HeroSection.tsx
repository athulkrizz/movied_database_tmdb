import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FiStar, FiPlay, FiCalendar } from 'react-icons/fi';
import { fetchTrending, getImageUrl } from '../services/tmdb';
import { Movie } from '../types/tmdb';

export default function HeroSection() {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const data = await fetchTrending('day');
        const withBackdrops = data.results.filter((m) => m.backdrop_path);
        setMovies(withBackdrops.slice(0, 5));
        setMovie(withBackdrops[0] || null);
      } catch (err) {
        console.error('Failed to load trending:', err);
      }
    };
    loadTrending();
  }, []);

  // Auto-rotate every 8 seconds
  useEffect(() => {
    if (movies.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % movies.length;
        setMovie(movies[next] || null);
        return next;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, [movies]);

  if (!movie) {
    return (
      <Box h="80vh" bg="#0d1117" className="skeleton-pulse" />
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Box position="relative" h={{ base: '70vh', md: '85vh' }} overflow="hidden">
      {/* Backdrop Image */}
      <Box
        position="absolute"
        inset="0"
        bgImage={backdropUrl ? `url(${backdropUrl})` : undefined}
        backgroundSize="cover"
        backgroundPosition="center top"
        transition="background-image 0.8s ease-in-out"
      />

      {/* Gradient Overlays */}
      <Box position="absolute" inset="0" className="gradient-overlay" />
      <Box position="absolute" inset="0" className="gradient-overlay-right" />

      {/* Content */}
      <Flex
        position="relative"
        h="100%"
        maxW="1400px"
        mx="auto"
        px={{ base: '20px', md: '32px' }}
        align="flex-end"
        pb={{ base: '60px', md: '80px' }}
      >
        <Box maxW="650px" className="fade-in-up" key={movie.id}>
          {/* Badges */}
          <Flex gap="10px" mb="16px" wrap="wrap">
            <Box
              bg="linear-gradient(135deg, #f5b800, #ff8c00)"
              px="12px"
              py="4px"
              borderRadius="6px"
              display="inline-flex"
              alignItems="center"
            >
              <Text fontSize="xs" fontWeight="700" color="#0d1117">
                🔥 TRENDING
              </Text>
            </Box>
            <Flex
              align="center"
              gap="4px"
              bg="rgba(255,255,255,0.1)"
              px="10px"
              py="4px"
              borderRadius="6px"
              backdropFilter="blur(10px)"
            >
              <FiStar size={12} color="#f5b800" fill="#f5b800" />
              <Text fontSize="xs" fontWeight="600" color="#f5b800">
                {rating}
              </Text>
            </Flex>
            {year && (
              <Flex
                align="center"
                gap="4px"
                bg="rgba(255,255,255,0.1)"
                px="10px"
                py="4px"
                borderRadius="6px"
                backdropFilter="blur(10px)"
              >
                <FiCalendar size={12} color="#8b949e" />
                <Text fontSize="xs" fontWeight="500" color="#8b949e">
                  {year}
                </Text>
              </Flex>
            )}
          </Flex>

          {/* Title */}
          <Text
            fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
            fontWeight="900"
            lineHeight="1.1"
            color="#e6edf3"
            mb="16px"
            letterSpacing="-1px"
          >
            {movie.title}
          </Text>

          {/* Overview */}
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            color="#8b949e"
            lineHeight="1.7"
            mb="28px"
            lineClamp={{ base: 3, md: 4 }}
          >
            {movie.overview}
          </Text>

          {/* CTA */}
          <Flex gap="12px" wrap="wrap">
            <RouterLink to={`/movie/${movie.id}`}>
              <Flex
                as="button"
                align="center"
                gap="8px"
                bg="linear-gradient(135deg, #f5b800, #ff8c00)"
                color="#0d1117"
                px="24px"
                py="12px"
                borderRadius="10px"
                fontWeight="700"
                fontSize="sm"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 25px rgba(245, 184, 0, 0.35)',
                }}
                style={{ border: 'none' }}
              >
                <FiPlay size={16} />
                View Details
              </Flex>
            </RouterLink>
          </Flex>
        </Box>
      </Flex>

      {/* Slide Indicators */}
      <Flex
        position="absolute"
        bottom={{ base: '20px', md: '30px' }}
        right={{ base: '20px', md: '32px' }}
        gap="8px"
      >
        {movies.map((_, idx) => (
          <Box
            key={idx}
            w={idx === currentIndex ? '28px' : '8px'}
            h="8px"
            borderRadius="4px"
            bg={idx === currentIndex ? '#f5b800' : 'rgba(255,255,255,0.3)'}
            transition="all 0.3s ease"
            cursor="pointer"
            onClick={() => {
              setCurrentIndex(idx);
              setMovie(movies[idx] || null);
            }}
          />
        ))}
      </Flex>
    </Box>
  );
}
