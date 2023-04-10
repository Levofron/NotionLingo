import { Box, Text } from '@presentation/atoms';

export const Footer = (): JSX.Element => {
  const currentYear = new Date().getUTCFullYear();

  return (
    <Box bg="gray.900" py={{ base: 12, md: 20 }}>
      <Text color="gray.50" textAlign="center">
        © {currentYear} Paweł Wojtasiński. All rights reserved.
      </Text>
    </Box>
  );
};
