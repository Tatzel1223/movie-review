package br.edu.unifio.moviereview.repository;

import br.edu.unifio.moviereview.model.Genero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GeneroRepository extends JpaRepository<Genero, Long> {

    List<Genero> findAllByOrderByNomeAsc();
}
