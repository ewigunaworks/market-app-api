import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Products {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @Column()
  public imagePath: string;
}

export default Products