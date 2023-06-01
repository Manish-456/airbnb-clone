export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        '/trips',
        '/resevations',
        '/properties',
        '/favorites'

    ]
}