# Movie Review

Projeto de banco de dados com CRUD: catálogo de filmes e séries com resenhas.

- Banco: MySQL 8 (`banco/script.sql`)
- Back-end: Java 17 + Spring Boot 3 (`backend/`)
- Front-end: Angular 18 (`frontend/`)

## Como rodar

1. Com o MySQL ligado, execute uma vez o arquivo `banco/criar-usuario.sql` como `root`. Ele cria o banco `movie_review` e o usuário do sistema:
   - usuário: `movie_review_app`
   - senha: `MovieReview@2026`

   As tabelas e os dados de exemplo são criados automaticamente quando o back-end sobe.
2. Back-end: rode `MovieReviewApplication.java` (ou `mvn spring-boot:run` dentro de `backend`). API em http://localhost:8080/api/titulos
3. Front-end: dentro de `frontend`, rode `npm install` e depois `npm start`. Acesse http://localhost:4200

## Contas de exemplo

Usuários `joao`, `ana`, `bruno` e `camila`, todos com a senha `123456`. As senhas ficam salvas no banco criptografadas com BCrypt.

## Tabelas

- `genero` (1) → (N) `titulo`
- `titulo` (1) → (N) `resenha`
- `usuario` (1) → (N) `resenha`

## Rotas da API

| Método | Rota |
|---|---|
| GET | `/api/titulos?tipo=&generoId=&busca=` |
| GET | `/api/titulos/recentes` |
| GET, POST, PUT, DELETE | `/api/titulos`, `/api/titulos/{id}` |
| GET | `/api/resenhas/mais-curtidas` |
| GET, POST, PUT, DELETE | `/api/resenhas`, `/api/resenhas/{id}` |
| POST | `/api/resenhas/{id}/curtir` |
| GET, POST | `/api/usuarios` |
| POST | `/api/usuarios/login` |
| GET, PUT, DELETE | `/api/usuarios/{id}` |
| GET | `/api/usuarios/{id}/estante` |
| GET | `/api/usuarios/{id}/resenhas` |
| GET | `/api/generos` |
