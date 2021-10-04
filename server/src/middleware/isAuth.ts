import { MiddlewareFn } from "type-graphql";
import { Context } from "../types";
import { Request } from "express";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error("not authenticated");
    }

    return next();
};

export const expressIsAuth = (req: Request, _res: any, next: any) => {
    console.log("req.sessions ::", req.session);

    if (!req.session.userId) {
        throw new Error("not authenticated");
    }
    return next();
};
