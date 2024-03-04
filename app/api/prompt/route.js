import { ConnectToDB } from "@utils/database"
import Prompt from "@models/prompt"

export const GET = async (req) => {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');

    try {
        await ConnectToDB();

        let prompts = [];
        
        if (!search) {
            prompts = await Prompt.find({}).populate("creator");
        }
        else {
            const regex = new RegExp(search, "gi");

            prompts = await Prompt.aggregate()
            .lookup({
                from: "users",
                localField: "creator",
                foreignField: "_id",
                as: "creator"
            })
            .unwind({
                path: "$creator",
                preserveNullAndEmptyArrays: true
            })
            .match({
                $or: [
                    {
                        tag: { $regex: regex }
                    },
                    {
                        prompt: { $regex: regex }
                    },
                    {
                        'creator.username': { $regex: regex }
                    },
                    {
                        'creator.email': { $regex: regex }
                    }
                ]
            })
        }

        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch (error) {
        console.log("error", error)
        return new Response("Failed to fetch all prompts", {
            status: 500
        })
    }
}