CREATE DATABASE IF NOT EXISTS movie_review;
USE movie_review;

CREATE TABLE IF NOT EXISTS genero (
    id   BIGINT      NOT NULL AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    CONSTRAINT pk_genero PRIMARY KEY (id),
    CONSTRAINT uk_genero_nome UNIQUE (nome)
);

CREATE TABLE IF NOT EXISTS usuario (
    id         BIGINT        NOT NULL AUTO_INCREMENT,
    nome       VARCHAR(80)   NOT NULL,
    login      VARCHAR(50)   NULL,
    senha      VARCHAR(100)  NULL,
    frase      VARCHAR(120)  NULL,
    bio_titulo VARCHAR(120)  NULL,
    bio        VARCHAR(1000) NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id),
    CONSTRAINT uk_usuario_login UNIQUE (login)
);

CREATE TABLE IF NOT EXISTS titulo (
    id             BIGINT        NOT NULL AUTO_INCREMENT,
    nome           VARCHAR(150)  NOT NULL,
    tipo           VARCHAR(10)   NOT NULL,
    ano_lancamento INT           NOT NULL,
    temporadas     INT           NULL,
    sinopse        VARCHAR(1000) NULL,
    imagem         MEDIUMTEXT    NULL,
    genero_id      BIGINT        NOT NULL,
    CONSTRAINT pk_titulo PRIMARY KEY (id),
    CONSTRAINT fk_titulo_genero FOREIGN KEY (genero_id) REFERENCES genero (id),
    CONSTRAINT ck_titulo_tipo CHECK (tipo IN ('FILME', 'SERIE'))
);

CREATE TABLE IF NOT EXISTS resenha (
    id         BIGINT        NOT NULL AUTO_INCREMENT,
    usuario_id BIGINT        NOT NULL,
    titulo_id  BIGINT        NOT NULL,
    manchete   VARCHAR(120)  NOT NULL,
    texto      VARCHAR(2000) NOT NULL,
    nota       INT           NOT NULL,
    curtidas   INT           NOT NULL DEFAULT 0,
    criada_em  DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_resenha PRIMARY KEY (id),
    CONSTRAINT fk_resenha_usuario FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    CONSTRAINT fk_resenha_titulo FOREIGN KEY (titulo_id) REFERENCES titulo (id) ON DELETE CASCADE,
    CONSTRAINT ck_resenha_nota CHECK (nota BETWEEN 1 AND 5)
);

INSERT INTO genero (id, nome) VALUES
(1, 'Sci-fi'),
(2, 'Fantasia'),
(3, 'Suspense'),
(4, 'Comédia'),
(5, 'Drama'),
(6, 'Ação'),
(7, 'Terror'),
(8, 'Animação');

INSERT INTO usuario (id, nome, login, frase, bio_titulo, bio) VALUES
(1, 'João', 'joao', 'Meu espaço de cinema', 'Seu perfil também conta uma história.', 'Use este espaço para contar um pouco sobre você, seus filmes favoritos e o que procura em uma boa história.'),
(2, 'Ana Lima', 'ana', 'Viciada em ficção científica', NULL, NULL),
(3, 'Bruno Costa', 'bruno', 'Fantasia é vida', NULL, NULL),
(4, 'Camila Rocha', 'camila', 'Sempre de olho no próximo plot twist', NULL, NULL);

INSERT INTO titulo (id, nome, tipo, ano_lancamento, temporadas, sinopse, genero_id) VALUES
(1, 'Interestelar', 'FILME', 2014, NULL, 'Uma jornada espacial tensa, com atuações fortes e uma atmosfera visual imersiva em busca de um novo lar para a humanidade.', 1),
(2, 'O Senhor dos Anéis: A Sociedade do Anel', 'FILME', 2001, NULL, 'Um mundo mágico sombrio, com criaturas icônicas e uma narrativa emocionalmente densa sobre amizade e coragem.', 2),
(3, 'Ilha do Medo', 'FILME', 2010, NULL, 'Um thriller psicológico tenso, com reviravoltas constantes e uma atmosfera pesada em um hospital isolado.', 3),
(4, 'O Auto da Compadecida', 'FILME', 2000, NULL, 'Uma comédia brasileira leve, com diálogos afiados e personagens inesquecíveis no sertão nordestino.', 4),
(5, 'O Poderoso Chefão', 'FILME', 1972, NULL, 'A história de uma família da máfia italiana nos Estados Unidos e a passagem de poder entre pai e filho.', 5),
(6, 'Matrix', 'FILME', 1999, NULL, 'Um hacker descobre que o mundo em que vive é uma simulação controlada por máquinas.', 1),
(7, 'Cidade de Deus', 'FILME', 2002, NULL, 'O crescimento do crime organizado em uma comunidade do Rio de Janeiro, contado por um jovem fotógrafo.', 5),
(8, 'Mad Max: Estrada da Fúria', 'FILME', 2015, NULL, 'Em um deserto pós-apocalíptico, uma fuga vira uma perseguição sem fim.', 6),
(9, 'Breaking Bad', 'SERIE', 2008, 5, 'Um professor de química se envolve com o tráfico e se transforma aos poucos em outra pessoa.', 5),
(10, 'Dark', 'SERIE', 2017, 3, 'O desaparecimento de crianças revela segredos de quatro famílias ligados a viagens no tempo.', 3),
(11, 'Stranger Things', 'SERIE', 2016, 5, 'Um grupo de amigos enfrenta forças sobrenaturais em uma pequena cidade dos anos 80.', 1),
(12, 'The Office', 'SERIE', 2005, 9, 'O dia a dia de funcionários de um escritório de venda de papel, em formato de documentário.', 4),
(13, 'Arcane', 'SERIE', 2021, 2, 'Duas irmãs ficam em lados opostos de um conflito entre duas cidades.', 8);

