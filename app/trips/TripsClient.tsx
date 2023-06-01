"use client"; 

import { SafeReservation, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listing/ListingCard';

type Props = {
    reservations : SafeReservation[] | null | undefined,
    currentUser? : SafeUser | null
}

export default function TripsClient({
    reservations,
    currentUser
}: Props) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    
    const onCancel = useCallback((id : string) => {
      setDeletingId(id);
      axios.delete(`/api/reservations/${id}`).then(() => {
        toast.success("Reservation Cancelled");
        router.refresh();
      }).catch((error) => {
        toast.error(error?.response?.data?.error);
      }).finally(() => {
        setDeletingId("");
      })
    }, [router]);
  return (
  <Container >
    <Heading 
    title='Trips'
    subtitle={`Where you've been and where you're going`}

    />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
      {
reservations?.map(reservation => <ListingCard
   key={reservation.id}
   data={reservation.listing}
   reservation={reservation}
   actionId={reservation.id}
   onAction={onCancel}
   disabled={deletingId === reservation.id}
   actionLabel='Cancel Reservation'
   currentUser={currentUser}



   />)
      }

    </div>
  </Container>
  )
}