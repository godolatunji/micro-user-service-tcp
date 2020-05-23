import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { City } from './city.model';

@Entity({ name: 'centres' })
export class Centre {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(type => City, null, { eager: true })
  state: City;
}
