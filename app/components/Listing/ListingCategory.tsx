"use client";
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    icon : IconType,
    label : string,
    description : string
}

export default function ListingCategory({
    icon : Icon,
    label,
    description
}: Props) {
  return (
    <div
    className='flex flex-col gap-4'
    >
   <div className="flex flex-row items-center gap-4">
    <Icon size={40} className='text-neutral-600' />
    <div className="flex flex-col">
        <div className="text-lg font-semibold">
            {label}
        </div>
        <div className="text-neutral-500 font-light">
            {description}
        </div>
    </div>
   </div>

    </div>
  )
}