import { useState, useRef, useEffect, FormEvent } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Flex, Text, Input } from '@chakra-ui/react';
import { FiSearch, FiFilm, FiMenu, FiX } from 'react-icons/fi';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Genres', path: '/genres' },
];

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMobileMenuOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <Box
      as="nav"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="1000"
      transition="all 0.3s ease"
      bg={isScrolled ? 'rgba(13, 17, 23, 0.95)' : 'rgba(13, 17, 23, 0.7)'}
      backdropFilter="blur(20px)"
      borderBottom={isScrolled ? '1px solid' : '1px solid transparent'}
      borderColor={isScrolled ? '#30363d' : 'transparent'}
    >
      <Flex
        maxW="1400px"
        mx="auto"
        px={{ base: '16px', md: '32px' }}
        py="12px"
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <RouterLink to="/">
          <Flex align="center" gap="10px" cursor="pointer">
            <Box
              bg="linear-gradient(135deg, #f5b800, #ff8c00)"
              borderRadius="8px"
              p="6px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiFilm size={22} color="#0d1117" />
            </Box>
            <Text
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="800"
              letterSpacing="-0.5px"
              bgGradient="to-r"
              gradientFrom="#f5b800"
              gradientTo="#ff8c00"
              bgClip="text"
            >
              CineVault
            </Text>
          </Flex>
        </RouterLink>

        {/* Desktop Nav Links */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          gap="32px"
        >
          {NAV_LINKS.map((link) => (
            <RouterLink key={link.path} to={link.path}>
              <Text
                fontSize="sm"
                fontWeight="500"
                color="#8b949e"
                transition="color 0.2s ease"
                _hover={{ color: '#e6edf3' }}
              >
                {link.label}
              </Text>
            </RouterLink>
          ))}
        </Flex>

        {/* Search Bar */}
        <Flex align="center" gap="12px">
          <Box
            as="form"
            onSubmit={handleSearch}
            display={{ base: 'none', md: 'flex' }}
            alignItems="center"
            position="relative"
          >
            <Box
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
              color="#8b949e"
              zIndex="1"
              display="flex"
              alignItems="center"
            >
              <FiSearch size={14} />
            </Box>
            <Input
              ref={inputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              size="sm"
              width="260px"
              pl="36px"
              pr="12px"
              py="8px"
              bg="rgba(110, 118, 129, 0.1)"
              border="1px solid"
              borderColor="#30363d"
              borderRadius="8px"
              color="#e6edf3"
              fontSize="sm"
              _placeholder={{ color: '#6e7681' }}
              _focus={{
                borderColor: '#f5b800',
                bg: 'rgba(110, 118, 129, 0.15)',
                boxShadow: '0 0 0 3px rgba(245, 184, 0, 0.1)',
                outline: 'none',
              }}
              transition="all 0.2s ease"
            />
          </Box>

          {/* Mobile Menu Toggle */}
          <Box
            display={{ base: 'flex', md: 'none' }}
            cursor="pointer"
            color="#8b949e"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            p="4px"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </Box>
        </Flex>
      </Flex>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <Box
          display={{ base: 'block', md: 'none' }}
          bg="rgba(13, 17, 23, 0.98)"
          borderTop="1px solid #30363d"
          px="16px"
          py="16px"
          className="fade-in-up"
        >
          <Box as="form" onSubmit={handleSearch} mb="16px">
            <Flex align="center" position="relative">
              <Box
                position="absolute"
                left="12px"
                top="50%"
                transform="translateY(-50%)"
                color="#8b949e"
                zIndex="1"
                display="flex"
                alignItems="center"
              >
                <FiSearch size={14} />
              </Box>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies..."
                width="100%"
                pl="36px"
                pr="12px"
                py="10px"
                bg="rgba(110, 118, 129, 0.1)"
                border="1px solid"
                borderColor="#30363d"
                borderRadius="8px"
                color="#e6edf3"
                fontSize="sm"
                _placeholder={{ color: '#6e7681' }}
                _focus={{
                  borderColor: '#f5b800',
                  outline: 'none',
                }}
              />
            </Flex>
          </Box>
          {NAV_LINKS.map((link) => (
            <RouterLink key={link.path} to={link.path}>
              <Box
                py="10px"
                borderBottom="1px solid #1c2333"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Text
                  fontSize="md"
                  fontWeight="500"
                  color="#8b949e"
                  _hover={{ color: '#e6edf3' }}
                >
                  {link.label}
                </Text>
              </Box>
            </RouterLink>
          ))}
        </Box>
      )}
    </Box>
  );
}
