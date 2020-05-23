import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from './country.model';

@Entity({ name: 'states' })
export class State {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(type => Country, null, { eager: true })
  country: Country;
}
