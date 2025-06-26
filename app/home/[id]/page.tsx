import { unstable_noStore as noStore } from 'next/cache';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { useCountries } from '@/app/lib/getCountries';
import { Separator } from '@/components/ui/separator';
import prisma from '@/app/lib/db';
import Image from 'next/image';
import CategoryShowcase from '@/app/components/CategoryShowcase';
import HomeMap from '@/app/components/HomeMap';
import SelectCalender from '@/app/components/SelectCalendar';

async function getData(homeId: string) {
  noStore();

  const data = await prisma.home.findUnique({
    where: {
      id: homeId,
    },
    select: {
      photo: true,
      description: true,
      guests: true,
      bedrooms: true,
      bathrooms: true,
      title: true,
      categoryName: true,
      price: true,
      country: true,
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
};

const RentalDetailsPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const data = await getData(params.id);

  const { getCountryByValue } = useCountries();
  const country = getCountryByValue(data?.country as string);

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className='w-[75%] mx-auto mt-10 mb-12'>
      <h2 className='font-medium text-2xl mb-5'>
        {data?.title}
      </h2>

      <div className='relative h-[550px]'>
        <Image
          alt='Image of Home'
          src={`https://erjxtarlruwlidjfujih.supabase.co/storage/v1/object/public/images/${data?.photo}`}
          fill
          className='rounded-lg h-full object-cover w-full'
        />
      </div>

      <div className='flex justify-between gap-x-24 mt-8'>
        <div className='w-2/3'>
          <h3 className='text-xl font-medium'>
            <span className='mr-1'>
              {country?.flag}
            </span>
            <span>{country?.label}</span>
            <span> / </span>
            <span>{country?.region}</span>
          </h3>

          <div className='flex gap-x-2 text-muted-foreground'>
            <p>
              <span className='mr-1'>
                {data?.guests}
              </span>
              <span>Guests</span>
            </p>

            <span>*</span>

            <p>
              <span className='mr-1'>
                {data?.bedrooms}
              </span>
              <span>Bedrooms</span>
            </p>

            <span>*</span>

            <p>
              <span className='mr-1'>
                {data?.bathrooms}
              </span>
              <span>Bathrooms</span>
            </p>
          </div>

          <div className='flex items-center mt-6'>
            <img
              src={
                data?.User?.profileImage ??
                'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg'
              }
              alt='User Profile'
              className='w-11 h-11 rounded-full'
            />

            <div className='flex flex-col ml-4'>
              <h3 className='font-medium'>
                <span className='mr-1'>
                  Hosted by
                </span>
                <span>
                  {data?.User?.firstName}
                </span>
              </h3>
            </div>
          </div>

          <Separator className='my-7' />

          <CategoryShowcase categoryName={data?.categoryName as string} />

          <Separator className='my-7' />

          <p className='text-muted-foreground'>
            {data?.description}
          </p>

          <Separator className='my-7' />

          <HomeMap locationValue={country?.value as string} />
        </div>

        <SelectCalender />
      </div>
    </div>
  );
};

export default RentalDetailsPage;