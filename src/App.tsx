import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { system } from './theme';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search from './pages/Search';
import Genres from './pages/Genres';
import { Box } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Box bg="#0d1117" minH="100vh" color="#e6edf3">
          <Navbar />
          <Box as="main">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/genres" element={<Genres />} />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
