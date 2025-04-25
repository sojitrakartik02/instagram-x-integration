import { NextFunction, Request, Response } from "express";
import { instagramService } from "../services/instagram.service";
import { summarizationService } from "../services/summarization.service";
import { xComService } from "../services/xCom.service";
import Container from "typedi";




export class instagramController {
    public instagramService = Container.get(instagramService)
    public summarizeService = Container.get(summarizationService)
    public xcomService = Container.get(xComService)


    public handleTweeterData = async (req: Request, res: Response, next: NextFunction) => {
        const { username } = req.params;

        try {
            const instagramData = await this.xcomService.fetchUserTweets(username);

            res.json({
                message: "Tweet Fetch successfully",

                instagramData
            });
        } catch (error) {
            next(error)
        }
    };



    public postTweet = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { instagramCaption } = req.body;

            if (!instagramCaption) {
                return res.status(400).json({ error: 'Instagram caption is required.' });
            }

            const summarizedTweet = await this.summarizeService.summarizeCaption(instagramCaption);

            if (summarizedTweet.length > 280) {
                return res.status(400).json({ error: 'Summarized tweet exceeds 280 characters.' });
            }

            const postResponse = await this.xcomService.postTweet(summarizedTweet);

            return res.status(200).json({
                message: 'Tweet posted successfully!',
                tweet: summarizedTweet,
                xComResponse: postResponse,
            });
        } catch (error) {
            next(error)
        }

    }

}