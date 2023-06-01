import prisma from '../libs/prismadb.';

export interface IListingsParams {
    userId?: string,
    guestCount?: number,
    roomCount?: number,
    bathroomCount?: number,
    startDate?: string,
    endDate?: string,
    locationValue?: string,
    category?: string
}

export async function getListings(
    params? : IListingsParams,

) {
    try {
        const {
            userId,
            roomCount,
            bathroomCount,
            guestCount,
            startDate,
            endDate,
            locationValue,
            category

        } = params!;
        let query: any = {};
        if (userId) {
            query.userId = userId;
        }
        if(category){
         query.category = category;
        }

        if(roomCount){
            query.roomCount = {
                gte : +roomCount
            }
        }
        if(bathroomCount){
            query.bathroomCount = {
                gte : +bathroomCount
            }

        }
    if(guestCount){
        query.guestCount = {
            gte : +guestCount
        }
    }
    if(startDate && endDate){
        query.NOT = {
            reservation : {
                some : {
                    OR : [{
                        endDate : {gte : startDate},
                        startDate : {lte : startDate}
                    },{
                        startDate : {lte : endDate},
                        endDate : {gte : endDate}
                    }]
                }
            }
        }
    }

   

    if(locationValue){
        query.locationValue = locationValue
    }
        const listings = await prisma ?.listing ?.findMany({
            where: query,
            orderBy: {

                createdAt: 'desc'
            }
        }) 
     return listings.map(listing => ({
            ...listing,
            createdAt: listing.createdAt.toISOString()
        }));
    } catch (error) {
        console.log(error);
    }

}