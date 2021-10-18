import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public username: string;

  @Column()
  public name: string;

  @Column()
  public password: string;
}

export default Users