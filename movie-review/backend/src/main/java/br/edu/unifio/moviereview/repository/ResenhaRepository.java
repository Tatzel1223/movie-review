package br.edu.unifio.moviereview.repository;

import br.edu.unifio.moviereview.dto.ResenhaDetalhe;
import br.edu.unifio.moviereview.model.Resenha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ResenhaRepository extends JpaRepository<Resenha, Long> {

    @Query(value = """
            SELECT r.id         AS id,
                   r.manchete   AS manchete,
                   r.texto      AS texto,
                   r.nota       AS nota,
                   r.curtidas   AS curtidas,
                   t.id         AS tituloId,
                   t.nome       AS titulo,
                   t.tipo       AS tipo,
                   g.nome       AS genero,
                   t.imagem     AS imagem,
                   u.id         AS usuarioId,
                   u.nome       AS autor
              FROM resenha r
             INNER JOIN titulo t  ON t.id = r.titulo_id
             INNER JOIN genero g  ON g.id = t.genero_id
             INNER JOIN usuario u ON u.id = r.usuario_id
             ORDER BY r.curtidas DESC, r.id
             LIMIT 6
            """, nativeQuery = true)
    List<ResenhaDetalhe> maisCurtidas();

    @Query(value = """
            SELECT r.id         AS id,
                   r.manchete   AS manchete,
                   r.texto      AS texto,
                   r.nota       AS nota,
                   r.curtidas   AS curtidas,
                   t.id         AS tituloId,
                   t.nome       AS titulo,
                   t.tipo       AS tipo,
                   g.nome       AS genero,
                   t.imagem     AS imagem,
                   u.id         AS usuarioId,
                   u.nome       AS autor
              FROM resenha r
             INNER JOIN titulo t  ON t.id = r.titulo_id
             INNER JOIN genero g  ON g.id = t.genero_id
             INNER JOIN usuario u ON u.id = r.usuario_id
             WHERE r.usuario_id = :usuarioId
             ORDER BY r.criada_em DESC, r.id DESC
            """, nativeQuery = true)
    List<ResenhaDetalhe> doUsuario(@Param("usuarioId") Long usuarioId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "DELETE FROM resenha WHERE usuario_id = :usuarioId", nativeQuery = true)
    int excluirDoUsuario(@Param("usuarioId") Long usuarioId);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query(value = "UPDATE resenha SET curtidas = curtidas + 1 WHERE id = :id", nativeQuery = true)
    int curtir(@Param("id") Long id);
}
