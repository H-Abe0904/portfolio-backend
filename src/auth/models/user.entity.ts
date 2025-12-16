import {type} from 'os';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    username: string;
    @Column()
    password?: string;
    @Column()
    refreshToken: string;
}