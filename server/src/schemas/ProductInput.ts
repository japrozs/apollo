import { Field, InputType } from "type-graphql";

@InputType()
export class ProductInput {
    @Field()
    name: string;

    @Field()
    tagLine: string;

    @Field()
    description: string;
}
