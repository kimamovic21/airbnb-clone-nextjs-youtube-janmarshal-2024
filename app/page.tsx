import { Suspense } from 'react';
import { unstable_noStore as noStore } from "next/cache";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from './lib/db';
import MapFilterItems from './components/MapFilterItems';
import ListingCard from './components/ListingCard';
import NoItems from './components/NoItems';
import SkeletonCard from './components/SkeletonCard';

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  noStore();

  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedLocation: true,
      addedDescription: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });

  return data;
};

const HomePage = async ({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) => {
  return (
    <div className='container mx-auto px-5 lg:px-10'>
      <MapFilterItems />

      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const data = await getData({ searchParams: searchParams, userId: user?.id });

  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description='Please check a other category or create your own listing!'
          title='Sorry no listings found for this category...'
        />
      ) : (
        <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
          {data?.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName='/'
            />
          ))}
        </div>
      )}
    </>
  );
}

const SkeletonLoading = () => {
  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8'>
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
};

export default HomePage;