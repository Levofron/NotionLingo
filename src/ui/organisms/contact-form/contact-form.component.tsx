import { useClipboard } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';

import {
  Box,
  Button,
  Card,
  ChakraNextLink,
  Flex,
  Heading,
  IconButton,
  Stack,
  Tooltip,
  VStack,
} from '@ui/atoms';
import { InputControl, TextareaControl } from '@ui/molecules';

import { localStorageModule, restModule } from '@adapter/modules';

import { useAxios, useToast } from '@infrastructure/utils';

import { CONTACT_EMAIL, GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from '@constants';

import { contactFormValidationSchema } from './contact-form.defaults';

const LAST_CONTACT_FORM_SUBMISSION_KEY = 'lastContactFormSubmission';

export const ContactForm = (): JSX.Element => {
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(CONTACT_EMAIL);

  const {
    isLoading: isSendContactFormDataLoading,
    mutateAsync: mutateAsyncSendContactFormData,
    reset: resetSendContactFormData,
  } = useAxios(restModule.sendContactFormData);

  const formik = useFormik({
    initialValues: {
      email: '',
      message: '',
      fullName: '',
    },
    isInitialValid: true,
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: true,
    validationSchema: contactFormValidationSchema,
    onSubmit: (_values) => {
      const lastContactFormSubmission = localStorageModule.getItem(
        LAST_CONTACT_FORM_SUBMISSION_KEY,
      );

      if (lastContactFormSubmission) {
        const lastContactFormSubmissionDate = new Date(
          Number.parseInt(lastContactFormSubmission, 10),
        );
        const currentDate = new Date();

        if (currentDate.getTime() - lastContactFormSubmissionDate.getTime() < 60_000) {
          toast.error({
            title: 'Error',
            duration: 1000,
            description: 'Please wait a minute before sending another request.',
          });

          return;
        }
      }

      mutateAsyncSendContactFormData(_values)
        .then(() =>
          toast.success({
            title: 'Thank you!',
            description: "We'll get back to you soon!",
            onCloseComplete: formik.resetForm,
          }),
        )
        .catch((_error) =>
          toast.error({
            description: _error,
            onCloseComplete: resetSendContactFormData,
          }),
        )
        .finally(() =>
          localStorageModule.setItem({
            key: LAST_CONTACT_FORM_SUBMISSION_KEY,
            value: Date.now().toString(),
          }),
        );
    },
  });

  return (
    <Flex align="center" bg="gray.900" id="contact" justify="center">
      <Box borderRadius="lg" m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
          <Heading
            color="gray.50"
            fontSize={{
              base: '4xl',
              md: '5xl',
            }}
          >
            Get in Touch
          </Heading>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={{ base: 4, md: 8, lg: 20 }}>
            <Stack align="center" direction={{ base: 'row', md: 'column' }} justify="space-around">
              <Tooltip
                hasArrow
                closeOnClick={false}
                label={hasCopied ? 'Email Copied!' : 'Copy Email'}
              >
                <IconButton
                  aria-label="email"
                  fontSize="3xl"
                  icon={<MdEmail />}
                  mode="light"
                  size="lg"
                  onClick={onCopy}
                />
              </Tooltip>
              <ChakraNextLink href={GITHUB_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="github"
                  fontSize="3xl"
                  icon={<BsGithub />}
                  mode="light"
                  size="lg"
                />
              </ChakraNextLink>
              <ChakraNextLink href={TWITTER_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="twitter"
                  icon={<BsTwitter size="28px" />}
                  mode="light"
                  size="lg"
                />
              </ChakraNextLink>
              <ChakraNextLink href={LINKEDIN_LINK} rel="noreferrer" target="_blank">
                <IconButton
                  aria-label="linkedin"
                  icon={<BsLinkedin size="28px" />}
                  mode="light"
                  size="lg"
                />
              </ChakraNextLink>
            </Stack>
            <Card minW={{ base: 'unset', md: '350px' }} mode="light" p={{ base: 4, sm: 6, md: 8 }}>
              <form onSubmit={formik.handleSubmit}>
                <Flex flexDirection="column" gap="3px">
                  <InputControl
                    isRequired
                    errorMessage={formik.errors.fullName}
                    label="Full Name"
                    mode="light"
                    name="fullName"
                    value={formik.values.fullName}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <InputControl
                    isRequired
                    errorMessage={formik.errors.email}
                    label="Email"
                    mode="light"
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <TextareaControl
                    isRequired
                    errorMessage={formik.errors.message}
                    label="Message"
                    mode="light"
                    name="message"
                    resize="none"
                    rows={5}
                    value={formik.values.message}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Button
                    isLoading={isSendContactFormDataLoading}
                    mode="light"
                    mt={2}
                    type="submit"
                    width="full"
                  >
                    Send Message
                  </Button>
                </Flex>
              </form>
            </Card>
          </Stack>
        </VStack>
      </Box>
    </Flex>
  );
};
