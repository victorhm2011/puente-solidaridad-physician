import { IsOptional, IsString, MaxLength } from "class-validator";

export class PhysicianPatchDto {

    @IsOptional()
    @MaxLength(500)
    @IsString()
    name: string;

    @IsOptional()
    @MaxLength(500)
    @IsString()
    firstLastName: string;

    @IsOptional()
    @MaxLength(500)
    @IsString()
    secondLastName: string;

    @IsOptional()
    @MaxLength(500)
    @IsString()
    hospital: string;

    @IsOptional()
    @MaxLength(50)
    @IsString()
    phone: string;
}