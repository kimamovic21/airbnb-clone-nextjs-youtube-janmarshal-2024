import { unstable_noStore as noStore } from 'next/cache';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { createReservation } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ReservationSubmitButton } from '@/app/components/SubmitButtons';
import prisma from '@/app/lib/db';
import CategoryShowcase from '@/app/components/CategoryShowcase';
import HomeMap from '@/app/components/HomeMap';
import SelectCalendar from '@/app/components/SelectCalendar';
import Image from 'next/image';
import Link from 'next/link';
import CountryDisplay from '@/app/components/CountryDisplay';

async function getData(homeId: string) {
  noStore();

  const data = await prisma.home.findUnique({
    where: { id: homeId },
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
      Reservation: {
        where: { homeId },
      },
      User: {
        select: {
          profileImage: true,
          firstName: true,
        },
      },
    },
  });

  return data;
}

const RentalDetailsPage = async ({ params }: { params: { id: string } }) => {
  const data = await getData(params.id);
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div className='w-[75%] mx-auto mt-10 mb-12'>
      <h2 className='font-medium text-2xl mb-5'>{data?.title}</h2>

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
          <CountryDisplay countryCode={data?.country as string} />

          <div className='flex gap-x-2 text-muted-foreground mt-2'>
            <p>
              <span className='mr-1'>{data?.guests}</span>Guests
            </p>
            <span>*</span>
            <p>
              <span className='mr-1'>{data?.bedrooms}</span>Bedrooms
            </p>
            <span>*</span>
            <p>
              <span className='mr-1'>{data?.bathrooms}</span>Bathrooms
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
                Hosted by <span>{data?.User?.firstName}</span>
              </h3>
            </div>
          </div>

          <Separator className='my-7' />
          <CategoryShowcase categoryName={data?.categoryName as string} />
          <Separator className='my-7' />
          <p className='text-muted-foreground'>{data?.description}</p>
          <Separator className='my-7' />
          <HomeMap locationValue={data?.country as string} />
        </div>

        <form action={createReservation}>
          <input type='hidden' name='homeId' value={params.id} />
          <input type='hidden' name='userId' value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <ReservationSubmitButton />
          ) : (
            <Button className='w-full' asChild>
              <Link href='/api/auth/login'>Make a Reservation</Link>
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default RentalDetailsPage;