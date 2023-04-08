import { Avatar, Box, Container, Flex, Heading, Stack, Text } from '@ui/atoms';

import { TESTIMONIALS } from './testimonials.defaults';

export const Testimonials = (): JSX.Element => (
  <Box bg="gray.100">
    <Container gap={12} maxW="6xl" py={{ base: 14, sm: 20, md: 40 }}>
      <Stack align="center" mb={{ base: 14, sm: 20 }} spacing={0}>
        <Heading as="h3" fontSize={{ base: '3xl', sm: '4xl' }} mb={2}>
          Our Clients Speak
        </Heading>
        <Text color="gray.900">We have been working with clients around the world</Text>
      </Stack>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        gap={{ base: 10, md: 4, lg: 10 }}
        mt={{ base: 8, md: 10 }}
      >
        {TESTIMONIALS.map((_testimonial) => (
          <Box key={_testimonial.heading}>
            <Flex
              _after={{
                content: '""',
                w: 0,
                h: 0,
                borderLeft: 'solid transparent',
                borderLeftWidth: 16,
                borderRight: 'solid transparent',
                borderRightWidth: 16,
                borderTop: 'solid',
                borderTopWidth: 16,
                borderTopColor: 'white',
                pos: 'absolute',
                bottom: '-16px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              align="center"
              bg="white"
              boxShadow="lg"
              flexDirection="column"
              gap={{ base: 2, sm: 3 }}
              p={8}
              position="relative"
              rounded="xl"
            >
              <Heading>{_testimonial.heading}</Heading>
              <Text color="gray.600" fontSize="sm" textAlign="center">
                {_testimonial.description}
              </Text>
            </Flex>
            <Flex align="center" direction="column" mt={8}>
              <Avatar mb={2} src={_testimonial.imageSrc} />
              <Stack align="center" spacing={-1}>
                <Text fontWeight={600}>{_testimonial.name}</Text>
                <Text color="gray.600" fontSize="sm">
                  {_testimonial.position}
                </Text>
              </Stack>
            </Flex>
          </Box>
        ))}
      </Flex>
    </Container>
  </Box>
);
