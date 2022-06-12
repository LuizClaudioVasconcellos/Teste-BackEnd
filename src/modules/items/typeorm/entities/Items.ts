import Restaurant from '@modules/restaurants/typeorm/entities/Restaurant';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('items')
class Items {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  dish_name: string;

  @Column('decimal')
  price: number;

  @Column()
  food_image: string;

  @ManyToOne(() => Restaurant, restaurant => restaurant.items, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;

  @Column()
  restaurant_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Items;
