import { categoryItems } from '../lib/categoryItems';
import Image from 'next/image';

const CategoryShowcase = ({
  categoryName
}: {
  categoryName: string
}) => {
  const category = categoryItems?.find((item) => item.name === categoryName);

  return (
    <div className='flex items-center'>
      <Image
        src={category?.imageUrl as string}
        alt='Category image'
        width={44}
        height={44}
      />

      <div className='flex flex-col ml-4'>
        <h3 className='font-medium'>
          {category?.title}
        </h3>
        <p className='text-sm text-muted-foreground'>
          {category?.description}
        </p>
      </div>
    </div>
  );
};

export default CategoryShowcase;