import { CanActivate, ExecutionContext, Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken'; 
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private configService : ConfigService){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>() ; 
    const authHeader = request.headers['authorization'] ; 
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    throw new UnauthorizedException("Invalid Token!!") ; 
  }
  const token = authHeader.split(' ')[1] ; 
  const jwtSecret= this.configService.get<string>('SUPABASE_JWT_SECRET') ; 

  if(!jwtSecret){
    throw new UnauthorizedException("JWT Secret Not Found!!!") ; 
  }

  try{
    const decode = jwt.verify(token , jwtSecret) ; 
    request['user'] = decode ;
  }
  catch(error){
    throw new UnauthorizedException('Invalid Token') ; 
  }
        return true;
  }
}
