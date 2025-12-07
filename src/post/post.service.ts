import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from 'src/dto/create-post.dto';
import {PostEntity } from 'src/entities/post.entity';
import { UserEntity } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {

    constructor(@InjectRepository(PostEntity) readonly postRepository : Repository<PostEntity> , 
           @InjectRepository(UserEntity) readonly userRepository : Repository<UserEntity> , 
           private readonly userService : UserService){}

    async createPost(userId : number , postDto : CreatePostDto){

        const user = await this.userService.getUserById(userId) ; 
        const post = {
            ...postDto , 
            user : user
        }
       const newPost =  await this.postRepository.create(post) ; 
        return  await this.postRepository.save(newPost) ; 
    }

    async getAllPost(){
        return await this.postRepository.find(); 
    }

    async getPostByPostId(postId : number){
        const post = await this.postRepository.findOneBy({postId: postId})
        return post; 
    }

    async getPostByPostIdAndUserId(postId:number , userId : number){
        const user = await this.userService.getUserById(userId) ;
        
        const post = await this.postRepository.find({
            where : {
                postId : postId , 
                user : {userId: userId}
            }
        })

        return post; 
    }

    async getAllPostByUserId(id : number){
        const user = this.userService.getUserById(id) ; 

        return await this.postRepository.find({
            where : {user : {userId : id}}
        })
    }
}
