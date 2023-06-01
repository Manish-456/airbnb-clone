import React from 'react'
import { SafeListing, SafeUser } from '../types'
import Container from '../components/Container'
import Heading from '../components/Heading'
import ListingCard from '../components/Listing/ListingCard'

type Props = {
    listings : SafeListing[],
    currentUser : SafeUser | null
}

export default function FavoriteClient({
    listings,
    currentUser
}: Props) {
  return (
   <Container>
    <Heading 
     title='Favorites'
     subtitle='List of places you have favorited!'
    />
    <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-6 gap-8">
        {
            listings?.map((listing) => <ListingCard
            key={listing.id}
            currentUser={currentUser}
            data={listing}
            />)
        }
    </div>
   </Container>
  )
}