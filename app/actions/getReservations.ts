import prisma from '@/app/libs/prismadb.';

interface IParams {
    listingId? : string,
    userId? : string,
    authorId? : string
}

export default async function getReservations({
    listingId,
    userId,
    authorId
} : IParams) {
    const query : any = {};
try {
    if(listingId){
        query.listingId = listingId
     }
     if(userId){
        query.userId = userId
     }
     if(authorId){
        query.listing = {
            userId : authorId
        }
     }
    
     const reservations = await prisma?.reservation.findMany({
        where : query,
        include : {
            listing : true
        },
        orderBy : {createdAt : 'desc'}
     })
     const safeReservations = reservations?.map(reservation => ({
        ...reservation,
        createdAt : reservation.createdAt.toISOString(),
        startDate : reservation.startDate.toISOString(),
        endDate : reservation?.endDate.toISOString(),
        listing : {
            ...reservation?.listing,
            createdAt : reservation?.listing?.createdAt.toISOString()
        }
     }))
    return safeReservations;
} catch (error : any) {
    console.log(error)
    throw new Error(error);
}
}
