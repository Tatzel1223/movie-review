package br.edu.unifio.moviereview.dto;

import jakarta.validation.constraints.NotBlank;

public record LoginRequest(
        @NotBlank(message = "Informe o nome de usuário")
        String login,

        @NotBlank(message = "Informe a senha")
        String senha
) {
}
