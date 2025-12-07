import { IsString, Max, Min } from "class-validator"

export class CreatePostDto{

    @IsString()
            title : string 
        
   @IsString()
            description : string  
        
 
            @Min(1)
            @Max(5)
            fluency_rating : number 
        
   
            @Min(1)
            @Max(5)
            vocab_rating : number  

            @Min(1)
            @Max(5)
            grammer_rating : number 
            

            @Min(1)
            @Max(5)
            confidence_rating : number 

}