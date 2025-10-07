import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categoria } from '../../categoria/entities/categoria.entity';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { Produto } from './../entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({ relations: ['categoria'] });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    }
    return produto;
  }

  async findByName(nome: string): Promise<Produto[]> {
    const produtos = await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['categoria'],
    });

    if (!produtos || produtos.length === 0) {
      throw new HttpException('Produtos não encontrados', HttpStatus.NOT_FOUND);
    }
    return produtos;
  }

  async findByCategoria(categoriaId: number): Promise<Produto[]> {
    const categoria: Categoria =
      await this.categoriaService.findById(categoriaId);

    const produtos = await this.produtoRepository.find({
      where: { categoria: { id: categoria.id } },
      relations: ['categoria'],
    });

    if (!produtos || produtos.length === 0) {
      throw new HttpException(
        'Produtos não encontrados para essa categoria',
        HttpStatus.NOT_FOUND,
      );
    }
    return produtos;
  }

  async create(produto: Produto & { categoriaId: number }): Promise<Produto> {
    const categoria: Categoria = await this.categoriaService.findById(
      produto.categoriaId,
    );

    const novoProduto = this.produtoRepository.create({
      ...produto,
      categoria,
    });

    return await this.produtoRepository.save(novoProduto);
  }

  async update(produto: Produto & { categoriaId?: number }): Promise<Produto> {
    const produtoExistente = await this.findById(produto.id);

    if (produto.categoriaId) {
      const categoria = await this.categoriaService.findById(
        produto.categoriaId,
      );
      produtoExistente.categoria = categoria;
    }

    Object.assign(produtoExistente, produto);
    return await this.produtoRepository.save(produtoExistente);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return await this.produtoRepository.delete(id);
  }
}
