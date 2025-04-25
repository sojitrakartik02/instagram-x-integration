import { Router } from 'express';
import { instagramController } from '../controllers/instagram.controller';


export class InstagramRoute {
    public router = Router();
    public path = '/instagram';
    public instagramController = new instagramController();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.get(`${this.path}/fetch-post/:username`, this.instagramController.handleTweeterData);
        this.router.post(`${this.path}/post-tweet`, this.instagramController.postTweet);
    }
}
