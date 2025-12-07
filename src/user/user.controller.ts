import { Body, Controller, Get, Param, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { SupabaseAuthGuard } from 'src/supabase-auth/supabase-auth.guard';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostService } from 'src/post/post.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService : UserService , 
        private readonly postService: PostService
    ){}

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async signUp(@Body() createUserDto: CreateUserDto){
        return this.userService.signUp(createUserDto)
    }

    @Post('login')
    async login(@Body() createUserDto : CreateUserDto){
        return this.userService.login(createUserDto);
    }

    @Post('post')
    @UseGuards(SupabaseAuthGuard)
    async createNewPost(@Req() req , @Body() createPostDto : CreatePostDto){
        return this.postService.createPost(req.id , createPostDto) ; 
    }

    @Get('post')
    @UseGuards(SupabaseAuthGuard)
    async getAllPost(@Req() req){
        return this.postService.getAllPostByUserId(req.id) ; 
    }

    @Get('profile')
    @UseGuards(SupabaseAuthGuard)
      getProfile(@Req() req) {
    return {
      message: 'This is a protected route',
      user: req.user,
    };
  }

    @Get()
    @UseGuards(SupabaseAuthGuard)
    async getUser(@Body() userEmail : any){
        return this.userService.getUserByEmail(userEmail) ;
    }

    @Get('all')
    @UseGuards(SupabaseAuthGuard)
    async getAllUser(){
        return this.userService.getAllUser() ; 
    }

     @Get('post/:postId')
     @UseGuards(SupabaseAuthGuard)
    async getPost(@Req() req , @Param('postId') postId : string){
        return this.postService.getPostByPostIdAndUserId(Number(postId) , req.user.userId)
    }

}
