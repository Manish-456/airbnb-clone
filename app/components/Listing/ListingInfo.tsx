'use client';
import useCountries from '@/app/hooks/useCountries'
import { SafeUser } from '@/app/types'
import React from 'react'
import { IconType } from 'react-icons'
import Avatar from '../Avatar';
import ListingCategory from './ListingCategory';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('../Map'), {
    ssr : false
})

type Props = {
    user : SafeUser,
    description : string,
    roomCount : number,
    bathroomCount : number,
    guestCount : number,
    category : {
        icon : IconType,
        label : string,
        description : string
    } | null,
    locationValue : string
}

export default function ListingInfo({
    user,
    description,
    roomCount,
    bathroomCount,
    guestCount,
    category,
    locationValue
}: Props) {
    const {getByValue} = useCountries();

    const coordinates = getByValue(locationValue)?.latlng;


  return (
    <div className='col-span-4 flex flex-col gap-8'>
   <div className="flex flex-col gap-2">
    <div className="text-xl font-semibold flex gap-4 items-center">
        <div>Hosted by {user?.name}</div>
        <Avatar src={user?.image} />
    </div>
    <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
     <div>{guestCount} guests</div>
     <div>{roomCount} rooms</div>
     <div>{bathroomCount} bathrooms</div>
    </div>
   </div>
    <hr />
    {category && (
        <ListingCategory icon={category?.icon}
        label={category?.label}
        description={category?.description}
        />
    )}
    <hr />
    <div className="text-lg font-light text-neutral-500">
        {description}
    </div>
    <hr />
    <Map center={coordinates} />
    </div>
  )
}