import { Box, Flex, Text } from '@chakra-ui/react';
import { FiFilm, FiHeart } from 'react-icons/fi';

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="#0a0e14"
      borderTop="1px solid #1c2333"
      mt="80px"
    >
      <Box maxW="1400px" mx="auto" px={{ base: '16px', md: '32px' }} py="40px">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'center', md: 'flex-start' }}
          gap="24px"
        >
          {/* Logo & Description */}
          <Box textAlign={{ base: 'center', md: 'left' }}>
            <Flex
              align="center"
              gap="10px"
              justify={{ base: 'center', md: 'flex-start' }}
              mb="12px"
            >
              <Box
                bg="linear-gradient(135deg, #f5b800, #ff8c00)"
                borderRadius="8px"
                p="5px"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FiFilm size={18} color="#0d1117" />
              </Box>
              <Text fontSize="lg" fontWeight="800" color="#e6edf3">
                CineVault
              </Text>
            </Flex>
            <Text fontSize="sm" color="#6e7681" maxW="320px">
              Your ultimate movie database. Discover trending films,
              explore genres, and find your next favorite movie.
            </Text>
          </Box>

          {/* TMDb Attribution */}
          <Box textAlign={{ base: 'center', md: 'right' }}>
            <Text fontSize="xs" color="#6e7681" mb="8px">
              Powered by
            </Text>
            <img
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
              alt="TMDb Logo"
              style={{
                height: '16px',
                opacity: 0.7,
                margin: '0 auto',
              }}
            />
            <Text fontSize="xs" color="#484f58" mt="12px">
              This product uses the TMDb API but is not endorsed or certified by TMDb.
            </Text>
          </Box>
        </Flex>

        {/* Bottom Bar */}
        <Box
          borderTop="1px solid #1c2333"
          mt="32px"
          pt="20px"
          textAlign="center"
        >
          <Flex align="center" justify="center" gap="4px">
            <Text fontSize="xs" color="#484f58">
              Made with
            </Text>
            <FiHeart size={12} color="#f5b800" />
            <Text fontSize="xs" color="#484f58">
              using React & Chakra UI
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
