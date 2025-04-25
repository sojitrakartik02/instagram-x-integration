import { Logger } from "../utils/logger";
import { Service } from "typedi";
import dotenv from "dotenv";
import { TwitterApi, TwitterApiReadWrite } from "twitter-api-v2";

dotenv.config();


@Service()
export class xComService {
    public client: TwitterApi;
    public rwClient: TwitterApiReadWrite;

    constructor() {
        this.client = new TwitterApi({
            appKey: process.env.TWITTER_API_KEY!,
            appSecret: process.env.TWITTER_API_SECRET_KEY!,
            accessToken: process.env.TWITTER_ACCESS_TOKEN!,
            accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
        });

        this.rwClient = this.client.readWrite;
    }



    public async fetchUserTweets(username: string, maxResults: number = 5) {
        try {

            const user = await this.rwClient.v2.userByUsername(username);
            console.log("User details:", user);


            const tweets = await this.rwClient.v2.userTimeline(user.data.id, { max_results: maxResults });
            console.log(tweets)
            return {
                userDetails: user.data,
                tweets: tweets.data,
                meta: tweets.meta  
            };
        } catch (error: any) {
            if (error.code === 429) {
                const resetTime = error.response?.headers['x-rate-limit-reset'];
                const retryAfter = (resetTime - Math.floor(Date.now() / 1000)) * 1000;
                console.log(`Rate limit exceeded. Retrying after ${retryAfter / 1000} seconds.`);
                setTimeout(() => {
                    this.fetchUserTweets(username, maxResults);
                }, retryAfter);
            } else {
                console.error("Error fetching tweets:", error.message);
                throw new Error("Failed to fetch tweets.");
            }
        }

    }

    public async postTweet(summarizedCaption: string, imageUrl: string | null = null) {
        try {
            let mediaId: string | null | undefined = undefined;
            if (imageUrl) {
                mediaId = await this.uploadMedia(imageUrl);
            }

            const tweetParams: any = { text: summarizedCaption };
            if (mediaId) {
                tweetParams.media = { media_ids: [mediaId] };
            }

            const response = await this.rwClient.v2.tweet(tweetParams);
            const userDetails = await this.rwClient.v2.me();
            console.log("userDetails.data.username", userDetails.data.username);
            console.log("Tweet posted successfully:", response);

            return response;
        } catch (error: any) {
            Logger.error("Error posting tweet to X.com:", error);
            throw new Error("Failed to post tweet.");
        }
    }

    private async uploadMedia(imageUrl: string): Promise<string | null> {
        try {
            const imageResponse = await fetch(imageUrl);
            const buffer = await imageResponse.arrayBuffer();

            const mediaId = await this.rwClient.v1.uploadMedia(Buffer.from(buffer), { type: 'image/jpeg' });
            return mediaId;
        } catch (error: any) {
            Logger.error("Error uploading media to Twitter:", error);
            return null;
        }
    }
}
