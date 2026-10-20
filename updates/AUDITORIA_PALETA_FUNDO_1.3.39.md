# Auditoria de paleta e fundos — BlazarLab v1.3.39

## Pedido aplicado

- **Azul original + AGN/Nebulosa:** as variantes azuis das próprias ilustrações continuam visíveis; o conteúdo usa superfícies neutras frias/azul-marinho e bordas azuis. Não deve haver lavagem rosa/vinho nas seções e cartões por selecionar um fundo astronômico.
- **Rosa cósmico + AGN/Nebulosa:** preserva o tratamento rosa/vermelho da identidade Rosa cósmico.
- **Sem fundo:** não recebe as regras específicas dos fundos astronômicos.
- A seleção de fundo, a paleta, o tema claro/escuro e a ativação de som continuam estados separados; o som segue desligado por padrão.
- As regras não alteram as cores codificadas por valor nos heatmaps e não mudam as séries, fórmulas ou medidas científicas.

## Verificação

Teste de regressão: `tests/palette-background-independence.cjs`. A inspeção de navegador avalia combinações de tema claro/escuro, Azul/Rosa cósmico e Sem fundo/AGN/Nebulosa. Conferir também o relatório de auditoria do pacote gerado após executar a suíte completa.

## Limite

Este pacote corrige o código-fonte para futura publicação. A página do GitHub Pages só muda após o proprietário publicar os arquivos atualizados; a inspeção do endereço publicado não equivale a um deploy.
