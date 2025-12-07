import { IsOptional, IsString, Max, Min } from "class-validator"

export class UpdatePostDto{

    @IsString()
    @IsOptional()
            title?: string 
        
   @IsString()
   @IsOptional()
            description?: string  
        
 
            @Min(1)
            @Max(5)
            @IsOptional()
            fluency_rating? : number 
        
   
            @Min(1)
            @Max(5)
            @IsOptional()
            vocab_rating? : number  

            @Min(1)
            @Max(5)
            @IsOptional()
            grammer_rating? : number 
            

            @Min(1)
            @Max(5)
            @IsOptional()
            confidence_rating? : number 

}