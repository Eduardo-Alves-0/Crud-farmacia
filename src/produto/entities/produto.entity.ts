import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Categoria } from './../../categoria/entities/categoria.entity';

@Entity('tb_produto')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('text')
  descricao: string;

  @Column('decimal', { precision: 10, scale: 2 })
  preco: number;

  @Column()
  quantidade: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.id, { eager: true })
  categoria: Categoria;
}
