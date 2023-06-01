import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb.';
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(
    request : Request
){
    const currentUser = await getCurrentUser();
    if(!currentUser) return NextResponse.error();

    const body = await request.json();

    const {
        startDate,
        endDate,
        totalPrice,
        listingId
    } = body;

    if(!listingId || !endDate || !startDate || !totalPrice){
        return NextResponse.error();
    }
    const listingAndReservation = await prisma.listing?.update({
        where : {
            id : listingId
        },
        data : {
            reservation : {
                create : {
                    userId : currentUser.id,
                    startDate , 
                    endDate,
                    totalPrice
                }
            }
        }
    })
    return NextResponse.json(listingAndReservation, {
        status : 201
    })
}