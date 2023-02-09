import { randomUUID } from "node:crypto";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("cars_image")
class CarImage {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = randomUUID();
    }
  }
}

export { CarImage };
