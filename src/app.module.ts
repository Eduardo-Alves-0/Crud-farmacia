import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Define o tipo de banco de dados que será utilizado (neste caso, MySQL)
      type: 'mysql',

      // Endereço do servidor do banco de dados (aqui, está rodando localmente)
      host: 'localhost',

      // Porta padrão do MySQL
      port: 3306,

      // Usuário para conexão com o banco de dados
      username: 'root',

      // Senha do usuário configurado no MySQL
      password: '1234',

      // Nome do banco de dados que será utilizado
      database: 'db_blogpessoal',

      // Lista de entidades que serão mapeadas para tabelas no banco de dados
      entities: [],

      // Define se o banco deve ser sincronizado automaticamente com as entidades
      // true => cria/atualiza tabelas automaticamente a cada alteração no código
      // ⚠️ Não recomendado em produção, apenas para desenvolvimento
      synchronize: true,

      // Exibe no console as queries SQL executadas pelo TypeORM (útil para debug)
      logging: true,
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
