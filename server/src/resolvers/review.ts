import { Review } from "../entities/Review";
import { isAuth } from "../middleware/isAuth";
import { Arg, Ctx, Int, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Context } from "../types";
import { Product } from "../entities/Product";
import { Notification } from "../entities/Notification";
import { User } from "../entities/User";

@Resolver()
export class ReviewResolver {
    @UseMiddleware(isAuth)
    @Mutation(() => Review)
    async createReview(
        @Arg("productId", () => Int!) productId: number,
        @Arg("title") title: string,
        @Arg("body") body: string,
        @Ctx() { req }: Context
    ) {
        const prod = await Product.findOne({
            where: { id: productId },
            relations: ["creator"],
        });
        const user = await User.findOne(req.session.userId);
        await Notification.create({
            imgUrl: user?.avatarUrl,
            body: `New review on product ${prod?.name}`,
            link: `${process.env.WEBSITE_URL}/product/${prod?.id}`,
            userId: prod?.creator.id,
        }).save();

        return Review.create({
            productId,
            title,
            body,
            creatorId: req.session.userId,
        }).save();
    }
}
