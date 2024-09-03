import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";


export class DefaultQueryParams{
    @ApiProperty({
        required:true,
        description:"Limit"
    })
    @IsNumber()
    @IsNotEmpty()
    limit : number


    @ApiProperty({
        required:true,
        description:"Page"
    })
    @IsNumber()
    @IsNotEmpty()
    page : number 


    @ApiProperty({
        required:true,
        description:"Is Descending?"
    })
    @IsBoolean()
    @IsNotEmpty()
    descending: boolean 

}