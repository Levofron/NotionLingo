import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import {
  Accordion,
  AccordionButton,
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
        FAQ
      </Heading>
      <Accordion
        allowToggle
        borderBottomWidth={1}
        borderColor="gray.900"
        borderTopWidth={1}
        defaultIndex={2}
      >
        {QUESTIONS_AND_ANSWERS.map(({ answer, headerBalancer, question }) => (
          <AccordionItem
            key={question}
            borderBottomWidth={1}
            borderColor="gray.900"
            borderTopWidth={1}
          >
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  justifyContent="space-between"
                  pb={{ base: 6, sm: 8 }}
                  pt={{ base: 4, sm: 6 }}
                  width="100%"
                >
                  <Heading
                    color="gray.900"
                    fontSize={{ base: 'md', sm: 'xl', md: '2xl' }}
                    textAlign="left"
                    withBalancer={headerBalancer}
                  >
                    {question}
                  </Heading>
                  {isExpanded ? (
                    <IoMdRemoveCircleOutline fontSize="30px" min="30px" />
                  ) : (
                    <IoMdAddCircleOutline fontSize="30px" min="30px" />
                  )}
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Text withBalancer>{answer}</Text>
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  </Box>
);
