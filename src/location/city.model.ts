import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { State } from './state.model';

@Entity({ name: 'cities' })
export class City {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @ManyToOne(type => State, null, { eager: true })
  state: State;
}
