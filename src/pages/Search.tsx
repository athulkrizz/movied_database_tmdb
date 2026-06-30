import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { searchMovies } from '../services/tmdb';
import { Movie } from '../types/tmdb';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const loadResults = async () => {
      setLoading(true);
      try {
        const data = await searchMovies(query, page);
        setMovies(data.results);
        setTotalPages(data.total_pages);
        setTotalResults(data.total_results);
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
    window.scrollTo(0, 0);
  }, [query, page]);

  // Reset page when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Box
      minH="100vh"
      pt={{ base: '80px', md: '100px' }}
      maxW="1400px"
      mx="auto"
      px={{ base: '16px', md: '32px' }}
    >
      {/* Search Header */}
      <Box mb="40px">
        <Flex align="center" gap="12px" mb="8px">
          <Box color="#f5b800">
            <FiSearch size={28} />
          </Box>
          <Text
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight="900"
            color="#e6edf3"
            letterSpacing="-0.5px"
          >
            Search Results
          </Text>
        </Flex>
        {query && (
          <Text fontSize="md" color="#8b949e">
            {totalResults > 0
              ? `Found ${totalResults.toLocaleString()} results for `
              : 'Searching for '}
            <Text as="span" color="#f5b800" fontWeight="600">
              "{query}"
            </Text>
          </Text>
        )}
      </Box>

      {/* Loading */}
      {loading && (
        <Flex gap="20px" wrap="wrap">
          {[...Array(12)].map((_, i) => (
            <Box
              key={i}
              w={{ base: 'calc(50% - 10px)', sm: '200px' }}
              h="300px"
              borderRadius="12px"
              className="skeleton-pulse"
            />
          ))}
        </Flex>
      )}

      {/* No Query */}
      {!query && !loading && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="40vh"
          gap="16px"
        >
          <Text fontSize="5xl" opacity="0.3">
            🔍
          </Text>
          <Text color="#6e7681" fontSize="lg">
            Enter a search term to find movies
          </Text>
        </Flex>
      )}

      {/* No Results */}
      {query && !loading && movies.length === 0 && (
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="40vh"
          gap="16px"
        >
          <Text fontSize="5xl" opacity="0.3">
            😔
          </Text>
          <Text color="#6e7681" fontSize="lg" textAlign="center">
            No movies found for "{query}"
          </Text>
          <Text color="#484f58" fontSize="sm">
            Try searching with different keywords
          </Text>
        </Flex>
      )}

      {/* Results */}
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
    </Box>
  );
}
