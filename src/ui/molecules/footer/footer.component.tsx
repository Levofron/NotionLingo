import NextImage from 'next/image';
import { FC } from 'react';

import { Box, ChakraNextLink, Container, Flex, SimpleGrid, Stack, Text } from '@ui/atoms';

import { ERoutes } from '@infrastructure/types/routes';

import {
  BUY_ME_A_COFFEE_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  PAYPAL_LINK,
  TWITTER_LINK,
} from '@constants';

export const Footer: FC = (): JSX.Element => {
  const currentYear = new Date().getUTCFullYear();

  return (
    <Box bg="gray.900">
      <Container maxW="6xl" py={10}>
        <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={8}>
          <Stack align="flex-start">
            <Text color="gray.50" fontSize="lg" fontWeight="600" mb={2}>
              Legal
            </Text>
            <ChakraNextLink color="gray.50" href={ERoutes.PRIVACY_POLICY}>
              Privacy Policy
            </ChakraNextLink>
            <ChakraNextLink color="gray.50" href={ERoutes.TERMS}>
              Terms & Conditions
            </ChakraNextLink>
          </Stack>
          <Stack align="flex-start">
            <Text color="gray.50" fontSize="lg" fontWeight="600" mb={2}>
              Follow us
            </Text>
            <ChakraNextLink color="gray.50" href={GITHUB_LINK} target="_blank">
              GitHub
            </ChakraNextLink>
            <ChakraNextLink color="gray.50" href={TWITTER_LINK} target="_blank">
              Twitter
            </ChakraNextLink>
            <ChakraNextLink color="gray.50" href={LINKEDIN_LINK} target="_blank">
              LinkedIn
            </ChakraNextLink>
          </Stack>
          <Stack align="flex-start">
            <Text color="gray.50" fontSize="lg" fontWeight="600" mb={2}>
              Support us
            </Text>
            <ChakraNextLink href={BUY_ME_A_COFFEE_LINK} target="_blank">
              <NextImage
                alt="Buy Me A Coffee"
                height={40}
                src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg"
                width={150}
              />
            </ChakraNextLink>
            <ChakraNextLink
              href={PAYPAL_LINK}
              style={{
                backgroundColor: 'white',
                padding: '3px 10px',
                borderRadius: '6px',
                width: '150px',
              }}
              target="_blank"
            >
              <NextImage
                alt="PayPal"
                height={40}
                src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-color.svg"
                width={146}
              />
            </ChakraNextLink>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={{ base: 6, sm: 10 }}>
        <Flex
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: 'gray.50',
            flexGrow: 1,
            ml: 4,
          }}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: 'gray.50',
            flexGrow: 1,
            mr: 4,
          }}
          align="center"
        >
          <NextImage alt="Logo White" height={50} src="logo-white.svg" width={50} />
        </Flex>
        <Text
          color="gray.50"
          fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
          pt={{ base: 2, sm: 6 }}
          textAlign="center"
        >
          © {currentYear} Paweł Wojtasiński. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};
