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
import { User } from "./User";

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column()
    imgUrl?: string;

    @Field()
    @Column({ default: "" })
    body: string;

    @Field()
    @Column({ default: false })
    read: boolean;

    @Field()
    @Column()
    link?: string;

    @Field()
    @Column()
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}
