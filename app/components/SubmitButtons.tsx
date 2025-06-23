'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CreationSubmit = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size='lg'>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          <span>Please Wait</span>
        </Button>
      ) : (
        <Button type='submit' size='lg'>
          Next
        </Button>
      )}
    </>
  );
};