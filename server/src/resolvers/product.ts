import { Product } from "../entities/Product";
import { isAuth } from "../middleware/isAuth";
import { Context } from "../types";
import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver,
    UseMiddleware,
    Field,
    ObjectType,
} from "type-graphql";
import { ProductInput } from "../schemas/ProductInput";
import { validateProduct } from "../utils/validateProduct";
import { FieldError } from "./user";
import { Notification } from "../entities/Notification";
import { User } from "../entities/User";

@ObjectType()
class ProductResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Product, { nullable: true })
    product?: Product;
}

@Resolver()
export class ProductResolver {
    @Mutation(() => ProductResponse)
    @UseMiddleware(isAuth)
    async createProduct(
        @Arg("options") options: ProductInput,
        @Ctx() { req }: Context
    ) {
        const errors = validateProduct(options);
        if (errors) {
            return { errors };
        }
        const user = await User.findOne({ where: { id: req.session.userId } });
        const product = await Product.create({
            name: options.name,
            tagLine: options.tagLine,
            description: options.description,
            creatorId: req.session.userId,
            suggestions: [],
            tags: [],
        }).save();

        await Notification.create({
            imgUrl: user?.avatarUrl,
            body: `Successfully created ${options.name}`,
            link: `${process.env.WEBSITE_URL}/product/${product.id}`,
            userId: req.session.userId,
        }).save();

        return { product };
    }

    @Query(() => Product)
    async getProduct(@Arg("id", () => Int!) id: number) {
        return Product.findOne({
            where: { id },
            relations: ["reviews", "creator", "reviews.creator"],
        });
    }

    @UseMiddleware(isAuth)
    @Query(() => [Product])
    async getUserProducts(@Ctx() { req }: Context) {
        return Product.find({
            where: { creatorId: req.session.userId },
            relations: ["creator", "reviews", "reviews.creator"],
            order: {
                createdAt: "DESC",
            },
        });
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addProductTags(
        @Arg("tag", () => String) tag: string,
        @Arg("id", () => Int!) id: number,
        @Ctx() { req }: Context
    ) {
        const prod = await Product.findOne(id, { relations: ["creator"] });
        if (prod?.creator.id !== req.session.userId) {
            return false;
        }

        await Product.update(
            { id: prod?.id },
            {
                tags: [...(prod?.tags ? prod?.tags : []), tag],
            }
        );
        return true;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async addProductSuggestions(
        @Arg("suggestion", () => String) suggestion: string,
        @Arg("id", () => Int!) id: number
    ) {
        const prod = await Product.findOne(id);

        await Product.update(
            { id: prod?.id },
            {
                suggestions: [
                    ...(prod?.suggestions ? prod?.suggestions : []),
                    suggestion,
                ],
            }
        );
        return true;
    }

    @Query(() => Product)
    @UseMiddleware(isAuth)
    async topProduct() {
        let max = 0;
        let id = -1;
        const prods = await Product.find({ relations: ["reviews"] });
        prods.forEach((prod) => {
            if (prod.reviews.length > max) {
                max = prod.reviews.length;
                id = prod.id;
            }
        });
        return Product.findOne({
            where: { id },
            relations: ["reviews", "creator", "reviews.creator"],
        });
    }
}
