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
import { InputControl, TextareaControl } from '@ui/molecules';

import { useForm } from '@infrastructure/utils';

import { CONFETTI_LIGHT } from '@constants';

import { IContactFormProps } from './contact-form.types';

export const ContactForm: FC<IContactFormProps> = ({ email, fullName }): JSX.Element => {
  const { hasCopied, onCopy } = useClipboard('pawel.wojtasinski.1995@gmail.com');

  const { generateFieldProps, onSubmitWrapper } = useForm({
    initialValues: { email: email || '', name: fullName || '', message: '' },
  });

  const handleSubmit = onSubmitWrapper((values) => {
    console.log(values);
  });

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
                <ChakraNextLink
                  href="https://github.com/playerony"
                  rel="noreferrer"
                  target="_blank"
                >
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
                <ChakraNextLink
                  href="https://twitter.com/wojtasinskipawe"
                  rel="noreferrer"
                  target="_blank"
                >
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
                <ChakraNextLink
                  href="https://www.linkedin.com/in/pwojtasinski"
                  rel="noreferrer"
                  target="_blank"
                >
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
                <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                  <InputControl isRequired minLength={3} {...generateFieldProps('name')} />
                  <InputControl
                    isRequired
                    minLength={5}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    type="email"
                    {...generateFieldProps('email')}
                  />
                  <TextareaControl
                    isRequired
                    minLength={10}
                    resize="none"
                    rows={6}
                    {...generateFieldProps('message')}
                  />
                  <Button
                    _hover={{
                      bg: 'red.500',
                    }}
                    bg="red.400"
                    color="white"
                    colorScheme="red"
                    type="submit"
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
