import prisma from '@/app/libs/prismadb.';

interface IProps {
    listingId?: string
}

export default async function getListingById(params: IProps) {
    try {
        const { listingId } = params;

        const listing = await prisma.listing?.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });
        if (!listing) return null;
        const {hashedPassword, ...rest} = listing?.user;

        return {
            ...listing,
            createdAt: listing ?.createdAt ?.toISOString(),
            user: {
                ...rest,
                createdAt: listing ?.user ?.createdAt ?.toISOString(),
                updatedAt: listing ?.user ?.updatedAt ?.toISOString(),
                emailVerified : listing?.user?.emailVerified?.toISOString() || null,
            }
        }
    } catch (error) {


    }
}
