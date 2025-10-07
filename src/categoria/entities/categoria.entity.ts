import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from './../../produto/entities/produto.entity';

@Entity('tb_categoria')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  description: string;

  // Relacionamento com Produto
  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
