import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostEntity } from 'src/entities/post.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
   imports:[TypeOrmModule.forFeature([UserEntity , PostEntity]) , forwardRef(()=>UserModule ) ] , 
  providers: [PostService],
  exports: [PostService]
})
export class PostModule {}
