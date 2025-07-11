import { createCategoryPage } from '@/app/actions';
import SelectCategory from '@/app/components/SelectCategory';
import CreationBottomBar from '@/app/components/CreationBottomBar';

const StructurePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div className='w-3/5 mx-auto'>
        <h2 className='text-3xl font-semibold tracking-tight transition-colors'>
          Which of these best describe your home
        </h2>
      </div>

      <form action={createCategoryPage}>
        <input
          type='hidden'
          name='homeId'
          value={params.id}
        />

        <SelectCategory />

        <CreationBottomBar />
      </form>
    </>
  );
};

export default StructurePage;