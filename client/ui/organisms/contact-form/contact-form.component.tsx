import { useFormik } from 'formik';

import { Box, Button, Card, Flex, Heading, VStack } from '@ui/atoms';
import { InputControl, TextareaControl } from '@ui/molecules';

import { useSendContactFormData } from '@adapter/hooks';
import { localStorageModule } from '@adapter/modules';

import { useToast } from '@infrastructure/hooks';

import { contactFormValidationSchema } from './contact-form.defaults';

const LAST_CONTACT_FORM_SUBMISSION_KEY = 'lastContactFormSubmission';

export const ContactForm = (): JSX.Element => {
  const toast = useToast();

  const { isSendContactFormDataLoading, resetSendContactFormData, sendContactFormData } =
    useSendContactFormData();

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

      sendContactFormData(_values)
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
    <Flex align="center" bg="gray.900" justify="center">
      <Box m={{ base: 5, md: 16, lg: 10 }} p={{ base: 5, lg: 16 }}>
        <VStack spacing={{ base: 4, md: 8, lg: 20 }}>
          <Heading color="gray.50" fontSize={{ base: '3xl', sm: '4xl' }}>
            Get in Touch
          </Heading>
          <Card minW={{ base: '300px', md: '350px' }} mode="light" p={{ base: 4, sm: 6, md: 8 }}>
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
        </VStack>
      </Box>
    </Flex>
  );
};
