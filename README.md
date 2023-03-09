Para execução dos testes de integração é necessário subir esse container:

``docker run --name rentalx_database_test -e POSTGRES_DB=rentalx_test -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=ignite -p 5432:5432 -d postgres``


# TypeORM
Para criação de migrações, é necessário colocar o caminho da pasta
``yarn typeorm migration:create ./src/shared/infra/typeorm/migrations/CreateUsersToken``

Migrando o banco de dados:
``yarn typeorm migration:run -d ./src/shared/infra/typeorm/index.ts``