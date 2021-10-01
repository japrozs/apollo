import { Field, InputType } from "type-graphql";

@InputType()
export class UsernamePasswordInput {
    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    username: string;

    @Field()
    password: string;
}
