import { IsOptional, IsString, MaxLength } from "class-validator";

export class PhysicianEntryDto {

    @MaxLength(500)
    @IsString()
    name: string;

    @MaxLength(500)
    @IsString()
    firstLastName: string;

    @IsOptional()
    @MaxLength(500)
    @IsString()
    secondLastName: string;

    @MaxLength(500)
    @IsString()
    hospital: string;

    @IsOptional()
    @MaxLength(50)
    @IsString()
    phone: string;
}
