package br.edu.unifio.moviereview.dto;

import br.edu.unifio.moviereview.model.Tipo;
import jakarta.validation.constraints.*;

public record TituloRequest(
        @NotBlank(message = "Informe o nome do título")
        @Size(max = 150, message = "O nome pode ter no máximo 150 caracteres")
        String nome,

        @NotNull(message = "Informe se é filme ou série")
        Tipo tipo,

        @NotNull(message = "Informe o ano de lançamento")
        @Min(value = 1888, message = "Ano de lançamento inválido")
        @Max(value = 2100, message = "Ano de lançamento inválido")
        Integer anoLancamento,

        @Min(value = 1, message = "Temporadas deve ser pelo menos 1")
        Integer temporadas,

        @Size(max = 1000, message = "A sinopse pode ter no máximo 1000 caracteres")
        String sinopse,

        @Size(max = 5000000, message = "A imagem é grande demais")
        String imagem,

        @NotNull(message = "Escolha um gênero")
        Long generoId
) {
}
