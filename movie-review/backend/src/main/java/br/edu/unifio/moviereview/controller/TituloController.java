package br.edu.unifio.moviereview.controller;

import br.edu.unifio.moviereview.dto.TituloRequest;
import br.edu.unifio.moviereview.dto.TituloResumo;
import br.edu.unifio.moviereview.model.Genero;
import br.edu.unifio.moviereview.model.Tipo;
import br.edu.unifio.moviereview.model.Titulo;
import br.edu.unifio.moviereview.repository.GeneroRepository;
import br.edu.unifio.moviereview.repository.TituloRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/titulos")
@RequiredArgsConstructor
public class TituloController {

    private final TituloRepository tituloRepository;
    private final GeneroRepository generoRepository;

    @GetMapping
    public List<TituloResumo> listar(@RequestParam(required = false) Tipo tipo,
                                     @RequestParam(required = false) Long generoId,
                                     @RequestParam(required = false, defaultValue = "") String busca) {
        String tipoTexto = (tipo == null) ? null : tipo.name();
        return tituloRepository.buscarResumos(tipoTexto, generoId, busca.trim());
    }

    @GetMapping("/recentes")
    public List<Titulo> recentes() {
        return tituloRepository.findTop4ByOrderByIdDesc();
    }

    @GetMapping("/{id}")
    public Titulo buscar(@PathVariable Long id) {
        return tituloRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Título não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Titulo cadastrar(@RequestBody @Valid TituloRequest dados) {
        Titulo titulo = new Titulo();
        preencher(titulo, dados);
        return tituloRepository.save(titulo);
    }

    @PutMapping("/{id}")
    public Titulo atualizar(@PathVariable Long id, @RequestBody @Valid TituloRequest dados) {
        Titulo titulo = buscar(id);
        preencher(titulo, dados);
        return tituloRepository.save(titulo);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        tituloRepository.delete(buscar(id));
    }

    private void preencher(Titulo titulo, TituloRequest dados) {
        Genero genero = generoRepository.findById(dados.generoId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Gênero não encontrado"));

        if (dados.tipo() == Tipo.SERIE && dados.temporadas() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe o número de temporadas da série");
        }

        titulo.setNome(dados.nome().trim());
        titulo.setTipo(dados.tipo());
        titulo.setAnoLancamento(dados.anoLancamento());
        titulo.setTemporadas(dados.tipo() == Tipo.SERIE ? dados.temporadas() : null);
        titulo.setSinopse(dados.sinopse());
        titulo.setImagem(dados.imagem() == null || dados.imagem().isBlank() ? null : dados.imagem().trim());
        titulo.setGenero(genero);
    }
}
