import { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { FiTrendingUp, FiStar, FiClock, FiZap } from 'react-icons/fi';
import HeroSection from '../components/HeroSection';
import ScrollableRow from '../components/ScrollableRow';
import MovieGrid from '../components/MovieGrid';
import MovieCard from '../components/MovieCard';
import {
  fetchTrending,
  fetchPopular,
  fetchTopRated,
  fetchUpcoming,
} from '../services/tmdb';
import { Movie } from '../types/tmdb';

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [trendingData, popularData, topRatedData, upcomingData] =
          await Promise.all([
            fetchTrending('day'),
            fetchPopular(),
            fetchTopRated(),
            fetchUpcoming(),
          ]);

        setTrending(trendingData.results.slice(0, 20));
        setPopular(popularData.results.slice(0, 12));
        setTopRated(topRatedData.results.slice(0, 12));
        setUpcoming(upcomingData.results.slice(0, 12));
      } catch (err) {
        console.error('Failed to load home data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <Box>
        <Box h="85vh" className="skeleton-pulse" />
        <Box maxW="1400px" mx="auto" px={{ base: '16px', md: '32px' }} mt="40px">
          {[...Array(3)].map((_, i) => (
            <Box key={i} mb="48px">
              <Box
                h="28px"
                w="200px"
                borderRadius="6px"
                className="skeleton-pulse"
                mb="20px"
              />
              <Flex gap="20px">
                {[...Array(6)].map((_, j) => (
                  <Box
                    key={j}
                    minW="200px"
                    h="300px"
                    borderRadius="12px"
                    className="skeleton-pulse"
                  />
                ))}
              </Flex>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <Box
        maxW="1400px"
        mx="auto"
        px={{ base: '16px', md: '32px' }}
        mt="-40px"
        position="relative"
        zIndex="1"
      >
        {/* Trending Row (Horizontal Scroll) */}
        <ScrollableRow
          title="Trending Today"
          icon={<FiTrendingUp size={22} />}
        >
          {trending.map((movie) => (
            <Box key={movie.id} minW={{ base: '150px', md: '200px' }}>
              <MovieCard movie={movie} />
            </Box>
          ))}
        </ScrollableRow>

        {/* Popular Grid */}
        <MovieGrid
          title="Popular Movies"
          icon={<FiZap size={22} />}
          movies={popular}
        />

        {/* Top Rated Grid */}
        <MovieGrid
          title="Top Rated"
          icon={<FiStar size={22} />}
          movies={topRated}
        />

        {/* Upcoming Grid */}
        <MovieGrid
          title="Upcoming"
          icon={<FiClock size={22} />}
          movies={upcoming}
        />
      </Box>
    </Box>
  );
}
