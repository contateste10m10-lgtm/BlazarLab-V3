# Auditoria visual e responsiva — BlazarLab 1.3.31

**Data:** 19/10/2026  
**Site examinado:** `https://contateste10m10-lgtm.github.io/teste-2000/`  
**Base do pacote:** 1.3.30; HTML, CSS e JavaScript da interface foram preservados nesta versão.

## Método e limitação de navegação

O Chromium disponível bloqueou a navegação direta para `file://` e `http://localhost` com `ERR_BLOCKED_BY_ADMINISTRATOR`. Para não abandonar a auditoria, a página foi renderizada no motor real do Chromium headless por `page.set_content`, incorporando o `index.html`, `styles.css`, `blazarlab.js` e os recursos gráficos locais em um documento temporário. Isso testa o layout e o comportamento no motor Chromium, mas **não equivale a testar as requisições de rede do site publicado**. O endereço público também foi inspecionado pelo leitor web.

## Responsividade e renderização

Foram inspecionadas as larguras de **320, 360, 390, 430, 600, 768, 899, 1024, 1280 e 1440 px**, incluindo capturas do topo, região intermediária e rodapé. Nos dez cenários, a largura de rolagem do documento (`documentElement.scrollWidth` e `body.scrollWidth`) correspondeu à largura da viewport: **nenhuma rolagem horizontal global foi detectada**.

As matrizes e alguns SVGs são deliberadamente mais largos que o espaço visível; ficam dentro de contêineres com rolagem horizontal localizada. Isso foi tratado como comportamento intencional, e não como transbordamento da página. Em 320 px, a chamada principal se reorganiza em duas linhas; em 390 px os botões cabem lado a lado; em 768–899 px o menu compacto e o arranjo intermediário funcionam; em 1024–1440 px a navegação horizontal e os painéis em colunas são preservados.

## Interações verificadas

- Tema claro → escuro: ambos os controles atualizaram `data-theme` corretamente.
- Menu móvel: o botão alternou `aria-expanded` de `false` para `true` nas larguras em que está presente.
- Console e execução: nenhum erro JavaScript de console, `pageerror` ou requisição local falhada foi observado na renderização autocontida.
- Âncoras internas: as 24 âncoras encontradas apontam para IDs presentes no documento.
- Elementos gráficos: o conteúdo usa SVGs inline e SVGs locais como fundo/ícones; não há imagens `<img>` convencionais no HTML. As visualizações SVG se mantiveram dentro de seus contêineres ou da rolagem localizada.

## Links e referências

A página tem 24 âncoras internas e seis referências externas DOI. Os destinos bibliográficos foram comparados com registros de publicações: Fisher–Shannon (`10.1016/S0375-9601(03)00570-X`), Weighted Permutation Entropy (`10.1103/PhysRevE.87.022911`), Permutation Entropy (`10.1103/PhysRevLett.88.174102`), Multiscale Entropy (`10.1103/PhysRevLett.89.068102`), Sample Entropy (`10.1152/ajpheart.2000.278.6.H2039`) e EntropyHub (`10.1371/journal.pone.0259448`). Os registros bibliográficos correspondentes foram encontrados. Algumas páginas de editoras tiveram redirecionamentos ou limitações do verificador; isso não foi classificado como link quebrado.

O endereço canônico permanece intencionalmente em `/BlazarLab_13/` e o endereço informado `/teste-2000/` continua documentado como prévia/revisão. Não alterei metadados canônicos de produção.

## Correções e decisão técnica

A inspeção não identificou um defeito visual reproduzível que justificasse alterar as regras de layout ou o JavaScript. Por isso, não foram feitas alterações especulativas em `index.html`, `styles.css` ou `blazarlab.js`. Essa é uma decisão deliberada: evitar introduzir regressões num site que já passa nos testes de responsividade e geometria.

- As 18 suítes de teste `.cjs` foram executadas e passaram.
- A auditoria de links/recursos e a verificação sintática do JavaScript passaram.
- Animações existentes foram preservadas para a versão experimental posterior, conforme solicitado.
- Nenhuma fórmula, parâmetro científico ou série sintética foi alterada.

## Como repetir a revisão

A revisão foi executada com Chromium headless e Playwright no ambiente de trabalho, incorporando temporariamente o HTML, CSS, JavaScript e os recursos locais porque a política do navegador bloqueou navegação para arquivos e localhost. Para reproduzir a inspeção visual, abra o `index.html` num ambiente Chromium sem esse bloqueio e confira as mesmas larguras. Os testes automatizados incluídos podem ser repetidos com:

```sh
node --check blazarlab.js
node tests/link-asset-audit.cjs
for test in tests/*.cjs; do node "$test" || exit 1; done
```

Os testes `.cjs` não substituem a inspeção visual; servem como segunda camada de regressão.
