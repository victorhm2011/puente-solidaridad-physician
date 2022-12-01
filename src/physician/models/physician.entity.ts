import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Physician')
export class PhysicianEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ default: null})
    name: string;

    @Column({ default: null})
    firstLastName: string;

    @Column({ default: null})
    secondLastName: string;

    @Column({ default: null})
    hospital: string;

    @Column({ default: null})
    phone: string;
}