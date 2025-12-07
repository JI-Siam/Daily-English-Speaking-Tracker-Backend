import { Max, Min } from "class-validator";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('post')
export class PostEntity{
    
    @PrimaryGeneratedColumn()
    postId : number 

    @Column({nullable:false})
    title : string 

    @Column({nullable: false})
    description : string

    @Column()
    @Min(1)
    @Max(5)
    fluency_rating : number 

    @Column()
    @Min(1)
    @Max(5)
    vocab_rating : number  

    @Column()
    @Min(1)
    @Max(5)
    grammer_rating : number 
    
    @Column() 
    @Min(1)
    @Max(5)
    confidence_rating : number 

    @CreateDateColumn()
    created_at : Date 

    @ManyToOne(()=> UserEntity, (user) => user.posts)
    @JoinColumn()
    user : UserEntity

}