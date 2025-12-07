import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthService {
        private saltOrRounds = 10;

    constructor (private configService : ConfigService){} 

    async hashPassword(pass : string)  : Promise<string> {
        const hashedPassword = await bcrypt.hash(pass , this.saltOrRounds) ; 
        return hashedPassword ; 
    }

    async comparePassword(pass : string , hashed : string) : Promise<boolean> {
        return await bcrypt.compare(pass , hashed) ; 
    }

     generateToken(payload : any) : string {
        const secret = this.configService.get<string>('SUPABASE_JWT_SECRET') ; 
       
        
    if (!secret) {
        throw new Error('SUPABASE_JWT_SECRET is not configured');
    }

        const expiresIn = '3h' ; 

        return jwt.sign(payload , secret , {expiresIn} )  ;
    }


  verifyToken(token: string): any {
    const secret = this.configService.get<string>('SUPABASE_JWT_SECRET');
     if(!secret){
        throw new Error('SUPABASE_JWT_SECRET is not configured')
     }
    try {
      return jwt.verify(token, secret);
    } 
    catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }

}
}
