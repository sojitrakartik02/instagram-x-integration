import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { connectDatabase } from './config/db';
import { Logger } from "./utils/logger";
import { Routes } from "./interfaces/route.interface";
import { ErrorMiddlwar } from "./middlewares/error.middleware";
import cors from 'cors';
import helmet from 'helmet'
import compression from 'compression';
import cookieParser from 'cookie-parser';

dotenv.config();

export class App {
    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.env = process.env.NODE_ENV || 'development';
        this.port = process.env.PORT || 3020;
        this.app.set('port', this.port);
        this.setupMiddleware();
        this.initializeRoutes(routes);
        this.Database();
        this.initializeErrorHandling();
    }

    private setupMiddleware(): void {
        this.app.use(cors({ origin: "*", credentials: true, methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.disable('x-powered-by');
    }

    public async listen() {
        await new Promise((resolve, reject) => {
            this.app.listen(this.port, () => {
                console.log(`==========================================`);
                console.log(`========== ENV: ${this.env} ==============`);
                Logger.info(`=== 🚀 App listening on the port ${this.port} ===`);
                console.log(`==========================================`);
                resolve(true);
            }).on('error', (error) => {
                Logger.error(`Port is already in use`, error);
                reject(error);
            });
        });
    }

    private async Database(): Promise<void> {
        await connectDatabase();
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/api/v1', route.router);
        });

        this.app.get('/ping', (_req, res) => {
            return res.status(200).send('pong');
        });

        this.app.use('*', this.routHandler);
    }

    public initializeErrorHandling() {
        this.app.use(ErrorMiddlwar);
    }

    private routHandler(_req: Request, res: Response) {
        res.status(404).json({ message: 'Route not found' });

    }
}
