import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import { FiGrid } from 'react-icons/fi';
import { fetchGenres, fetchMoviesByGenre, fetchPopular } from '../services/tmdb';
import { Movie, Genre } from '../types/tmdb';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

export default function Genres() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedGenreId = searchParams.get('genre') || '';

  const [genres, setGenres] = useState<Genre[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedGenreName, setSelectedGenreName] = useState('');

  // Load genres list
  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data.genres);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };
    loadGenres();
  }, []);

  // Load movies for selected genre
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let data;
        if (selectedGenreId) {
          data = await fetchMoviesByGenre(selectedGenreId, page);
          const genre = genres.find((g) => g.id === Number(selectedGenreId));
          setSelectedGenreName(genre?.name || '');
        } else {
          data = await fetchPopular(page);
          setSelectedGenreName('');
        }
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        console.error('Failed to load movies:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
    window.scrollTo(0, 0);
  }, [selectedGenreId, page, genres]);

  const handleGenreSelect = (genreId: string) => {
    setPage(1);
    if (genreId) {
      setSearchParams({ genre: genreId });
    } else {
      setSearchParams({});
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Genre icon mapping
  const genreEmojis: Record<number, string> = {
    28: '💥', 12: '🗺️', 16: '🎨', 35: '😂', 80: '🔪',
    99: '📹', 18: '🎭', 10751: '👨‍👩‍👧', 14: '🧙', 36: '📜',
    27: '👻', 10402: '🎵', 9648: '🕵️', 10749: '❤️', 878: '🚀',
    10770: '📺', 53: '😱', 10752: '⚔️', 37: '🤠',
  };

  return (
    <Box
      minH="100vh"
      pt={{ base: '80px', md: '100px' }}
      maxW="1400px"
      mx="auto"
      px={{ base: '16px', md: '32px' }}
    >
      {/* Page Header */}
      <Box mb="32px">
        <Flex align="center" gap="12px" mb="8px">
          <Box color="#f5b800">
            <FiGrid size={28} />
          </Box>
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="900"
            color="#e6edf3"
            letterSpacing="-0.5px"
          >
            Browse by Genre
          </Text>
        </Flex>
        <Text fontSize="md" color="#8b949e">
          Discover movies across different genres
        </Text>
      </Box>

      {/* Genre Pills */}
      <Flex gap="10px" wrap="wrap" mb="40px">
        <span
          className={`genre-badge ${!selectedGenreId ? 'active' : ''}`}
          onClick={() => handleGenreSelect('')}
          style={{ cursor: 'pointer' }}
        >
          🎬 All
        </span>
        {genres.map((genre) => (
          <span
            key={genre.id}
            className={`genre-badge ${
              selectedGenreId === String(genre.id) ? 'active' : ''
            }`}
            onClick={() => handleGenreSelect(String(genre.id))}
            style={{ cursor: 'pointer' }}
          >
            {genreEmojis[genre.id] || '🎬'} {genre.name}
          </span>
        ))}
      </Flex>

      {/* Section Title */}
      <Text fontSize="xl" fontWeight="700" color="#e6edf3" mb="24px">
        {selectedGenreName
          ? `${selectedGenreName} Movies`
          : 'Popular Movies'}
      </Text>

      {/* Loading */}
      {loading && (
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
            xl: 'repeat(6, 1fr)',
          }}
          gap="20px"
        >
          {[...Array(18)].map((_, i) => (
            <Box
              key={i}
              aspectRatio="2/3"
              borderRadius="12px"
              className="skeleton-pulse"
            />
          ))}
        </Grid>
      )}

      {/* Movies */}
      {!loading && movies.length > 0 && (
        <>
          <MovieGrid movies={movies} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* Empty State */}
      {!loading && movies.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="30vh"
          gap="16px"
        >
          <Text fontSize="5xl" opacity="0.3">
            🎬
          </Text>
          <Text color="#6e7681" fontSize="lg">
            No movies found in this genre
          </Text>
        </Flex>
      )}
    </Box>
  );
}
