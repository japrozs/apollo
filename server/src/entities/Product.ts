import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm";
import { Review } from "./Review";
import { User } from "./User";

@ObjectType()
@Entity()
export class Product extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({
        default:
            "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ed6636cdd5d320006caf841%2F0x0.jpg",
    })
    imgUrl: string;

    @Field(() => [String])
    @Column("simple-array", { nullable: true })
    suggestions: string[];

    @Field()
    @Column({ default: "" })
    description: string;

    @Field(() => [String])
    @Column("simple-array", { nullable: true })
    tags: string[];

    @Field()
    @Column({ default: "the app thats going to the moon! 🚀" })
    tagLine: string;

    @Field()
    @Column({ default: "" })
    productUrl: string;

    @Field()
    @Column({ default: 0 })
    rating: number;

    @Field()
    @Column({ default: 0 })
    creatorId: number;

    @Field()
    @Column({ default: false })
    private: boolean;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.products)
    creator: User;

    @Field(() => [Review])
    @OneToMany(() => Review, (review) => review.product)
    reviews: Review[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
