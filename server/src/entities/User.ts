import { Field, ObjectType } from "type-graphql";
import {
    Column,
    CreateDateColumn,
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    OneToMany,
} from "typeorm";
import { Notification } from "./Notification";
import { Product } from "./Product";
import { Review } from "./Review";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    name!: string;

    @Field()
    @Column({ default: "light" })
    theme!: string;

    @Field()
    @Column({
        default:
            "https://images.unsplash.com/photo-1611794501034-13369f948303?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
    })
    avatarUrl: string;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Field()
    @Column({ default: "building the next unicorn startup" })
    bio: string;

    @Field()
    @Column({ unique: true })
    username: string;

    @Field(() => [Product])
    @OneToMany(() => Product, (product) => product.creator)
    products: Product[];

    @Field(() => [Notification])
    @OneToMany(() => Notification, (notif) => notif.user)
    notifications: Notification[];

    @Field(() => [Review])
    @OneToMany(() => Review, (review) => review.creator)
    reviews: Review[];

    @Column()
    password!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
