import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";

@Entity()
export class URL {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  original_url!: string;

  @Column()
  short_url!: string;

  @Column({ default: 0 })
  clicks!: number;

  @Column({ type: "timestamp", nullable: true })
  deleted_at!: Date | null;

  @ManyToOne(() => User, (user) => user.urls)
  user?: User | null;
}
