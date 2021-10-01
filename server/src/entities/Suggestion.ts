import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@ObjectType()
@Entity()
export class Suggestion extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    feature: string;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    productId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.suggestions)
    creator: User;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.suggestions)
    product: Product;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
