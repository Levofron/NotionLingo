import NextImage from 'next/image';
import { FC } from 'react';

import { Box, ChakraNextLink, Container, Flex, SimpleGrid, Stack, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';

import { BUY_ME_A_COFFEE_LINK, GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from '@constants';

export const Footer: FC = (): JSX.Element => {
  const currentYear = new Date().getUTCFullYear();

  return (
    <Box bg="white" borderColor="black" borderTop="5px solid" color="gray.700">
      <Container maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={8}>
          <Stack align="flex-start">
            <Text fontSize="lg" fontWeight="600" mb={2}>
              Legal
            </Text>
            <ChakraNextLink color="black" href={ERoutes.PRIVACY_POLICY}>
              Privacy & Policy
            </ChakraNextLink>
            <ChakraNextLink color="black" href={ERoutes.TERMS}>
              Terms & Conditions
            </ChakraNextLink>
          </Stack>
          <Stack align="flex-start">
            <Text fontSize="lg" fontWeight="600" mb={2}>
              Follow us
            </Text>
            <ChakraNextLink color="black" href={GITHUB_LINK} target="_blank">
              GitHub
            </ChakraNextLink>
            <ChakraNextLink color="black" href={TWITTER_LINK} target="_blank">
              Twitter
            </ChakraNextLink>
            <ChakraNextLink color="black" href={LINKEDIN_LINK} target="_blank">
              LinkedIn
            </ChakraNextLink>
          </Stack>
          <Stack align="flex-start">
            <Text fontSize="lg" fontWeight="600" mb={2}>
              Support us
            </Text>
            <ChakraNextLink href={BUY_ME_A_COFFEE_LINK} target="_blank">
              <NextImage
                alt="Buy Me A Coffee"
                height={40}
                src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg"
                width={142.47}
              />
            </ChakraNextLink>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          _after={{
            content: '""',
            borderBottom: '5px solid',
            borderColor: 'black',
            flexGrow: 1,
            ml: 8,
          }}
          _before={{
            content: '""',
            borderBottom: '5px solid',
            borderColor: 'black',
            flexGrow: 1,
            mr: 8,
          }}
          align="center"
        >
          <Text fontFamily="monospace" fontSize="2xl" fontWeight="bold">
            Levofron
          </Text>
        </Flex>
        <Text color="gray.500" pt={6} textAlign="center">
          © {currentYear} Paweł Wojtasiński. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};
