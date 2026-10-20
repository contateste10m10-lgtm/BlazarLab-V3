# Relatório de auditoria — BlazarLab 1.3.30

Data: 2026-10-19

## Escopo desta entrega

Esta versão prioriza integridade de navegação e pacote. As animações e a identidade visual foram deixadas como estavam para que sejam avaliadas em uma versão de teste separada, conforme solicitado. Não foram alterados `index.html`, `styles.css` ou `blazarlab.js`.

## Resultados estáticos

- Todos os 17 testes `.cjs` existentes foram executados antes da preparação desta versão e passaram.
- A análise dos links da página encontrou 30 links: 24 âncoras internas e 6 referências externas por DOI.
- As âncoras internas correspondem a IDs presentes no HTML; não foram encontrados IDs duplicados.
- Os seis destinos DOI foram comparados com registros bibliográficos encontrados na web: Sample Entropy, Fisher–Shannon, Weighted Permutation Entropy, Multiscale Entropy, EntropyHub e Permutation Entropy.
- Os links DOI usam HTTPS e `target="_blank"` com `rel="noopener noreferrer"`.
- Os recursos referenciados pelo HTML e pelos `url(...)` locais do CSS existem dentro do pacote.
- A página não usa elementos `<img>`: a ilustração principal e os gráficos são SVGs inline; fundos e ícones usam SVGs locais. O PNG de prévia social tem dimensão de 1200 × 630 e os SVGs locais passaram pela verificação estrutural XML.
- Foi criado `tests/link-asset-audit.cjs` e acrescentado ao workflow de qualidade do GitHub Actions para reduzir a chance de regressão em âncoras, recursos locais e segurança dos links externos.

## Teste visual em Chromium — limitação do ambiente

Foi tentada a abertura da página com o Chromium 144 instalado no ambiente. O acesso à página local (tanto `file://` quanto servidor HTTP local) foi bloqueado com `ERR_BLOCKED_BY_ADMINISTRATOR`. A política gerenciada do navegador inclui bloqueio de URLs (`URLBlocklist: ["*"]`). Por esse motivo, não foi possível obter uma renderização confiável ou capturas de tela neste ambiente.

Assim, **esta entrega não afirma que a revisão visual em Chromium foi concluída**. A geometria responsiva, sobreposições e comportamento de animação precisam ser conferidos em um ambiente em que o Chromium possa abrir a página. Os testes estáticos existentes cobrem várias condições responsivas, mas não substituem a inspeção real do navegador.

## Animações e ciência

Nenhuma animação foi adicionada, removida ou redesenhada. As simulações existentes foram preservadas para serem avaliadas em uma versão de teste posterior. Nenhuma fórmula, parâmetro científico ou série sintética foi alterada.

## Como repetir as verificações

Na raiz do pacote, com Node.js instalado:

```sh
node --check blazarlab.js
node tests/link-asset-audit.cjs
for test in tests/*.cjs; do node "$test" || exit 1; done
```

A execução de `for` deve ser feita em um shell compatível com Bash/POSIX. Para concluir a auditoria visual pendente, abra `index.html` no Chromium e repita a inspeção em 320, 360, 390, 430, 600, 768, 899, 1024, 1280 e 1440 px.
