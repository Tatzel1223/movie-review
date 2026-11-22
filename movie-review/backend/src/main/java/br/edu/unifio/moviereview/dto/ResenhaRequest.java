package br.edu.unifio.moviereview.dto;

import jakarta.validation.constraints.*;

public record ResenhaRequest(
        @NotNull(message = "Usuário não informado")
        Long usuarioId,

        @NotNull(message = "Escolha o filme ou série")
        Long tituloId,

        @NotBlank(message = "Dê um título para a resenha")
        @Size(max = 120, message = "O título pode ter no máximo 120 caracteres")
        String manchete,

        @NotBlank(message = "Escreva o texto da resenha")
        @Size(max = 2000, message = "O texto pode ter no máximo 2000 caracteres")
        String texto,

        @NotNull(message = "Dê uma nota")
        @Min(value = 1, message = "A nota deve ser de 1 a 5")
        @Max(value = 5, message = "A nota deve ser de 1 a 5")
        Integer nota
) {
}
