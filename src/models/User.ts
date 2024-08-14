import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { URL } from "./URL";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: number;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @Column({ type: "varchar", nullable: true, default: "" })
  token!: string;

  @OneToMany(() => URL, (url) => url.user)
  urls!: URL[];

  @CreateDateColumn({ type: "timestamp" })
  created_at!: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at!: Date;
}
