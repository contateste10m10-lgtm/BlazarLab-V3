#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
assert.equal(version, '1.3.40');
assert.equal((css.match(/\.source-band-mobile-table thead th:not\(\.source-band-mobile-corner\)\{font-size:/g) || []).length, 3,
  'o tamanho dos cabeçalhos deve ter um valor base e dois breakpoints explícitos');
assert.equal((css.match(/\.source-band-mobile-source strong\{font-size:/g) || []).length, 3,
  'o nome da fonte deve ter um valor base e dois breakpoints explícitos');
assert.equal((css.match(/\.source-band-mobile-source small\{font-size:/g) || []).length, 3,
  'o rótulo de classe deve ter um valor base e dois breakpoints explícitos');
assert.equal((css.match(/\.source-band-mobile-cell\{font-size:/g) || []).length, 3,
  'o valor da célula deve ter um valor base e dois breakpoints explícitos');
assert.match(css, /\.source-band-mobile-cell\{[^}]*min-height:44px/s, 'as células mantêm alvos de toque adequados');
assert.match(css, /\.source-band-mobile-corner,\.source-band-mobile-source\{position:sticky;left:0/s,
  'a identificação da fonte continua visível durante a rolagem horizontal');
assert.match(css, /\.source-band-mobile-scroll\{[^}]*overflow-x:auto/s,
  'a rolagem continua confinada à matriz');
assert.match(css, /@media\(max-width:480px\)\{\s*\.source-band-mobile-table thead th:not\(\.source-band-mobile-corner\)\{font-size:10\.5px/,
  'telefones estreitos recebem uma redução controlada, não uma cascata desordenada');
assert.match(css, /@media\(max-width:380px\)\{\s*\.source-band-mobile-table thead th:not\(\.source-band-mobile-corner\)\{font-size:10\.5px/,
  'o menor breakpoint preserva a legibilidade dos cabeçalhos');
console.log('OK: tipografia do heatmap centralizada e breakpoints explícitos — BlazarLab 1.3.40.');
