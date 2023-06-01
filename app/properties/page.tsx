import { Metadata } from "next";
import getCurrentUser from "../actions/getCurrentUser"
import { getListings } from "../actions/getListings";

import EmptyState from "../components/EmptyState";

import PropertiesClient from "./PropertiesClient";

export const metadata : Metadata = {
    title : "Airbnb-clone || My Properties"
}

export default async function Properties() {
  const currentUser = await getCurrentUser();
  if(!currentUser){
      return (
          <EmptyState 
          title="Unauthorized"
          subtitle="Please login"
          />
      )
  }
  const listings = await getListings({
      userId : currentUser?.id
  });

  if(listings?.length === 0){
      return (
          <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties yet."
          />
      )
  }
  return (
      <PropertiesClient
      listings={listings}
      currentUser={currentUser}
      />
  )
}
