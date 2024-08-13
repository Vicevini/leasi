import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class URL {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  original_url!: string;

  @Column({ unique: true })
  short_url!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column({ default: 0 })
  clicks!: number;

  @Column({ nullable: true })
  deleted_at!: Date;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
