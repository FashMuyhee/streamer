import {useState, useEffect} from 'react';

export type PartOfDay = 'morning' | 'afternoon' | 'evening';

const getPartOfDay = (): PartOfDay => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 6 && hour < 12) {
    return 'morning';
  } else if (hour >= 12 && hour < 17) {
    return 'afternoon';
  } else {
    return 'evening';
  }
};

export const usGetPartOfDay = () => {
  const [partOfDay, setPartOfDay] = useState<PartOfDay>('morning');

  useEffect(() => {
    setPartOfDay(getPartOfDay());
  }, []);

  return partOfDay;
};
