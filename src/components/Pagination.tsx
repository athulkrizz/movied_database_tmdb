import { ReactNode } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface PageButtonProps {
  page?: number;
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  disabled?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const maxVisiblePages = 5;
  const safeTotal = Math.min(totalPages, 500); // TMDb caps at 500

  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(safeTotal, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (safeTotal <= 1) return null;

  const pageNumbers = getPageNumbers();

  const PageButton = ({ page, isActive, onClick, children, disabled }: PageButtonProps) => (
    <Box
      as="button"
      onClick={onClick}
      {...({ disabled } as any)}
      minW="40px"
      h="40px"
      borderRadius="8px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="sm"
      fontWeight="600"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.4 : 1}
      bg={isActive ? 'linear-gradient(135deg, #f5b800, #ff8c00)' : 'rgba(110, 118, 129, 0.1)'}
      color={isActive ? '#0d1117' : '#8b949e'}
      border="1px solid"
      borderColor={isActive ? 'transparent' : '#30363d'}
      transition="all 0.2s ease"
      _hover={
        !disabled && !isActive
          ? { bg: 'rgba(110, 118, 129, 0.2)', color: '#e6edf3' }
          : {}
      }
    >
      {children || page}
    </Box>
  );

  return (
    <Flex justify="center" align="center" gap="8px" mt="40px" wrap="wrap">
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <FiChevronLeft size={16} />
      </PageButton>

      {pageNumbers[0] > 1 && (
        <>
          <PageButton page={1} onClick={() => onPageChange(1)} />
          {pageNumbers[0] > 2 && (
            <Text color="#484f58" fontSize="sm" px="4px">
              ...
            </Text>
          )}
        </>
      )}

      {pageNumbers.map((page) => (
        <PageButton
          key={page}
          page={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        />
      ))}

      {pageNumbers[pageNumbers.length - 1] < safeTotal && (
        <>
          {pageNumbers[pageNumbers.length - 1] < safeTotal - 1 && (
            <Text color="#484f58" fontSize="sm" px="4px">
              ...
            </Text>
          )}
          <PageButton page={safeTotal} onClick={() => onPageChange(safeTotal)} />
        </>
      )}

      <PageButton
        disabled={currentPage === safeTotal}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <FiChevronRight size={16} />
      </PageButton>
    </Flex>
  );
}
