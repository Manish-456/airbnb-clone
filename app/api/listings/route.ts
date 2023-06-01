import { NextResponse } from 'next/server'
import prisma from '@/app/libs/prismadb.';
import getCurrentUser from '@/app/actions/getCurrentUser';


export async function POST(
    request: Request
) {
    const currentUser = await getCurrentUser();
    if (!currentUser) return NextResponse.json({
        message: "Invalid user"
    }, {
            status: 400
        });

    const body = await request.json();
    const { title,
        description, 
        imageSrc,
        location,
        category,
        roomCount,
        guestCount,
        bathroomCount,
        price } = body; 

    Object.keys(body).forEach((value: any) => {
        if (!body[value]) return NextResponse.json({
            message: "All fields are required!"
        }, {
                status: 422
            });;
    })

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc,
            locationValue: location.value,
            category,
            roomCount,
            guestCount,
            bathroomCount,
            price: parseInt(price, 10),
            userId: currentUser ?.id
        }
    })
    return NextResponse.json(listing);

}
