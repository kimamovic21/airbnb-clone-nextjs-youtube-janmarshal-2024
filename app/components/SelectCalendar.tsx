'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const SelectCalender = () => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <DateRange
      date={new Date()}
      showDateDisplay={false}
      rangeColors={['#FF5A5F']}
      ranges={state}
      onChange={(item) => setState([item.selection] as any)}
      minDate={new Date()}
    />
  );
};

export default SelectCalender;