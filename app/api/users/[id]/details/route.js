import User from "@models/user";
import { ConnectToDB } from "@utils/database"

export const GET = async (request, { params }) => {
    try {
        await ConnectToDB();

        const user = await User.findById(params.id);

        if (!user) {
            return new Response("User not found", {
                status: 404
            })
        }

        return new Response(JSON.stringify(user), {
            status: 200
        })

    } catch (error) {
        console.log("error", error)
        return new Response("Failed to fetch user details", {
            status: 500
        })
    }
}