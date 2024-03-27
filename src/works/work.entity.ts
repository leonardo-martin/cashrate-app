import { User } from 'src/users/user.entity';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Work {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column()
  userId: number;

  @Column()
  workName: string;

  @Column()
  workPayRate: number;

  @Column()
  workTaxRate: number;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Work with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Work with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed Work with id', this.id);
  }
}
