#!/usr/bin/env node
'use strict';
const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..');const css=fs.readFileSync(path.join(root,'styles.css'),'utf8');const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
assert.equal(fs.readFileSync(path.join(root,'VERSION'),'utf8').trim(),'1.3.40');
assert.match(css,/body:before\{content:"";position:fixed;inset:0;pointer-events:none;z-index:-1/,'camada base está fixa ao viewport');
assert.match(css,/@media\(max-width:780px\)\{\s*html:is\(\[data-background-mode="agn"\],\[data-background-mode="nebula"\]\) body\{\s*background-color:transparent!important;background-image:none!important/,'remove background-image do body no mobile para evitar escala de página inteira');
const expectedAssets={
  'dark/rose/agn':'agn-background.svg','dark/rose/nebula':'nebula-background-mobile-rose.svg',
  'dark/blue/agn':'agn-background-blue.svg','dark/blue/nebula':'nebula-background-mobile-blue.svg',
  'light/rose/agn':'agn-background-light-rose.svg','light/rose/nebula':'nebula-background-mobile-light-rose.svg',
  'light/blue/agn':'agn-background-light-blue.svg','light/blue/nebula':'nebula-background-mobile-light-blue.svg'
};
for(const [key,asset] of Object.entries(expectedAssets)){
  const [theme,palette,mode]=key.split('/');
  const rule=css.match(new RegExp(`html\\[data-theme="${theme}"\\]\\[data-accent-palette="${palette}"\\]\\[data-background-mode="${mode}"\\] body::before\\{([^}]*)\\}`));
  assert.ok(rule,`regra móvel ${key} existe`);
  assert.ok(rule[1].includes(`assets/${asset}`),`${key} seleciona ${asset}`);
  assert.ok(fs.statSync(path.join(root,'assets',asset)).size>500,`arte ${asset} existe e não está vazia`);
}
assert.doesNotMatch(html,/BlazarLab_13/,'metadados e preview do site não apontam para repositório antigo');
assert.match(html,/BlazarLab-V3\/assets\/social-preview\.png/,'imagem social usa o caminho publicado correto');
console.log('OK: oito combinações responsivas de fundo e metadados GitHub Pages V3.');
