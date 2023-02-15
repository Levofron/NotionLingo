import { TbError404 } from 'react-icons/tb';

import { Box, Card, Flex, Heading, Icon, ParticlesBackground, Stack } from '@ui/atoms';

export const AddWordTemplate = (): JSX.Element => (
  <Box bg="gray.50" height="100%" overflow="hidden">
    <ParticlesBackground />
    <Flex align="center" h="100%" justify="center" w="100%">
      <Card align="center" as={Flex} bg="gray.50" gap={6} maxW="lg" p={8} textAlign="center">
        <Icon as={TbError404} color="gray.900" fontSize="100" />
        <Stack spacing={2}>
          <Heading>Add a new word...</Heading>
        </Stack>
      </Card>
    </Flex>
  </Box>
);
