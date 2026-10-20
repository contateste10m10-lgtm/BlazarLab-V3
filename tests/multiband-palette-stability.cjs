#!/usr/bin/env node
'use strict';
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const js=fs.readFileSync(path.join(root,'blazarlab.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const changelog=fs.readFileSync(path.join(root,'CHANGELOG.md'),'utf8');
assert.match(js,/svg:not\(\[id\$="HeatmapPlot"\]\):not\(#multibandCurvePlot\) \[stroke\]/,'remapeamento global deve ignorar a curva multibanda');
assert.match(js,/stroke="\$\{chartDisplayColor\(row\.bandColor\)\}"/,'curva gera a série com a cor resolvida para a paleta selecionada');
assert.match(js,/fill="\$\{chartDisplayColor\(row\.bandColor\)\}"/,'marcadores da banda ativa usam o mesmo mapeamento fixo');
assert.match(js,/drawMultibandCurve\(true\)/,'trocas visuais redesenham a curva sem preservar cores remapeadas antigas');
assert.match(html,/id="multibandCurvePlot"/);
assert.match(changelog,/cores de banda.*não mudam ao alternar entre os fundos AGN e Nebulosa/i);
console.log('OK: curva multibanda isolada do remapeamento SVG global; série usa mapeamento de paleta consistente.');
