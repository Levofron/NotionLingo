import { Children } from 'react';

import { TextUnderline } from '@presentation/atoms';

export const mapColumnNamesToComponents = (strings: string[]) => {
  const { length } = strings;

  return Children.toArray(
    strings.map((name, index) => (
      <>
        <TextUnderline key={name}>{name}</TextUnderline>
        {index === length - 1 ? '.' : ', '}
      </>
    )),
  );
};
