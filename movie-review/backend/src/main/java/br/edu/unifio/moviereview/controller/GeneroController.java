package br.edu.unifio.moviereview.controller;

import br.edu.unifio.moviereview.model.Genero;
import br.edu.unifio.moviereview.repository.GeneroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/generos")
@RequiredArgsConstructor
public class GeneroController {

    private final GeneroRepository generoRepository;

    @GetMapping
    public List<Genero> listar() {
        return generoRepository.findAllByOrderByNomeAsc();
    }
}
