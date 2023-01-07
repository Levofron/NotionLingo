import { TextUnderline } from '@ui/atoms';

export const mapColumnNamesToComponents = (strings: string[]) => {
  const { length } = strings;

  return strings.map((name, index) => (
    <>
      <TextUnderline key={name}>{name}</TextUnderline>
      {index === length - 1 ? '.' : ', '}
    </>
  ));
};
