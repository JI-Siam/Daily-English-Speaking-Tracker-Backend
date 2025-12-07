import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { generate } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {

    constructor(@InjectRepository(UserEntity) readonly userRepository:Repository <UserEntity> , 
        private readonly authService: AuthService){}
    async signUp(createUserDto: CreateUserDto){
        const user = await this.userRepository.findOneBy({email : createUserDto.email}) ; 
        if(user){
            throw new ConflictException("Email Already Registered!!") ; 
        }
        const hashedPassword = await this.authService.hashPassword(createUserDto.password) ; 
        createUserDto.password = hashedPassword ; 

        const newUser =  await this.userRepository.create(createUserDto) ; 
        return await this.userRepository.save(newUser) ; 
    }

    async login(createUserDto : CreateUserDto){

        const user = await this.getUserByEmail(createUserDto.email)  ; 

     
    const passMatched = this.authService.comparePassword(createUserDto.password , user.password) ; 
      if(!passMatched){
        throw new ForbiddenException("Wrong Password , Try again!!") ; 
      }
      const token = this.authService.generateToken(
        {id : user.userId  , 
         email : user.email
        }
      )

      return {
        message : "Login Successful!!" , 
        token : token
      }

    }

    async getUserByEmail(userEmail: any) : Promise<UserEntity>{

         const user = await this.userRepository.findOneBy({email:userEmail.email}) ; 
                if(!user){
                    throw new NotFoundException("User not Found , Incorrect Email!!")
                }
        return user ; 
            
    }

    async getUserById(userId : number) : Promise<UserEntity>{
         const user = await this.userRepository.findOneBy({userId:userId}) ; 
                if(!user){
                    throw new NotFoundException("User not Found!!")
                }
        return user ; 
    }

    async getAllUser(){

    }


}
