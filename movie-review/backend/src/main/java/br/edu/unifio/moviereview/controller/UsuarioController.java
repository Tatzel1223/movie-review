package br.edu.unifio.moviereview.controller;

import br.edu.unifio.moviereview.dto.CadastroUsuarioRequest;
import br.edu.unifio.moviereview.dto.Estante;
import br.edu.unifio.moviereview.dto.LoginRequest;
import br.edu.unifio.moviereview.dto.ResenhaDetalhe;
import br.edu.unifio.moviereview.dto.UsuarioRequest;
import br.edu.unifio.moviereview.model.Usuario;
import br.edu.unifio.moviereview.repository.ResenhaRepository;
import br.edu.unifio.moviereview.repository.UsuarioRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioRepository usuarioRepository;
    private final ResenhaRepository resenhaRepository;
    private final PasswordEncoder passwordEncoder;

    @GetMapping
    public List<Usuario> listar() {
        return usuarioRepository.findAllByOrderByNomeAsc();
    }

    @GetMapping("/{id}")
    public Usuario buscar(@PathVariable Long id) {
        return usuarioRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuário não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Usuario cadastrar(@RequestBody @Valid CadastroUsuarioRequest dados) {
        String login = dados.login().trim().toLowerCase();
        if (usuarioRepository.existsByLoginIgnoreCase(login)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Esse nome de usuário já está em uso");
        }
        Usuario usuario = new Usuario();
        usuario.setLogin(login);
        usuario.setSenha(passwordEncoder.encode(dados.senha()));
        preencher(usuario, new UsuarioRequest(dados.nome(), dados.frase(), dados.bioTitulo(), dados.bio()));
        return usuarioRepository.save(usuario);
    }

    @PostMapping("/login")
    public Usuario entrar(@RequestBody @Valid LoginRequest dados) {
        Usuario usuario = usuarioRepository.findByLoginIgnoreCase(dados.login().trim())
                .filter(u -> u.getSenha() != null && passwordEncoder.matches(dados.senha(), u.getSenha()))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Usuário ou senha inválidos"));
        return usuario;
    }

    @PutMapping("/{id}")
    public Usuario atualizar(@PathVariable Long id, @RequestBody @Valid UsuarioRequest dados) {
        Usuario usuario = buscar(id);
        preencher(usuario, dados);
        return usuarioRepository.save(usuario);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Transactional
    public void excluir(@PathVariable Long id) {
        Usuario usuario = buscar(id);
        if (usuarioRepository.count() <= 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Não é possível excluir o único usuário do sistema");
        }
        resenhaRepository.excluirDoUsuario(id);
        usuarioRepository.delete(usuario);
    }

    @GetMapping("/{id}/estante")
    public Estante estante(@PathVariable Long id) {
        buscar(id);
        return usuarioRepository.estante(id);
    }

    @GetMapping("/{id}/resenhas")
    public List<ResenhaDetalhe> resenhas(@PathVariable Long id) {
        buscar(id);
        return resenhaRepository.doUsuario(id);
    }

    private void preencher(Usuario usuario, UsuarioRequest dados) {
        usuario.setNome(dados.nome().trim());
        usuario.setFrase(vazioParaNulo(dados.frase()));
        usuario.setBioTitulo(vazioParaNulo(dados.bioTitulo()));
        usuario.setBio(vazioParaNulo(dados.bio()));
    }

    private String vazioParaNulo(String texto) {
        return (texto == null || texto.isBlank()) ? null : texto.trim();
    }
}
