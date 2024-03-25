import { createHmac } from 'crypto';
import { encryptedSHA256Hash } from 'src/utils/encryptions';
import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    if (this.email) {
      this.email = encryptedSHA256Hash(this.email, process.env.EMAIL_SECRET);
    }
    if (this.password) {
      this.password = encryptedSHA256Hash(
        this.password,
        process.env.PASSWORD_SECRET,
      );
    }
  }

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
