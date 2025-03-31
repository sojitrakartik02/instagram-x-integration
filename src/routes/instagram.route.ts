import { Router } from 'express';
import { instagramCOntroller } from '../controllers/instagram.controller';


export class InstagramRoute {
    public router = Router();
    public path = '/instagram';
    public instagramCOntroller = new instagramCOntroller();
    constructor() {
        this.initializeRoutes();
    }

    public initializeRoutes() {

        this.router.get(`${this.path}/fetch-post/:username`, this.instagramCOntroller.handleInstagramData);
    }
}
