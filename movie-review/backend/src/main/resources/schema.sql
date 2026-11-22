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
