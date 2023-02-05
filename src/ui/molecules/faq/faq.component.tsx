import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Heading,
  Text,
} from '@ui/atoms';

import { QUESTIONS_AND_ANSWERS } from './faq.defaults';

export const Faq = (): JSX.Element => (
  <Box bg="gray.50">
    <Container maxW="3xl" py={{ base: 14, sm: 20, md: 32 }}>
      <Heading
        color="gray.900"
        fontSize={{
          base: '4xl',
          md: '5xl',
        }}
        mb={{ base: 14, sm: 16 }}
        textAlign="center"
      >
        Frequently asked questions
      </Heading>
      <Accordion
        allowToggle
        borderBottomWidth={1}
        borderColor="gray.900"
        borderTopWidth={1}
        defaultIndex={2}
      >
        {QUESTIONS_AND_ANSWERS.map(({ answer, question }) => (
          <AccordionItem
            key={question}
            borderBottomWidth={1}
            borderColor="gray.900"
            borderTopWidth={1}
          >
            <AccordionButton justifyContent="space-between" py={{ base: 4, sm: 6 }} width="100%">
              <Heading color="gray.900" textAlign="left">
                {question}
              </Heading>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <Text withBalancer>{answer}</Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  </Box>
);
