import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class URL {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  original_url: string;

  @Column({ unique: true })
  short_url: string;

  @ManyToOne(() => User, (user) => user.urls)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
