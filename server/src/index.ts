import "reflect-metadata";
import "dotenv-safe/config";
import { COOKIE_NAME, __prod__ } from "./constants";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import Redis from "ioredis";
import { Request, Response } from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createConnection } from "typeorm";
import path from "path";
import { UserResolver } from "./resolvers/user";
import { User } from "./entities/User";
import { Product } from "./entities/Product";
import { Review } from "./entities/Review";
import { ProductResolver } from "./resolvers/product";
import { ReviewResolver } from "./resolvers/review";
import { Notification } from "./entities/Notification";
import productUpload from "./resolvers/upload/product";
import profileUpload from "./resolvers/upload/profile";

// rerun
const main = async () => {
    const conn = await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        logging: true,
        migrations: [path.join(__dirname, "./migrations/*")],
        synchronize: true, // set to false, when wiping the data (i.e. await Post.delete({}); )
        entities: [User, Product, Review, Notification],
    });
    conn.runMigrations();
    const app = express();
    app.use("/images", express.static(path.join(__dirname, "../images/")));

    const RedisStore = connectRedis(session);
    const redis = new Redis(process.env.REDIS_URL);

    app.use(
        cors({
            origin: process.env.WEBSITE_URL,
            credentials: true,
        })
    );
    app.use(express.json());
    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: "lax",
                secure: __prod__, // cookie only works in https (turn this off if not using https in production)
                domain: __prod__ ? ".vercel.app" : undefined,
            },
            saveUninitialized: false,
            secret: process.env.SESSION_SECRET,
            resave: false,
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver, ProductResolver, ReviewResolver],
            validate: false,
        }),
        context: ({ req, res }: { req: Request; res: Response }) => ({
            req,
            res,
            redis,
        }),
    });

    apolloServer.applyMiddleware({
        app,
        cors: false,
    });

    app.use("/", productUpload);
    app.use("/", profileUpload);

    app.listen(parseInt(process.env.PORT), () => {
        console.log("🚀 Server started on localhost:4000");
    });
};

main().catch((err) => {
    console.error(err);
});
