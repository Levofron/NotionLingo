import NextImage from 'next/image';

import { Card, ChakraNextLink, Container, Flex, Heading, Text } from '@ui/atoms';
import { ParticlesBackgroundLayout } from '@ui/molecules';

import { BUY_ME_A_COFFEE_LINK, PAYPAL_LINK } from '@config/constants';

export const DonateTemplate = (): JSX.Element => (
  <ParticlesBackgroundLayout height="100%">
    <Container height="100%" maxW="6xl" position="relative" pt={{ base: 58, sm: 66, md: 74 }}>
      <Flex alignItems="center" height="100%" justifyContent="center">
        <Card maxW="400px" p={{ base: 2, sm: 3, md: 4 }}>
          <Heading fontSize="2xl" mb={2}>
            Donations
          </Heading>
          <Text withBalancer color="gray.900" mb={4}>
            This service is available for free and will be also in the future. If you use and
            appreciate this service, please consider supporting this project financially.
          </Text>
          <Heading fontSize="2xl" mb={2}>
            Buy Me a Coffee
          </Heading>
          <Text withBalancer color="gray.900" mb={4}>
            To us Buy Me a Coffee, click on the <b>Buy Me a Coffee</b> button below.
          </Text>
          <Heading fontSize="2xl" mb={2}>
            Paypal
          </Heading>
          <Text withBalancer color="gray.900" mb={{ base: 5, sm: 8 }}>
            To use PayPal, click on the <b>PayPal</b> button below.
          </Text>
          <Flex
            alignItems="center"
            flexDirection={{ base: 'column', sm: 'row' }}
            gap={{ base: 3, sm: 0 }}
            justifyContent="space-around"
            mb={4}
          >
            <ChakraNextLink href={BUY_ME_A_COFFEE_LINK} target="_blank">
              <NextImage
                alt="Buy Me A Coffee"
                height={40}
                src="https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg"
                width={142.47}
              />
            </ChakraNextLink>
            <ChakraNextLink href={PAYPAL_LINK} target="_blank">
              <NextImage
                alt="PayPal"
                height={40}
                src="https://www.paypalobjects.com/paypal-ui/logos/svg/paypal-color.svg"
                style={{ borderRadius: '6px' }}
                width={142.47}
              />
            </ChakraNextLink>
          </Flex>
          <Text color="gray.900" fontWeight="bold" textAlign="center">
            I appreciate your support!
          </Text>
        </Card>
      </Flex>
    </Container>
  </ParticlesBackgroundLayout>
);
