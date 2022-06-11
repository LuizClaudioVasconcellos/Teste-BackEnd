import Items from '@modules/items/typeorm/entities/Items';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('restaurants')
class Restaurant {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  restaurantName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  contactNumber: string;

  @Column()
  city: string;

  @Column()
  cuisineType: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(type => Items, restaurant => Restaurant)
  item: Items;
}

export default Restaurant;
