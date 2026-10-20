#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(root, 'blazarlab.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();

assert.equal(version, '1.3.40', 'o pacote precisa declarar a versão 1.3.40');
assert.match(js, /const MULTIBAND_N = 144;/, 'a extensão da galeria deve estar definida centralmente');
assert.match(html, /SINTÉTICO · 144 PONTOS\/BANDA/, 'o selo inicial deve informar 144 pontos por banda');
assert.match(html, /id="lightcurveRange">144 pontos/, 'o valor inicial no rodapé do gráfico deve ser consistente');
assert.match(html, /curva sintética determinística com 144 pontos por banda/, 'a metodologia deve corresponder à série realmente gerada');
assert.doesNotMatch(html, /240 pontos|240-point|240 points/i, 'não deve persistir o número incorreto de 240 pontos');

const publicUrl = 'https://contateste10m10-lgtm.github.io/BlazarLab-V3/';
assert.match(html, new RegExp(`<link rel="canonical" href="${publicUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), 'canonical precisa apontar para o endereço público');
assert.match(html, new RegExp(`<meta property="og:url" content="${publicUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`), 'og:url precisa apontar para o endereço público');
const imagePath = path.join(root, 'assets', 'social-preview.png');
assert.ok(fs.existsSync(imagePath), 'a imagem PNG de compartilhamento precisa estar no pacote');
const png = fs.readFileSync(imagePath);
assert.deepEqual([...png.subarray(0, 8)], [137, 80, 78, 71, 13, 10, 26, 10], 'a prévia social deve ser um PNG válido');
assert.match(html, /property="og:image"/, 'og:image precisa estar definido');
assert.match(html, /name="twitter:image"/, 'twitter:image precisa estar definido');

for (const id of ['resumo-sampen', 'resumo-fisher', 'resumo-mse']) {
  const start = html.indexOf(`id="${id}"`);
  const card = html.slice(start, html.indexOf('</article>', start) + 10);
  assert.match(card, /<details(?: class="abstract-summary-details")?><summary>Ler resumo<\/summary>/, `o cartão ${id} deve manter o resumo disponível`);
  assert.doesNotMatch(card, /Google Scholar|scholar\.google\.com|Buscar versão do manuscrito/i, `o cartão ${id} não deve conter o atalho removido`);
}
assert.doesNotMatch(html, /scholar\.google\.com|Buscar versão do manuscrito no Google Scholar/i, 'os atalhos Google Scholar devem ter sido removidos por completo');
assert.match(html, /id="comparar-metodos"/, 'a comparação direta entre os três métodos precisa estar presente');
assert.equal((html.match(/class="method-comparison-card /g)||[]).length, 3, 'a comparação deve ter um cartão por método');
assert.match(html, /id="sensitivityMobileMatrix"/, 'a matriz mobile deve ter uma representação responsiva independente');
assert.match(js, /function sensitivityMobileTableMarkup\(/, 'a matriz mobile deve reorientar os eixos para caber na tela');
assert.match(css, /sensitivity-svg-frame svg#sampenSensitivityPlot\{display:block;width:100%!important;min-width:0!important;max-width:100%!important;height:auto!important\}/, 'o heatmap desktop deve ocupar a largura do cartão');
assert.match(css, /@media\(max-width:899px\)\{[\s\S]*?\.sensitivity-svg-frame\{display:none!important\}[\s\S]*?\.sensitivity-mobile-matrix:not\(\[hidden\]\)\{display:block\}/, 'o mobile deve usar a tabela responsiva transposta');
assert.match(html, /DEMONSTRAÇÃO SINTÉTICA/, 'os dados gerados devem ter uma identificação explícita');
assert.match(html, /RESULTADOS REPORTADOS/, 'os resultados observacionais devem ter uma identificação distinta');
assert.match(css, /\.provenance-legend/, 'a legenda de proveniência precisa de estilo');
assert.match(css, /\.method-comparison-link:focus-visible/, 'os atalhos de exploração da comparação devem ter foco visível');

assert.match(js, /if \(totalWeight <= Number\.EPSILON\) return \{ value: null, count: totalLength, distinctPatterns: 0, status: 'zero-weight' \}/, 'WPE sem peso total não deve virar entropia zero');
assert.match(js, /const value = Number\.isFinite\(wpe\.value\) \? wpe\.value : null;/, 'estimativas inválidas devem permanecer indefinidas');
assert.match(js, /const CI = validScales === SCALES \? points\.reduce/, 'CI só pode ser calculado com todas as escalas válidas');
assert.match(js, /Indefinido \(\$\{item\.mse\.validScales\}\/\$\{SCALES\} escalas válidas\)/, 'a interface deve explicar o CI indefinido');
console.log('OK: consistência de amostras, proveniência científica, metadados de compartilhamento e tratamento de escalas indefinidas — BlazarLab 1.3.40.');
