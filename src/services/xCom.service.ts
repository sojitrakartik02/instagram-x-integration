import axios from "axios";
import { Logger } from "../utils/logger";
import { Service } from "typedi";

@Service()

export class xComService {

    public async postTweet(summarizedCaption: string, imageUrl: string | null = null) {
        try {
            const tweetData = {
                status: summarizedCaption,
                media_url: imageUrl,
            };

            const response = await axios.post("https://api.x.com/1.1/statuses/update.json", tweetData, {
                headers: {
                    "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
                },
            });

            Logger.info("Tweet posted successfully");
            return response.data;
        } catch (error: any) {
            Logger.error("Error posting tweet to X.com: ", error);
            throw new Error("Failed to post tweet.");
        }
    };
}
