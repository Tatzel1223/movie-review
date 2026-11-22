package br.edu.unifio.moviereview.repository;

import br.edu.unifio.moviereview.dto.TituloResumo;
import br.edu.unifio.moviereview.model.Titulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TituloRepository extends JpaRepository<Titulo, Long> {

    @Query(value = """
            SELECT t.id                       AS id,
                   t.nome                     AS nome,
                   t.tipo                     AS tipo,
                   t.ano_lancamento           AS anoLancamento,
                   t.temporadas               AS temporadas,
                   t.sinopse                  AS sinopse,
                   t.imagem                   AS imagem,
                   g.id                       AS generoId,
                   g.nome                     AS genero,
                   ROUND(AVG(r.nota), 1)      AS media,
                   COALESCE(SUM(r.curtidas), 0) AS curtidas,
                   COUNT(r.id)                AS totalResenhas
              FROM titulo t
             INNER JOIN genero g ON g.id = t.genero_id
              LEFT JOIN resenha r ON r.titulo_id = t.id
             WHERE (:tipo IS NULL OR t.tipo = :tipo)
               AND (:generoId IS NULL OR t.genero_id = :generoId)
               AND LOWER(t.nome) LIKE LOWER(CONCAT('%', :busca, '%'))
             GROUP BY t.id, g.id
             ORDER BY media IS NULL, media DESC, curtidas DESC, t.nome
            """, nativeQuery = true)
    List<TituloResumo> buscarResumos(@Param("tipo") String tipo,
                                     @Param("generoId") Long generoId,
                                     @Param("busca") String busca);

    List<Titulo> findTop4ByOrderByIdDesc();
}
