import { Deck, DefaultTemplate, Slide, Heading, Text } from 'spectacle';

const Presentation = () => {
  return (
    <Deck template={<DefaultTemplate />}>
      <Slide>
        <Heading size={1}>Welcome to Spectacle</Heading>
        <Text>Build stunning presentations with React.</Text>
      </Slide>

      <Slide>
        <Heading size={2}>Features</Heading>
        <Text>- Declarative slide creation</Text>
        <Text>- Live demos</Text>
        <Text>- Easy customization</Text>
      </Slide>

      <Slide>
        <Heading size={2}>Features</Heading>
        <Text>- Declarative slide creation</Text>
        <Text>- Live demos</Text>
        <Text>- Easy customization</Text>
      </Slide>
      
      <Slide>
        <Heading size={2}>Features</Heading>
        <Text>- Declarative slide creation</Text>
        <Text>- Live demos</Text>
        <Text>- Easy customization</Text>
      </Slide>
      
      <Slide>
        <Heading size={2}>Features</Heading>
        <Text>- Declarative slide creation</Text>
        <Text>- Live demos</Text>
        <Text>- Easy customization</Text>
      </Slide>
      
      <Slide>
        <Heading size={3}>Let's Begin!</Heading>
      </Slide>
    </Deck>
  );
};

export default Presentation;
