Para execução dos testes de integração é necessário subir esse container:

``docker run --name rentalx_database_test -e POSTGRES_DB=rentalx_test -e POSTGRES_USER=docker -e POSTGRES_PASSWORD=ignite -p 5432:5432 -d postgres``