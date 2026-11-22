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
