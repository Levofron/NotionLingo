import { Heading, usePrevious } from '@chakra-ui/react';
import { FC } from 'react';

import { Counter } from '@presentation/atoms';

import { DashboardProfileDetailsProps } from './dashboard-profile-details.types';

export const DashboardProfileDetails: FC<DashboardProfileDetailsProps> = (
  dailyStreakData,
): JSX.Element => {
  const prevDailyStreakData = usePrevious(dailyStreakData);

  return (
    <Heading
      as="h1"
      bottom={{ base: 0, sm: '20px' }}
      fontFamily="monospace"
      fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
      position="absolute"
      textAlign="center"
      width="calc(100% - 2rem)"
    >
      <span>
        Day streak:
        <Counter from={prevDailyStreakData?.daysInStreak || 0} to={dailyStreakData.daysInStreak!} />
      </span>
      <br />
      <span>
        Today words:
        <Counter
          from={prevDailyStreakData?.todayWordsStreak || 0}
          to={dailyStreakData.todayWordsStreak!}
        />
      </span>
    </Heading>
  );
};
