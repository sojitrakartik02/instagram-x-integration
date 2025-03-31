import { Request, Response } from "express";
import { instagramService } from "../services/instagram.service";
import { summarizationService } from "../services/summarization.service";
import { xComService } from "../services/xCom.service";
import Container from "typedi";


export class instagramCOntroller {
    public instagramService = Container.get(instagramService)
    public summarizeService = Container.get(summarizationService)
    public xcomService = Container.get(xComService)

    
    public handleInstagramData = async (req: Request, res: Response) => {
        const { username } = req.params;

        try {
            const instagramData = await this.instagramService.fetchInstagramData(username);

            const summarizedCaption = await this.summarizeService.summarizeCaption(instagramData.caption);

            const tweetResponse = await this.xcomService.postTweet(summarizedCaption, instagramData.imageUrl);

            res.json({
                message: "Tweet posted successfully",
                tweetResponse,
            });
        } catch (error) {
            res.status(500).json({ message: error });
        }
    };

}