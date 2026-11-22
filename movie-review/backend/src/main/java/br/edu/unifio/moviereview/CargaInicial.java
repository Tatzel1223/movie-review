package br.edu.unifio.moviereview;

import br.edu.unifio.moviereview.model.Usuario;
import br.edu.unifio.moviereview.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.init.ResourceDatabasePopulator;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.text.Normalizer;

@Component
@RequiredArgsConstructor
public class CargaInicial implements CommandLineRunner {

    private static final String SENHA_PADRAO = "123456";

    private final UsuarioRepository usuarioRepository;
    private final DataSource dataSource;
    private final JdbcTemplate jdbcTemplate;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        adicionarColunaSeFaltar("titulo", "imagem",
                "ALTER TABLE titulo ADD COLUMN imagem MEDIUMTEXT NULL AFTER sinopse");
        adicionarColunaSeFaltar("usuario", "login",
                "ALTER TABLE usuario ADD COLUMN login VARCHAR(50) NULL AFTER nome, ADD CONSTRAINT uk_usuario_login UNIQUE (login)");
        adicionarColunaSeFaltar("usuario", "senha",
                "ALTER TABLE usuario ADD COLUMN senha VARCHAR(100) NULL AFTER login");

        if (usuarioRepository.count() == 0) {
            ResourceDatabasePopulator populator = new ResourceDatabasePopulator();
            populator.addScript(new ClassPathResource("dados-iniciais.sql"));
            populator.setSqlScriptEncoding("UTF-8");
            populator.execute(dataSource);
        }

        completarAcessos();
    }

    private void adicionarColunaSeFaltar(String tabela, String coluna, String comando) {
        Integer existe = jdbcTemplate.queryForObject("""
                SELECT COUNT(*)
                  FROM information_schema.columns
                 WHERE table_schema = DATABASE()
                   AND table_name = ?
                   AND column_name = ?
                """, Integer.class, tabela, coluna);
        if (existe != null && existe == 0) {
            jdbcTemplate.execute(comando);
        }
    }

    private void completarAcessos() {
        for (Usuario usuario : usuarioRepository.findAll()) {
            boolean alterou = false;
            if (usuario.getLogin() == null || usuario.getLogin().isBlank()) {
                usuario.setLogin(gerarLogin(usuario));
                alterou = true;
            }
            if (usuario.getSenha() == null || usuario.getSenha().isBlank()) {
                usuario.setSenha(passwordEncoder.encode(SENHA_PADRAO));
                alterou = true;
            }
            if (alterou) {
                usuarioRepository.save(usuario);
            }
        }
    }

    private String gerarLogin(Usuario usuario) {
        String primeiroNome = usuario.getNome().trim().split("\\s+")[0];
        String login = Normalizer.normalize(primeiroNome, Normalizer.Form.NFD)
                .replaceAll("[^\\p{ASCII}]", "")
                .replaceAll("[^a-zA-Z0-9]", "")
                .toLowerCase();
        if (login.length() < 3) {
            login = "usuario" + login;
        }
        if (usuarioRepository.existsByLoginIgnoreCase(login)) {
            login = login + usuario.getId();
        }
        return login;
    }
}
