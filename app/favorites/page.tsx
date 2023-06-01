import getCurrentUser from "../actions/getCurrentUser"
import getFavoriteListings from "../actions/getFavoriteListings";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";


export default async function FavoritePage() {
   const currentUser = await getCurrentUser();
   const favoriteListings = await getFavoriteListings();
   if(favoriteListings.length === 0){
    return (
        <>
        <EmptyState 
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
        />
        </>
       )
   }
   return (
    <>
    <FavoriteClient
    listings={favoriteListings}
    currentUser={currentUser}
 
    />
    </>
   )

  
}