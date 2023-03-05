import { IoMdAddCircleOutline, IoMdRemoveCircleOutline } from 'react-icons/io';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Container,
  Heading,
  Text,
} from '@ui/atoms';

import { QUESTIONS_AND_ANSWERS } from './faq.defaults';

export const Faq = (): JSX.Element => (
  <Container maxW="3xl" py={{ base: 14, sm: 20, md: 32 }}>
    <Heading
      color="gray.900"
      fontSize={{ base: '3xl', sm: '4xl' }}
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
                pb={{ base: 4, sm: 8 }}
                pt={{ base: 2, sm: 6 }}
                width="100%"
              >
                <Heading
                  color="gray.900"
                  fontSize={{ base: 'md', sm: 'xl' }}
                  textAlign="left"
                  withBalancer={headerBalancer}
                >
                  {question}
                </Heading>
                {isExpanded ? (
                  <IoMdRemoveCircleOutline fontSize="25px" style={{ width: '25px' }} />
                ) : (
                  <IoMdAddCircleOutline fontSize="25px" style={{ width: '25px' }} />
                )}
              </AccordionButton>
              <AccordionPanel pb={{ base: 2, sm: 4 }}>
                <Text withBalancer>{answer}</Text>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      ))}
    </Accordion>
  </Container>
);
