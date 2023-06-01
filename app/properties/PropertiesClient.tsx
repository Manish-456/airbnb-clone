"use client"; 

import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/Listing/ListingCard';

type Props = {
    listings : SafeListing[] | null | undefined,
    currentUser? : SafeUser | null
}

export default function PropertiesClient({
    listings,
    currentUser
}: Props) {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState("");
    
    const onCancel = useCallback((id : string) => {
      setDeletingId(id);
      axios.delete(`/api/listings/${id}`).then(() => {
        toast.success("listing deleted");
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
    title='Properties'
    subtitle={`List of your properties`}

    />
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6">
      {
listings?.map(listing => <ListingCard
   key={listing.id}
   data={listing}
  
   actionId={listing.id}
   onAction={onCancel}
   disabled={deletingId === listing.id}
   actionLabel='Delete property'
   currentUser={currentUser}



   />)
      }

    </div>
  </Container>
  )
}