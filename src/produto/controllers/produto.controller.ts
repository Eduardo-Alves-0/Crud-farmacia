import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  // 🔹 Buscar todos os produtos
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  // 🔹 Buscar produto por ID
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }

  // 🔹 Buscar produtos por nome
  @Get('nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByName(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByName(nome);
  }

  // 🔹 Buscar produtos por categoria
  @Get('categoria/:categoriaId')
  @HttpCode(HttpStatus.OK)
  findByCategoria(
    @Param('categoriaId') categoriaId: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByCategoria(categoriaId);
  }

  // 🔹 Criar novo produto
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto & { categoriaId: number }): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  // 🔹 Atualizar produto existente
  @Put()
  @HttpCode(HttpStatus.OK)
  update(
    @Body() produto: Produto & { categoriaId?: number },
  ): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  // 🔹 Deletar produto
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number) {
    return this.produtoService.delete(id);
  }
}
