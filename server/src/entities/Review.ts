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
export class Review extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column({ default: "" })
    body: string;

    @Field()
    @Column()
    creatorId: number;

    @Field()
    @Column()
    productId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.reviews)
    creator: User;

    @Field(() => Product)
    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
