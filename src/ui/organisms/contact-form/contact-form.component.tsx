import { useClipboard } from '@chakra-ui/react';
import { FC } from 'react';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import {
  Box,
  Button,
  ChakraNextLink,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
  VStack,
} from '@ui/atoms';
import { InputControl } from '@ui/molecules';
import { TextareaControl } from '@ui/molecules/textarea-control/textarea-control.component';

import { CONFETTI_LIGHT, GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from '@constants';

import { IContactFormProps } from './contact-form.types';

export const ContactForm: FC<IContactFormProps> = ({ email, fullName }): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard('pawel.wojtasinski.1995@gmail.com');

  return (
    <Flex
      align="center"
      bg="gray.100"
      css={{
        backgroundAttachment: 'fixed',
        backgroundImage: CONFETTI_LIGHT,
      }}
      id="contact"
      justify="center"
    >
      <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <Box>
          <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
            <Heading
              fontSize={{
                base: '4xl',
                md: '5xl',
              }}
            >
              Get in Touch
            </Heading>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8, lg: 20 }}>
              <Stack
                align="center"
                direction={{ base: 'row', md: 'column' }}
                justify="space-around"
              >
                <Tooltip
                  hasArrow
                  closeOnClick={false}
                  label={hasCopied ? 'Email Copied!' : 'Copy Email'}
                >
                  <IconButton
                    isRound
                    _hover={{
                      bg: 'red.500',
                      color: 'white',
                    }}
                    aria-label="email"
                    fontSize="3xl"
                    icon={<MdEmail />}
                    size="lg"
                    variant="ghost"
                    onClick={onCopy}
                  />
                </Tooltip>
                <ChakraNextLink href={GITHUB_LINK} rel="noreferrer" target="_blank">
                  <IconButton
                    isRound
                    _hover={{
                      bg: 'red.500',
                      color: 'white',
                    }}
                    aria-label="github"
                    fontSize="3xl"
                    icon={<BsGithub />}
                    size="lg"
                    variant="ghost"
                  />
                </ChakraNextLink>
                <ChakraNextLink href={TWITTER_LINK} rel="noreferrer" target="_blank">
                  <IconButton
                    isRound
                    _hover={{
                      bg: 'red.500',
                      color: 'white',
                    }}
                    aria-label="twitter"
                    icon={<BsTwitter size="28px" />}
                    size="lg"
                    variant="ghost"
                  />
                </ChakraNextLink>
                <ChakraNextLink href={LINKEDIN_LINK} rel="noreferrer" target="_blank">
                  <IconButton
                    isRound
                    _hover={{
                      bg: 'red.500',
                      color: 'white',
                    }}
                    aria-label="linkedin"
                    icon={<BsLinkedin size="28px" />}
                    size="lg"
                    variant="ghost"
                  />
                </ChakraNextLink>
              </Stack>
              <Box bg="white" borderRadius="lg" color="gray.700" p={8} shadow="base">
                <VStack spacing={5}>
                  <InputControl
                    isRequired
                    label="Name"
                    name="name"
                    placeholder="Your Name"
                    value={fullName}
                  />
                  <InputControl
                    isRequired
                    label="Email"
                    name="email"
                    placeholder="Your Email"
                    type="email"
                    value={email}
                  />
                  <TextareaControl
                    isRequired
                    label="Message"
                    name="message"
                    placeholder="Your Message"
                    resize="none"
                    rows={6}
                  />
                  <Button
                    _hover={{
                      bg: 'red.500',
                    }}
                    bg="red.400"
                    color="white"
                    colorScheme="red"
                    width="full"
                  >
                    Send Message
                  </Button>
                </VStack>
              </Box>
            </Stack>
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
};
