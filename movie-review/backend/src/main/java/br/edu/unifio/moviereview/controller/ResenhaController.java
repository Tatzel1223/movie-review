package br.edu.unifio.moviereview.controller;

import br.edu.unifio.moviereview.dto.ResenhaDetalhe;
import br.edu.unifio.moviereview.dto.ResenhaRequest;
import br.edu.unifio.moviereview.model.Resenha;
import br.edu.unifio.moviereview.model.Titulo;
import br.edu.unifio.moviereview.model.Usuario;
import br.edu.unifio.moviereview.repository.ResenhaRepository;
import br.edu.unifio.moviereview.repository.TituloRepository;
import br.edu.unifio.moviereview.repository.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/resenhas")
@RequiredArgsConstructor
public class ResenhaController {

    private final ResenhaRepository resenhaRepository;
    private final TituloRepository tituloRepository;
    private final UsuarioRepository usuarioRepository;

    @GetMapping("/mais-curtidas")
    public List<ResenhaDetalhe> maisCurtidas() {
        return resenhaRepository.maisCurtidas();
    }

    @GetMapping("/{id}")
    public Resenha buscar(@PathVariable Long id) {
        return resenhaRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Resenha não encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Resenha cadastrar(@RequestBody @Valid ResenhaRequest dados) {
        Resenha resenha = new Resenha();
        resenha.setCurtidas(0);
        resenha.setCriadaEm(LocalDateTime.now());
        preencher(resenha, dados);
        return resenhaRepository.save(resenha);
    }

    @PutMapping("/{id}")
    public Resenha atualizar(@PathVariable Long id, @RequestBody @Valid ResenhaRequest dados) {
        Resenha resenha = buscar(id);
        preencher(resenha, dados);
        return resenhaRepository.save(resenha);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void excluir(@PathVariable Long id) {
        resenhaRepository.delete(buscar(id));
    }

    @PostMapping("/{id}/curtir")
    public Map<String, Integer> curtir(@PathVariable Long id) {
        if (resenhaRepository.curtir(id) == 0) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Resenha não encontrada");
        }
        return Map.of("curtidas", buscar(id).getCurtidas());
    }

    private void preencher(Resenha resenha, ResenhaRequest dados) {
        Usuario usuario = usuarioRepository.findById(dados.usuarioId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Usuário não encontrado"));
        Titulo titulo = tituloRepository.findById(dados.tituloId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Filme ou série não encontrado"));

        resenha.setUsuario(usuario);
        resenha.setTitulo(titulo);
        resenha.setManchete(dados.manchete().trim());
        resenha.setTexto(dados.texto().trim());
        resenha.setNota(dados.nota());
    }
}
