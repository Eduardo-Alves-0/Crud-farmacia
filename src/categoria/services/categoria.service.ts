import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { Categoria } from './../entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>, // relacionamento com produtos
  ) {}

  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({ relations: ['produtos'] }); // carrega produtos
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: ['produtos'], // inclui produtos
    });

    if (!categoria) {
      throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    }
    return categoria;
  }

  async findByName(nome: string): Promise<Categoria[]> {
    const categorias = await this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['produtos'], // inclui produtos
    });

    if (!categorias || categorias.length === 0) {
      throw new HttpException('Nome não encontrado', HttpStatus.NOT_FOUND);
    }
    return categorias;
  }

  async create(categoria: Categoria): Promise<Categoria> {
    // Não faz sentido buscar por ID antes de criar, ajustado:
    const novaCategoria = this.categoriaRepository.create(categoria);
    return await this.categoriaRepository.save(novaCategoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.findById(categoria.id); // busca categoria existente
    Object.assign(categoriaExistente, categoria);
    return await this.categoriaRepository.save(categoriaExistente);
  }

  async delete(id: number): Promise<DeleteResult> {
    const categoria = await this.findById(id);

    // Verifica se existem produtos vinculados antes de deletar
    const produtosVinculados = await this.produtoRepository.find({
      where: { categoria: { id: categoria.id } },
    });

    if (produtosVinculados.length > 0) {
      throw new HttpException(
        'Não é possível deletar categoria com produtos vinculados',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.categoriaRepository.delete(id);
  }
}
