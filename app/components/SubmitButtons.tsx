'use client';

import { useFormStatus } from 'react-dom';
import { Heart, Loader2 } from 'lucide-react';
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

export const AddToFavoriteButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          disabled
          className='bg-primary-foreground'
        >
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          type='submit'
        >
          <Heart className='w-4 h-4' />
        </Button>
      )}
    </>
  );
};

export const DeleteFromFavoriteButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant='outline'
          size='icon'
          disabled
          className='bg-primary-foreground'
        >
          <Loader2 className='h-4 w-4 animate-spin text-primary' />
        </Button>
      ) : (
        <Button
          variant='outline'
          size='icon'
          className='bg-primary-foreground'
          type='submit'
        >
          <Heart className='w-4 h-4 text-primary' fill='#E21C49' />
        </Button>
      )}
    </>
  );
};

export const ReservationSubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button className='w-full' disabled>
          <Loader2 className='w-4 h-4 animate-spin mr-2' />
          <span>Please wait...</span>
        </Button>
      ) : (
        <Button className='w-full' type='submit'>
          Make a Reservation!
        </Button>
      )}
    </>
  );
};