import type { ReactNode } from 'react';

const LayoutCreation = ({ children }: { children: ReactNode }) => {
  return (
    <div className='mt-10'>
      {children}
    </div>
  );
};

export default LayoutCreation;