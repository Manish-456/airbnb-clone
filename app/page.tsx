import getCurrentUser from "./actions/getCurrentUser";
import { IListingsParams, getListings } from "./actions/getListings";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/Listing/ListingCard";

interface HomeProps {
  searchParams : IListingsParams
}
export const dynamic = 'force-dynamic'

export default async function Home({searchParams} : HomeProps) {
   const listings = await getListings(searchParams);
   const currentUser = await getCurrentUser();
  if(listings?.length === 0){
    return <EmptyState showReset />
  }
  return (
    <Container>
      <div
        className="
    grid
    grid-cols-1
    sm:grid-cols-2
    md:grid-cols-3
    lg:grid-cols-4
    xl:grid-cols-5
    2xl:grid-cols-6
    pt-[7rem]
    z-0
    gap-8
    " >
      
      {
        listings?.map((listing : any) => {
          return (
           <>
           <ListingCard 
           key={listing?.id}
           currentUser={currentUser}
           data={listing}
           />
           </>
          )
        })
      }
          </div>
    </Container>
  );
}
