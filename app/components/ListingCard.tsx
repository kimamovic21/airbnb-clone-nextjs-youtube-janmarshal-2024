import { useCountries } from '../lib/getCountries';
import Image from 'next/image';
import Link from 'next/link';

interface iAppProps {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  homeId: string;
};

const ListingCard = ({
  description,
  imagePath,
  location,
  price,
  homeId,
}: iAppProps) => {
  const { getCountryByValue } = useCountries();

  const country = getCountryByValue(location);

  return (
    <div className='flex flex-col'>
      <div className='relative h-72'>
        <Image
          src={`https://glvmmupiqwlmhicmggqp.supabase.co/storage/v1/object/public/images/${encodeURIComponent(imagePath)}`}
          alt='Image of House'
          fill
          className='rounded-lg h-full object-cover'
          sizes='100vw'
          unoptimized
        />

      </div>

      <Link href={`/home/${homeId}`} className='mt-2'>
        <h3 className='font-medium text-base'>
          <span>{country?.flag} </span>
          <span>{country?.label} </span>
          <span> / </span>
          <span>{country?.region}</span>
        </h3>

        <p className='text-muted-foreground text-sm line-clamp-2'>
          {description}
        </p>

        <p className='pt-2 text-muted-foreground'>
          <span className='font-medium text-black mr-1'>
            $ {price}
          </span>
          <span>Night</span>
        </p>
      </Link>
    </div>
  );
};

export default ListingCard;