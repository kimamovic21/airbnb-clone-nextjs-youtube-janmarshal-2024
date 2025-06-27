'use client';

import { useCountries } from '@/app/lib/getCountries';

const CountryDisplay = ({ countryCode }: { countryCode: string }) => {
  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(countryCode);

  if (!country) return null;

  return (
    <h3 className='text-xl font-medium'>
      <span className='mr-1'>{country.flag}</span>
      <span>{country.label}</span>
      <span> / </span>
      <span>{country.region}</span>
    </h3>
  );
};

export default CountryDisplay;