INSERT INTO resenha (usuario_id, titulo_id, manchete, texto, nota, curtidas) VALUES
(2, 1, 'Ficção científica no seu melhor', 'Uma jornada espacial tensa, com atuações fortes e uma atmosfera visual imersiva. A trilha sonora carrega o filme inteiro.', 5, 2400),
(3, 2, 'Fantasia que envelheceu muito bem', 'Um mundo mágico sombrio, com criaturas icônicas e uma narrativa emocionalmente densa. Vale cada minuto.', 5, 1800),
(4, 3, 'Você vai querer ver duas vezes', 'Um thriller psicológico tenso, com reviravoltas constantes e uma atmosfera pesada do começo ao fim.', 5, 1200),
(2, 4, 'Rir do começo ao fim', 'Uma comédia leve, com diálogos afiados e um ritmo agradável. João Grilo e Chicó são uma dupla perfeita.', 5, 860),
(3, 1, 'Bonito, mas longo', 'Visualmente impecável, mas o terceiro ato exige paciência. Ainda assim, uma experiência marcante.', 4, 640),
(4, 9, 'Melhor série que já vi', 'A transformação do protagonista é construída com calma e cada temporada fica melhor que a anterior.', 5, 2100),
(2, 10, 'Exige atenção total', 'A trama de viagem no tempo é complexa, mas tudo se encaixa no final. Uma série para assistir anotando.', 5, 1500),
(3, 12, 'Conforto em forma de série', 'Humor constrangedor na medida certa e personagens que viram parte da família.', 4, 980),
(4, 6, 'Um clássico da ficção', 'Revolucionou os efeitos visuais e continua atual nas perguntas que faz sobre a realidade.', 4, 730),
(2, 11, 'Nostalgia bem feita', 'Mistura de aventura, terror e amizade que lembra os filmes dos anos 80.', 4, 520),
(1, 5, 'Um clássico que continua marcante', 'A força das atuações e a construção de cada cena transformam uma história de família em uma experiência cinematográfica inesquecível.', 5, 310);

INSERT INTO usuario (nome, login, frase) VALUES ('Maria Souza', 'maria', 'Maratonando séries no fim de semana');

SELECT id, nome, login FROM usuario WHERE login = 'maria';

SELECT * FROM usuario ORDER BY nome;

UPDATE usuario SET bio = 'Gosto de séries de suspense.' WHERE nome = 'Maria Souza';

DELETE FROM resenha WHERE usuario_id = (SELECT id FROM (SELECT id FROM usuario WHERE nome = 'Maria Souza') AS u);
DELETE FROM usuario WHERE nome = 'Maria Souza';

UPDATE titulo SET imagem = 'https://exemplo.com/poster-matrix.jpg' WHERE nome = 'Matrix';
UPDATE titulo SET imagem = NULL WHERE nome = 'Matrix';

INSERT INTO resenha (usuario_id, titulo_id, manchete, texto, nota)
VALUES (1, 6, 'Ainda impressiona', 'Assisti de novo e as cenas de ação continuam incríveis.', 4);

SELECT * FROM resenha WHERE usuario_id = 1;

UPDATE resenha SET nota = 5 WHERE usuario_id = 1 AND titulo_id = 6;

UPDATE resenha SET curtidas = curtidas + 1 WHERE id = 1;

DELETE FROM resenha WHERE usuario_id = 1 AND titulo_id = 6;

SELECT t.nome,
       t.tipo,
       g.nome                       AS genero,
       ROUND(AVG(r.nota), 1)        AS media,
       COALESCE(SUM(r.curtidas), 0) AS curtidas,
       COUNT(r.id)                  AS total_resenhas
  FROM titulo t
 INNER JOIN genero g ON g.id = t.genero_id
  LEFT JOIN resenha r ON r.titulo_id = t.id
 GROUP BY t.id, t.nome, t.tipo, g.nome
 ORDER BY media IS NULL, media DESC, curtidas DESC;

SELECT t.nome  AS titulo,
       u.nome  AS autor,
       g.nome  AS genero,
       r.manchete,
       r.curtidas
  FROM resenha r
 INNER JOIN titulo t  ON t.id = r.titulo_id
 INNER JOIN genero g  ON g.id = t.genero_id
 INNER JOIN usuario u ON u.id = r.usuario_id
 ORDER BY r.curtidas DESC
 LIMIT 6;

SELECT (SELECT COUNT(DISTINCT r.titulo_id)
          FROM resenha r
         INNER JOIN titulo t ON t.id = r.titulo_id
         WHERE r.usuario_id = 1 AND t.tipo = 'FILME') AS filmes_vistos,
       (SELECT COUNT(DISTINCT r.titulo_id)
          FROM resenha r
         INNER JOIN titulo t ON t.id = r.titulo_id
         WHERE r.usuario_id = 1 AND t.tipo = 'SERIE') AS series_vistas,
       (SELECT COUNT(*)
          FROM resenha r
         WHERE r.usuario_id = 1) AS resenhas_publicadas;

SELECT nome
  FROM titulo
 WHERE id IN (SELECT titulo_id
                FROM resenha
               GROUP BY titulo_id
              HAVING AVG(nota) > (SELECT AVG(nota) FROM resenha));
