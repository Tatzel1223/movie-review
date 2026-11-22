package br.edu.unifio.moviereview.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UsuarioRequest(
        @NotBlank(message = "Informe o nome")
        @Size(max = 80, message = "O nome pode ter no máximo 80 caracteres")
        String nome,

        @Size(max = 120, message = "A frase pode ter no máximo 120 caracteres")
        String frase,

        @Size(max = 120, message = "O título da bio pode ter no máximo 120 caracteres")
        String bioTitulo,

        @Size(max = 1000, message = "A bio pode ter no máximo 1000 caracteres")
        String bio
) {
}
