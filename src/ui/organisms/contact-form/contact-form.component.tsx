import { useClipboard } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';
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

import { restModule } from '@adapter/modules';

import { useAxiosAction, useToast } from '@infrastructure/utils';

import { CONTACT_EMAIL, GITHUB_LINK, LINKEDIN_LINK, TWITTER_LINK } from '@constants';

import { contactFormValidationSchema } from './contact-form.defaults';
import { IContactFormProps } from './contact-form.types';

export const ContactForm: FC<IContactFormProps> = ({ email, fullName }): JSX.Element => {
  const toast = useToast();
  const [disableForm, setDisableForm] = useState(false);
  const { hasCopied, onCopy } = useClipboard(CONTACT_EMAIL);

  const {
    isLoading: isSendContactFormDataLoading,
    mutateAsync: mutateAsyncSendContactFormData,
    reset: resetSendContactFormData,
  } = useAxiosAction(restModule.sendContactFormData);

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
      setDisableForm(true);

      mutateAsyncSendContactFormData(_values)
        .then(() =>
          toast.success({
            title: 'Thank you!',
            description: "We'll get back to you soon!",
            onCloseComplete: () => {
              formik.resetForm();
              setDisableForm(false);
            },
          }),
        )
        .catch((_error) => {
          toast.error({
            description: _error,
            onCloseComplete: () => {
              setDisableForm(false);
              resetSendContactFormData();
            },
          });
        });
    },
  });

  useEffect(() => {
    if (email) {
      formik.setFieldValue('email', email, true);
    }

    if (fullName) {
      formik.setFieldValue('fullName', fullName, true);
    }
  }, [email, fullName]);

  const shouldDisableForm = isSendContactFormDataLoading || disableForm;

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
                <Flex flexDirection="column" gap={5}>
                  <InputControl
                    isRequired
                    errorMessage={formik.errors.fullName}
                    isDisabled={shouldDisableForm}
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
                    isDisabled={shouldDisableForm}
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
                    isDisabled={shouldDisableForm}
                    label="Message"
                    mode="light"
                    name="message"
                    resize="none"
                    rows={6}
                    value={formik.values.message}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <Button
                    isDisabled={shouldDisableForm}
                    isLoading={isSendContactFormDataLoading}
                    mode="light"
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
