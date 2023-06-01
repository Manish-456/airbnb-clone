"use client";

import React from "react";
import { SafeUser } from "../types";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../hooks/useFavorite";


interface Props {
  listingId: string;
  currentUser: SafeUser | null | undefined;
}

export default function HeartButton({ listingId, currentUser }: Props) {
  const {hasFavorited, toggleFavorite} = useFavorite({
    listingId,
    currentUser
  })
  
  return <div
  onClick={toggleFavorite}
  className="
  relative
  hover:opacity-80
  transition
  cursor-pointer
  "
  >
    <AiOutlineHeart 
    size={28}
    className="
    fill-white
    absolute
    -top-[1px]
    -right-[0px]
    "
    />
    <AiFillHeart
    size={28}
    className={`
    ${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
    `}
    />

  </div>;
}
