import { Box, Text } from '@chakra-ui/react';
import { getImageUrl } from '../services/tmdb';
import { CastMember } from '../types/tmdb';

interface CastCardProps {
  person: CastMember;
}

export default function CastCard({ person }: CastCardProps) {
  const profileUrl = getImageUrl(person.profile_path, 'w200');

  return (
    <Box
      textAlign="center"
      minW="110px"
      maxW="110px"
      cursor="default"
    >
      <Box
        w="90px"
        h="90px"
        borderRadius="50%"
        overflow="hidden"
        mx="auto"
        mb="8px"
        border="2px solid #30363d"
        transition="border-color 0.2s ease"
        _hover={{ borderColor: '#f5b800' }}
      >
        {profileUrl ? (
          <img
            src={profileUrl}
            alt={person.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box
            w="100%"
            h="100%"
            bg="#1c2333"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="#484f58"
            fontSize="2xl"
          >
            🎭
          </Box>
        )}
      </Box>
      <Text fontSize="xs" fontWeight="600" color="#e6edf3" lineClamp={1}>
        {person.name}
      </Text>
      <Text fontSize="xs" color="#6e7681" lineClamp={1}>
        {person.character}
      </Text>
    </Box>
  );
}
