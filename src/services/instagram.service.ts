import axios from "axios";
import { Logger } from "../utils/logger";
import { Service } from "typedi";


@Service()
export class instagramService {

    public async fetchInstagramData(username: string) {
        try {
            const response = await axios.get(`https://api.instagram.com/v1/users/${username}/media/recent`);
            const latestPost = response.data.data[0];

            const caption = latestPost.caption.text;
            const imageUrl = latestPost.images.standard_resolution.url;

            return {
                caption,
                imageUrl,
            };
        } catch (error: any) {
            Logger.error("Error fetching Instagram data: ", error);
            throw new Error("Failed to fetch Instagram data.");
        }
    };

}