# Auditoria de tema, fundo, som e cores — BlazarLab v1.3.38

## Escopo

Deixar os controles visuais disponíveis desde o primeiro acesso e impedir que a troca entre fundos AGN e Nebulosa remapeie repetidamente as cores da curva multibanda principal.

## Alterações

- O seletor de paleta, os fundos astronômicos e o controle sonoro não exigem mais uma sequência de desbloqueio.
- Paleta e fundo são restaurados da preferência local. O fallback é Azul original + fundo normal.
- Som não é reproduzido automaticamente: fica desligado até que a pessoa pressione o controle. Isso evita áudio inesperado e respeita as políticas de reprodução dos navegadores.
- `multibandCurvePlot` é excluído da reescrita global de cores dos SVGs. A curva ainda usa a paleta atual ao ser desenhada, mas alternar AGN ↔ Nebulosa com Rosa cósmico não deve alterar as cores das bandas. Outros gráficos seguem a paleta global como antes.
- O zoom continua ativado por escolha do usuário para não interceptar a rolagem de celular por padrão.

## Limites e validação

Foram executados os testes de regressão do repositório e o teste de fumaça nas larguras 320, 360, 390, 430, 600, 768, 1024 e 1280 px. A validação visual automatizada em Chromium é complementar; recomenda-se teste manual com AGN + Rosa cósmico, Nebulosa + Rosa cósmico, os dois temas e controles sonoros em desktop e celular. Nenhum dado, fórmula ou cálculo científico foi alterado.
