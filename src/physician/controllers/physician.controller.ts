import { Body, Controller, Delete, Get, HttpException, NotFoundException, Param, ParseUUIDPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from '../decorators/roles.decorator';
import { PhysicianEntryDto } from '../dto/physicianEntry.dto';
import { PhysicianExitDto } from '../dto/physicianExit.dto';
import { PhysicianPatchDto } from '../dto/physicianPatch.dto';
import { RolesGuard } from '../guards/roles.guard';
import { Physician } from '../models/physician.interface';
import { Role } from '../models/role.enum';
import { PhysicianService } from '../services/physician.service';
import { errors } from '../constants/constants';
import { JwtGuard } from '../guards/jwt.guard';

@Controller({version: '1'})
export class PhysicianController {
    constructor(private physicianService: PhysicianService) {}

    @Post('physician')
    async create(@Body() physician: PhysicianEntryDto): Promise<Physician> {
        return await this.physicianService.createPhysician(physician);
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get('physicians')
    findAll(): Observable<Physician[]> {
        return this.physicianService.getPhysicianList();
    }

    @Roles(Role.ADMIN)
    @UseGuards(JwtGuard, RolesGuard)
    @Get('physician/:id')
    async findOne(@Param('id', new ParseUUIDPipe()) id: string): Promise<PhysicianExitDto> {
        const physician = await this.physicianService.getPhysician(id);
        if(!physician){
            throw new NotFoundException(errors.exist);
        }
        return physician;
    }

    @Patch('physician/:id')
    @UsePipes(new ValidationPipe())
    async update(
        @Param('id', new ParseUUIDPipe()) id: string,
        @Body() physician: PhysicianPatchDto
    ): Promise<PhysicianExitDto> {
        const physicianToUpdate = await this.physicianService.getPhysician(id);
        if(!physicianToUpdate){
            throw new NotFoundException(errors.exist);
        }
        await this.physicianService.updatePhysician(id, physician);
        return await this.physicianService.getPhysician(id);
    }

    @Delete('physician/:id')
    async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<PhysicianExitDto> {
        const physicianToUpdate = await this.physicianService.getPhysician(id);
        if(!physicianToUpdate){
            throw new NotFoundException(errors.exist);
        } else {
            await this.physicianService.deletePhysician(id);
            throw new HttpException(errors.removed, errors.noContent);
        }
    }
}
