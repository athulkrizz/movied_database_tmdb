import { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import {
  FiStar,
  FiClock,
  FiCalendar,
  FiPlay,
  FiDollarSign,
  FiGlobe,
} from 'react-icons/fi';
import { fetchMovieDetails, getImageUrl } from '../services/tmdb';
import { MovieDetails } from '../types/tmdb';
import CastCard from '../components/CastCard';
import ScrollableRow from '../components/ScrollableRow';
import MovieCard from '../components/MovieCard';

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const loadMovie = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(id);
        setMovie(data);
      } catch (err) {
        console.error('Failed to load movie:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <Box minH="100vh">
        <Box h="70vh" className="skeleton-pulse" />
        <Box maxW="1400px" mx="auto" px={{ base: '16px', md: '32px' }} mt="32px">
          <Box h="40px" w="300px" className="skeleton-pulse" borderRadius="8px" mb="16px" />
          <Box h="20px" w="500px" className="skeleton-pulse" borderRadius="6px" mb="32px" />
          <Box h="200px" className="skeleton-pulse" borderRadius="12px" />
        </Box>
      </Box>
    );
  }

  if (!movie) {
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Text color="#8b949e" fontSize="lg">
          Movie not found.
        </Text>
      </Flex>
    );
  }

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
    : 'N/A';
  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  );
  const cast = movie.credits?.cast?.slice(0, 20) || [];
  const similar = movie.similar?.results?.slice(0, 12) || [];
  const director = movie.credits?.crew?.find((c) => c.job === 'Director');

  return (
    <Box minH="100vh">
      {/* Backdrop */}
      <Box position="relative" h={{ base: '50vh', md: '70vh' }} overflow="hidden">
        <Box
          position="absolute"
          inset="0"
          bgImage={backdropUrl ? `url(${backdropUrl})` : undefined}
          backgroundSize="cover"
          backgroundPosition="center top"
          backgroundColor={!backdropUrl ? '#161b22' : undefined}
        />
        <Box position="absolute" inset="0" className="gradient-overlay" />
        <Box position="absolute" inset="0" className="gradient-overlay-right" />
      </Box>

      {/* Content */}
      <Box
        maxW="1400px"
        mx="auto"
        px={{ base: '16px', md: '32px' }}
        mt={{ base: '-200px', md: '-300px' }}
        position="relative"
        zIndex="1"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          gap={{ base: '24px', md: '40px' }}
          align={{ base: 'center', md: 'flex-start' }}
        >
          {/* Poster */}
          <Box
            flexShrink="0"
            w={{ base: '200px', md: '300px' }}
            borderRadius="16px"
            overflow="hidden"
            boxShadow="0 25px 50px rgba(0, 0, 0, 0.5)"
            border="2px solid #30363d"
          >
            {posterUrl ? (
              <img
                src={posterUrl}
                alt={movie.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <Flex
                w="100%"
                aspectRatio="2/3"
                bg="#1c2333"
                align="center"
                justify="center"
                color="#484f58"
              >
                No Poster
              </Flex>
            )}
          </Box>

          {/* Details */}
          <Box flex="1" pt={{ base: '0', md: '60px' }}>
            {/* Title */}
            <Text
              fontSize={{ base: '2xl', md: '4xl' }}
              fontWeight="900"
              color="#e6edf3"
              lineHeight="1.15"
              letterSpacing="-0.5px"
              mb="8px"
              textAlign={{ base: 'center', md: 'left' }}
            >
              {movie.title}
              {year !== 'N/A' && (
                <Text
                  as="span"
                  fontSize={{ base: 'lg', md: '2xl' }}
                  fontWeight="400"
                  color="#6e7681"
                  ml="10px"
                >
                  ({year})
                </Text>
              )}
            </Text>

            {/* Tagline */}
            {movie.tagline && (
              <Text
                fontSize="md"
                fontStyle="italic"
                color="#8b949e"
                mb="20px"
                textAlign={{ base: 'center', md: 'left' }}
              >
                "{movie.tagline}"
              </Text>
            )}

            {/* Metadata Badges */}
            <Flex
              gap="12px"
              wrap="wrap"
              mb="20px"
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Flex
                align="center"
                gap="6px"
                bg="rgba(245, 184, 0, 0.12)"
                px="12px"
                py="6px"
                borderRadius="8px"
                border="1px solid rgba(245, 184, 0, 0.25)"
              >
                <FiStar size={14} color="#f5b800" fill="#f5b800" />
                <Text fontSize="sm" fontWeight="700" color="#f5b800">
                  {rating}
                </Text>
                <Text fontSize="xs" color="#8b949e">
                  ({movie.vote_count?.toLocaleString()} votes)
                </Text>
              </Flex>

              <Flex
                align="center"
                gap="6px"
                bg="rgba(110, 118, 129, 0.1)"
                px="12px"
                py="6px"
                borderRadius="8px"
                border="1px solid #30363d"
              >
                <FiClock size={14} color="#8b949e" />
                <Text fontSize="sm" color="#8b949e">
                  {runtime}
                </Text>
              </Flex>

              <Flex
                align="center"
                gap="6px"
                bg="rgba(110, 118, 129, 0.1)"
                px="12px"
                py="6px"
                borderRadius="8px"
                border="1px solid #30363d"
              >
                <FiCalendar size={14} color="#8b949e" />
                <Text fontSize="sm" color="#8b949e">
                  {movie.release_date || 'TBA'}
                </Text>
              </Flex>
            </Flex>

            {/* Genres */}
            {movie.genres && movie.genres.length > 0 && (
              <Flex gap="8px" wrap="wrap" mb="24px" justify={{ base: 'center', md: 'flex-start' }}>
                {movie.genres.map((genre) => (
                  <RouterLink key={genre.id} to={`/genres?genre=${genre.id}`}>
                    <span className="genre-badge">{genre.name}</span>
                  </RouterLink>
                ))}
              </Flex>
            )}

            {/* Director */}
            {director && (
              <Text fontSize="sm" color="#8b949e" mb="20px" textAlign={{ base: 'center', md: 'left' }}>
                Directed by{' '}
                <Text as="span" color="#e6edf3" fontWeight="600">
                  {director.name}
                </Text>
              </Text>
            )}

            {/* Overview */}
            <Box mb="24px">
              <Text fontSize="lg" fontWeight="700" color="#e6edf3" mb="8px">
                Overview
              </Text>
              <Text
                fontSize="sm"
                color="#8b949e"
                lineHeight="1.8"
              >
                {movie.overview || 'No overview available.'}
              </Text>
            </Box>

            {/* Additional Info */}
            <Grid
              templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
              gap="16px"
              mb="24px"
            >
              {movie.budget > 0 && (
                <Box
                  bg="rgba(110, 118, 129, 0.06)"
                  p="14px"
                  borderRadius="10px"
                  border="1px solid #1c2333"
                >
                  <Flex align="center" gap="6px" mb="4px">
                    <FiDollarSign size={12} color="#6e7681" />
                    <Text fontSize="xs" color="#6e7681" fontWeight="500">
                      Budget
                    </Text>
                  </Flex>
                  <Text fontSize="sm" fontWeight="600" color="#e6edf3">
                    ${movie.budget.toLocaleString()}
                  </Text>
                </Box>
              )}

              {movie.revenue > 0 && (
                <Box
                  bg="rgba(110, 118, 129, 0.06)"
                  p="14px"
                  borderRadius="10px"
                  border="1px solid #1c2333"
                >
                  <Flex align="center" gap="6px" mb="4px">
                    <FiDollarSign size={12} color="#6e7681" />
                    <Text fontSize="xs" color="#6e7681" fontWeight="500">
                      Revenue
                    </Text>
                  </Flex>
                  <Text fontSize="sm" fontWeight="600" color="#e6edf3">
                    ${movie.revenue.toLocaleString()}
                  </Text>
                </Box>
              )}

              {movie.original_language && (
                <Box
                  bg="rgba(110, 118, 129, 0.06)"
                  p="14px"
                  borderRadius="10px"
                  border="1px solid #1c2333"
                >
                  <Flex align="center" gap="6px" mb="4px">
                    <FiGlobe size={12} color="#6e7681" />
                    <Text fontSize="xs" color="#6e7681" fontWeight="500">
                      Language
                    </Text>
                  </Flex>
                  <Text fontSize="sm" fontWeight="600" color="#e6edf3" textTransform="uppercase">
                    {movie.original_language}
                  </Text>
                </Box>
              )}
            </Grid>

            {/* Trailer Button */}
            {trailer && (
              <Box mb="16px">
                <a
                  href={`https://www.youtube.com/watch?v=${trailer.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Flex
                    as="span"
                    display="inline-flex"
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
                  >
                    <FiPlay size={16} />
                    Watch Trailer
                  </Flex>
                </a>
              </Box>
            )}
          </Box>
        </Flex>

        {/* Trailer Embed */}
        {trailer && (
          <Box mt="48px" mb="48px">
            <Text fontSize="2xl" fontWeight="800" color="#e6edf3" mb="20px">
              🎬 Trailer
            </Text>
            <Box
              borderRadius="16px"
              overflow="hidden"
              border="1px solid #30363d"
              aspectRatio="16/9"
              maxW="900px"
            >
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${movie.title} Trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </Box>
          </Box>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <ScrollableRow title="Cast" icon={<span>🎭</span>}>
            {cast.map((person) => (
              <CastCard key={person.credit_id} person={person} />
            ))}
          </ScrollableRow>
        )}

        {/* Similar Movies */}
        {similar.length > 0 && (
          <ScrollableRow title="Similar Movies" icon={<span>🎞️</span>}>
            {similar.map((m) => (
              <Box key={m.id} minW={{ base: '150px', md: '200px' }}>
                <MovieCard movie={m} />
              </Box>
            ))}
          </ScrollableRow>
        )}
      </Box>
    </Box>
  );
}
