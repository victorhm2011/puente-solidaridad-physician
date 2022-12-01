import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PhysicianExitDto } from '../dto/physicianExit.dto';
import { PhysicianEntity } from '../models/physician.entity';
import { Physician } from '../models/physician.interface';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class PhysicianService {
    constructor(
        @InjectRepository(PhysicianEntity)
        private readonly physicianRepository: Repository<PhysicianEntity>,
        private http: HttpService
    ){}

    async createPhysician(physician: Physician): Promise<Physician> {
        return this.physicianRepository.save(physician);
    }

    getPhysicianList(): Observable<Physician[]> {
        return from(this.physicianRepository.find());
    }

    async getPhysician(id: string): Promise<PhysicianExitDto> {
        return this.physicianRepository.findOne(id);
    }

    async updatePhysician(id: string, physician: Physician): Promise<UpdateResult> {
        return await this.physicianRepository.update(id, physician);
    }

    async deletePhysician(id: string): Promise<DeleteResult> {
        return this.physicianRepository.delete(id);
    }

    async validateUser(): Promise<any> {
        return this.http.get('https://puente-solidaridad.herokuapp.com/v1/users/user')
        .toPromise()
        .then(res => res.data)
        .catch(err => err); 
    }
    
}
