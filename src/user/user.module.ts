import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from 'src/entities/post.entity';
import { AuthModule } from 'src/auth/auth.module';
import { PostModule } from 'src/post/post.module';

@Module({
   imports:[TypeOrmModule.forFeature([UserEntity, PostEntity]) , AuthModule, forwardRef(() => PostModule)] , 
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
