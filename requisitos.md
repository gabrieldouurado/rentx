# Cadastro de Carro
**RF**
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro já existente
- O carro deve ser cadastrado com por padrão com disponibilidade
- Somente usuários administradores devem fazer cadastro do carro

# Listagem de carros
**RF**
- Deve ser possível listar todos os carros disponvíveis
- Deve ser possível listar todos os carros disponíveis pela categorias
- Deve ser possível listar todos os carros disponíveis pelo nome do carro
- Deve ser possível listar todos os carros disponíveis pela marca

**RN**
- Não é necessário estar logado no sistema para fazer a listagem

# Cadastro de especificação no carro
**RF**
- Deve ser possível cadastrar uma especificação para um carro

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar uma mesma especificação já existente para o carro
- Deve ser possível listar todas as espeficicações
- Somente usuários administradores devem fazer cadastro uma espefificação do para o carro

# Cadastro de imagens do carro
**RF**
- Deve ser possível cadastrar a imagem do carro

**RNF**
- Ultilizar o multer para o upload dps arquvios

**RN**
- Deve ser possível cadastrar mais de uma imagem para o mesmo carro
- Somente usuários administradores devem fazer upload de imagens para carro

# Aluguel de carro
**RF**
- Deve ser possível cadastrar um aluguel

**RN**
- O aluguel deve ter duração minima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro