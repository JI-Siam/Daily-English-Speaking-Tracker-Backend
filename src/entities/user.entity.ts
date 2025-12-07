import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "./post.entity";
import { CreateDateColumn } from "typeorm";

@Entity('user')
export class UserEntity{
    @PrimaryGeneratedColumn()
    userId : number

    @Column({unique:true})
    email : string 

    @Column()
    password : string

    
    @CreateDateColumn()
    created_at : Date

    @OneToMany(()=> PostEntity, (posts) => posts.user )
    posts : PostEntity[]

}