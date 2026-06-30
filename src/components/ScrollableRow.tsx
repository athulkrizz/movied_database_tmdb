import { useRef, ReactNode } from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ScrollableRowProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
}

export default function ScrollableRow({ title, icon, children }: ScrollableRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box mb="48px" position="relative">
      {title && (
        <Flex align="center" justify="space-between" mb="20px">
          <Flex align="center" gap="10px">
            {icon && (
              <Box color="#f5b800" display="flex" alignItems="center">
                {icon}
              </Box>
            )}
            <Text
              fontSize={{ base: 'xl', md: '2xl' }}
              fontWeight="800"
              color="#e6edf3"
              letterSpacing="-0.5px"
            >
              {title}
            </Text>
          </Flex>

          {/* Scroll Buttons */}
          <Flex gap="8px" display={{ base: 'none', md: 'flex' }}>
            <Box
              as="button"
              onClick={() => scroll('left')}
              w="36px"
              h="36px"
              borderRadius="8px"
              bg="rgba(110, 118, 129, 0.1)"
              border="1px solid #30363d"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#8b949e"
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{ bg: 'rgba(110, 118, 129, 0.2)', color: '#e6edf3' }}
            >
              <FiChevronLeft size={18} />
            </Box>
            <Box
              as="button"
              onClick={() => scroll('right')}
              w="36px"
              h="36px"
              borderRadius="8px"
              bg="rgba(110, 118, 129, 0.1)"
              border="1px solid #30363d"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="#8b949e"
              cursor="pointer"
              transition="all 0.2s ease"
              _hover={{ bg: 'rgba(110, 118, 129, 0.2)', color: '#e6edf3' }}
            >
              <FiChevronRight size={18} />
            </Box>
          </Flex>
        </Flex>
      )}

      <Box
        ref={scrollRef}
        className="scroll-container"
        mx="-4px"
        px="4px"
      >
        {children}
      </Box>
    </Box>
  );
}
