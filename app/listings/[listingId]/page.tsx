import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";


type Props = {
  listingId?: string;
};

export async function generateMetadata({ params }: { params: Props }) {

  const listing = await getListingById(params);
  if(!listing){
    return {
      title : 'Page not found'
    }
  }
  return {
    title : `Airbnb-clone || ${listing?.title}`
  }
}

export default async function page({ params }: { params: Props }) {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservations(params);

  if (!listing) {
    return <EmptyState />;
  }
  return (
    <div>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
  );
}


