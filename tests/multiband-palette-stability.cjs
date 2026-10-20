#!/usr/bin/env node
'use strict';
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');
const js=fs.readFileSync(path.join(root,'blazarlab.js'),'utf8');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const changelog=fs.readFileSync(path.join(root,'CHANGELOG.md'),'utf8');
assert.match(js,/stroke="\$\{chartDisplayColor\(row\.bandColor\)\}"/,'curva preserva cor semântica fixa da banda');
assert.match(js,/fill="\$\{chartDisplayColor\(row\.bandColor\)\}"/,'marcadores da banda ativa usam a mesma cor semântica');
assert.match(js,/drawMultibandCurve\(true\)/,'trocas visuais redesenham a curva');
assert.match(js,/function chartDisplayColor\(color\)[\s\S]*?LIGHT_CHART_COLORS\[normalized\] \|\| color/,'a série é ajustada só para legibilidade no tema claro, não para a paleta rosa');
assert.doesNotMatch(js,/SECRET_CHART_COLORS|activeSecretChartColors|paletteOriginalFill|svg:not\(\[id\$="HeatmapPlot"\]\)/,'remapeamento global de cores da série foi removido');
assert.match(js,/chartDisplayColor\('#61B9DF'\)/,'realce do ponto selecionado usa tom frio e não rosa/vermelho da interface');
assert.doesNotMatch(js,/chartDisplayColor\('#FDA4AF'\)/,'não resta cor de destaque rosa embutida em gráfico científico');
assert.match(html,/id="multibandCurvePlot"/);
assert.match(changelog,/Removido o remapeamento Rosa Cósmico dos traços, marcadores, classes e exportações PNG dos gráficos/i);
console.log('OK: cores de série e multibanda independem da paleta Rosa Cósmico e dos fundos.');
