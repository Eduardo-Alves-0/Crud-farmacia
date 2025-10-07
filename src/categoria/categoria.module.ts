import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from '../produto/prodotudo.module';
import { CategoriaController } from './controllers/categoria.controller';
import { Categoria } from './entities/categoria.entity';
import { CategoriaService } from './services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria]), ProdutoModule],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
