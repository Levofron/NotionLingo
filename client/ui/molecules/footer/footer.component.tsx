import { FC } from 'react';

import { Box, Text } from '@ui/atoms';

export const Footer: FC = (): JSX.Element => {
  const currentYear = new Date().getUTCFullYear();

  return (
    <Box bg="gray.900" py={{ base: 12, md: 20 }}>
      <Text color="gray.50" textAlign="center">
        © {currentYear} Paweł Wojtasiński. All rights reserved.
      </Text>
    </Box>
  );
};
