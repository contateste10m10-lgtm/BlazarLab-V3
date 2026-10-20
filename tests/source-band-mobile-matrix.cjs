#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'blazarlab.js'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
const changelog = fs.readFileSync(path.join(root, 'CHANGELOG.md'), 'utf8');

assert.equal(version, '1.3.40', 'o pacote deve declarar a versão atual');
assert.match(html, /id="sampenBandHeatmapMobileMatrix" hidden/, 'a matriz HTML móvel deve existir sem afetar o desktop');
assert.match(html, /class="chart-frame chart-frame-scrollwide matrix-scroll-frame source-band-desktop-frame"/, 'a matriz SVG deve manter uma moldura própria para desktop');
assert.match(js, /function sourceBandMobileTableMarkup\(sources, currentSource, lo, hi\)/, 'a matriz móvel deve ser gerada com os dados calculados');
assert.match(js, /mobileMatrix && typeof mobileMatrix\.insertAdjacentElement === 'function'\) mobileMatrix\.insertAdjacentElement\('afterend', details\)/, 'a tabela detalhada deve ficar depois da matriz móvel visível');
assert.match(js, /sourceBandMobileTableMarkup\(MULTIBAND\.sources, current, lo, hi\)/, 'o mapa deve usar todas as fontes sintéticas e a escala global');
assert.match(js, /caption class="sr-only">Sample Entropy por fonte sintética/, 'a tabela mantém caption acessível sem texto longo dentro da área rolável');
assert.match(js, /const sourceHeatContainers=\[sourceHeat,sourceHeatMobile\]\.filter\(Boolean\)/, 'SVG e matriz móvel compartilham a seleção');
assert.match(js, /data-source-row="\$\{ri\}"/, 'cada linha mantém o índice da fonte para navegação por teclado');
assert.match(js, /aria-pressed="\$\{isCurrent \? 'true' : 'false'\}"/, 'a combinação ativa é exposta semanticamente');
assert.match(css, /@media\(max-width:899px\)\{[\s\S]*?\.source-band-desktop-frame\{display:none!important\}[\s\S]*?\.source-band-mobile-matrix:not\(\[hidden\]\)\{display:block\}/, 'em telas estreitas a tabela substitui o SVG largo');
assert.match(css, /\.source-band-mobile-cell\{[^}]*min-height:44px/s, 'os controles da matriz móvel devem ter altura de toque adequada');
assert.match(css, /\.source-band-mobile-corner,\.source-band-mobile-source\{position:sticky;left:0/s, 'o identificador da fonte permanece visível durante a rolagem horizontal');
assert.match(css, /\.source-band-mobile-scroll\{[^}]*overflow-x:auto/s, 'a rolagem ocorre dentro do gráfico, não na página');
assert.match(css, /\.sensitivity-mobile-cell\{min-height:44px;font-size:11px\}/, 'as células da matriz m×r têm altura mínima de 44 px em celular');
assert.match(readme, /## Novidades V1\.3\.27/);
assert.match(changelog, /## 1\.3\.27/);
for (const doc of [readme, changelog, fs.readFileSync(path.join(root, 'README-GITHUB-UPLOAD.md'), 'utf8')]) {
  assert.doesNotMatch(doc, /easter egg|13 alternâncias|desbloqueio secreto|mecanismo secreto/i, 'a documentação pública não deve descrever mecanismos reservados');
  assert.doesNotMatch(doc, /tests\/secret-palette-sound\.cjs/i, 'a documentação pública não deve expor nomes internos de testes de recursos reservados');
}
console.log('OK: matriz fonte × banda responsiva, 192 células previstas, seleção sincronizada, toque/teclado e documentação pública V1.3.40.');
