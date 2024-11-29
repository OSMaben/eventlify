import {Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()

export class ErrorHandler implements NestMiddleware
{
    use(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () =>
        {
            console.log(`[${req.method}] ${req.originalUrl} - ${res.statusCode}`);
        })


        try {
            next()
        }catch (err)
        {
            console.error('there was a problem', err);

            res.status(err.status || 500).json({
                statusCode: err.status || 500,
                message: err.message || 'Internal Server Error',
            })
        }
    }

}