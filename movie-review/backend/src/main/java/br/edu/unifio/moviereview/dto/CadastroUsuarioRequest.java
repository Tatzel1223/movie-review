package br.edu.unifio.moviereview.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CadastroUsuarioRequest(
        @NotBlank(message = "Informe o nome")
        @Size(max = 80, message = "O nome pode ter no máximo 80 caracteres")
        String nome,

        @NotBlank(message = "Informe o nome de usuário")
        @Pattern(regexp = "^[a-zA-Z0-9._]{3,30}$",
                message = "O nome de usuário deve ter de 3 a 30 caracteres, só letras, números, ponto ou _")
        String login,

        @NotBlank(message = "Informe a senha")
        @Size(min = 6, max = 60, message = "A senha deve ter de 6 a 60 caracteres")
        String senha,

        @Size(max = 120, message = "A frase pode ter no máximo 120 caracteres")
        String frase,

        @Size(max = 120, message = "O título da bio pode ter no máximo 120 caracteres")
        String bioTitulo,

        @Size(max = 1000, message = "A bio pode ter no máximo 1000 caracteres")
        String bio
) {
}
