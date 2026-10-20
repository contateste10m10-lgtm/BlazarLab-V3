# Publicação do BlazarLab V1.3.40
A V1.3.40 parte do pacote revisado da V1.3.36 com os ícones corrigidos. Preserva a nomenclatura `m_SE`, o contexto de `N = 720` e os ícones corrigidos. A paleta, os fundos AGN/Nebulosa e o som opcional ficam disponíveis desde o primeiro acesso; a curva multibanda mantém cores consistentes durante a troca de fundo com Rosa cósmico. Em Azul original, AGN/Nebulosa usam variantes azuis da arte e superfícies frias; Rosa cósmico usa os SVGs rosa/vermelho originais e superfícies rosadas.


1. Faça backup da versão existente do repositório público.
2. Extraia `blazarlab-public-v1.3.40-paleta-fundo-auditoria.zip`.
3. Copie o conteúdo da pasta `blazarlab_v1.3.40/` para a raiz do repositório, mantendo `index.html` na raiz.
4. Publique na branch e pasta configuradas em GitHub Pages.
5. Após a publicação, teste os temas claro/escuro, o menu móvel com ícones e microanimações, a navegação por teclado, a preferência dinâmica de movimento reduzido, as animações dos três métodos, fundos, paletas, áudio opt-in, tabelas dos gráficos, heatmaps, zoom, tela cheia e exportação PNG em desktop e celular, especialmente as combinações Azul + AGN/Nebulosa (superfícies frias, sem rosa) e Rosa cósmico + AGN/Nebulosa (superfícies rosa/vermelho).
6. Confirme que todos os arquivos da mesma versão foram publicados juntos. Os contadores no hero, na metodologia e na galeria devem coincidir com `MULTIBAND_N` (144 pontos por banda).
7. O endereço canônico e `og:url` permanecem em `https://contateste10m10-lgtm.github.io/BlazarLab-V3/` (produção). `https://contateste10m10-lgtm.github.io/teste-2000/` é tratado como endereço de revisão/prévia; não altere os metadados canônicos apenas por publicar uma cópia de teste. Ao publicar em produção, envie todos os arquivos desta mesma versão juntos.

## Verificações locais

Com Node.js instalado, execute na raiz do projeto:

```sh
node --check blazarlab.js
node tests/site-integrity.cjs
node tests/navigation-icon-animation.cjs
node tests/link-asset-audit.cjs
node tests/reference-layout-regression.cjs
node tests/references-class-mobile-regression.cjs
node tests/consistency-regression.cjs
node tests/heatmap-mobile-regression.cjs
node tests/source-band-mobile-matrix.cjs
node tests/responsive-geometry.cjs
node tests/mobile-zoom-regression.cjs
node tests/theme-backgrounds-responsive.cjs
node tests/palette-background-independence.cjs
node tests/performance-optimizations.cjs
node tests/png-theme-export.cjs
node tests/smoke-test.cjs
node tests/fullscreen-regression.cjs
node tests/accessibility-responsive.cjs
node tests/method-showcase.cjs
node tests/method-animation-regression.cjs
node tests/experimental-motion-lab.cjs
node tests/motion-state-regression.cjs
node tests/mobile-matrix-css-regression.cjs
VIEWPORT_WIDTH=320 node tests/smoke-test.cjs
VIEWPORT_WIDTH=390 node tests/smoke-test.cjs
VIEWPORT_WIDTH=430 node tests/smoke-test.cjs
VIEWPORT_WIDTH=600 node tests/smoke-test.cjs
VIEWPORT_WIDTH=768 node tests/smoke-test.cjs
VIEWPORT_WIDTH=1024 node tests/smoke-test.cjs
VIEWPORT_WIDTH=1280 node tests/smoke-test.cjs
```

Os testes automatizados não substituem inspeção visual em navegadores reais e testes com leitores de tela. Recomenda-se validar em Safari/iOS/VoiceOver, Chrome/Android/TalkBack e navegador desktop antes de declarar conformidade WCAG.


Auditoria da versão experimental: consulte `updates/AUDITORIA_ANIMACOES_1.3.32.md` e as capturas em `evidencias-animacoes/`. Esta versão corrige o comportamento da camada de movimento e da navegação acessível; ainda recomendamos confirmar o resultado visual em navegadores e dispositivos reais.
