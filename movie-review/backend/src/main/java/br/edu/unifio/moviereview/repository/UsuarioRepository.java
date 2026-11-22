package br.edu.unifio.moviereview.repository;

import br.edu.unifio.moviereview.dto.Estante;
import br.edu.unifio.moviereview.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    List<Usuario> findAllByOrderByNomeAsc();

    Optional<Usuario> findByLoginIgnoreCase(String login);

    boolean existsByLoginIgnoreCase(String login);

    @Query(value = """
            SELECT (SELECT COUNT(DISTINCT r.titulo_id)
                      FROM resenha r
                     INNER JOIN titulo t ON t.id = r.titulo_id
                     WHERE r.usuario_id = :usuarioId AND t.tipo = 'FILME') AS filmesVistos,
                   (SELECT COUNT(DISTINCT r.titulo_id)
                      FROM resenha r
                     INNER JOIN titulo t ON t.id = r.titulo_id
                     WHERE r.usuario_id = :usuarioId AND t.tipo = 'SERIE') AS seriesVistas,
                   (SELECT COUNT(*)
                      FROM resenha r
                     WHERE r.usuario_id = :usuarioId) AS resenhasPublicadas
            """, nativeQuery = true)
    Estante estante(@Param("usuarioId") Long usuarioId);
}
