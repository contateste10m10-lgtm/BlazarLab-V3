#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const js = fs.readFileSync(path.join(root, 'blazarlab.js'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();
assert.equal(version, '1.3.40');
const navMatch = html.match(/<nav\b[^>]*id="siteNav"[^>]*>([\s\S]*?)<\/nav>/);
assert.ok(navMatch, 'a navegação principal deve existir');
const navHTML = navMatch[1];
const labels = ['Os métodos', 'Comparar', 'Explorar', 'Multibanda', 'Resultados', 'Referências'];
for (const label of labels) {
  const link = navHTML.match(new RegExp(`<a href="#[^"]+">(?:(?!<\\/a>)[\\s\\S])*<span class="site-nav-label">${label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}<\\/span>(?:(?!<\\/a>)[\\s\\S])*<\\/a>`));
  assert.ok(link, `o item ${label} deve ter ícone e rótulo textual`);
}
assert.equal((navHTML.match(/class="site-nav-icon"/g) || []).length, 6, 'cada item deve ter exatamente um ícone');
assert.equal((navHTML.match(/aria-hidden="true" focusable="false" class="site-nav-icon"/g) || []).length, 6, 'ícones decorativos devem ficar fora da árvore de acessibilidade');
assert.match(navHTML, /<a href="#explorar"><svg[^>]*class="site-nav-icon"[^>]*>[\s\S]*?cx="12" cy="13" r="2"[\s\S]*?<\/svg><span class="site-nav-label">Explorar<\/span><\/a>/, 'Explorar deve usar o desenho de telescópio de referência');
assert.match(navHTML, /<a href="#resultados"><svg[^>]*class="site-nav-icon"[^>]*>[\s\S]*?M12 16v5[\s\S]*?M16 14\.639V21[\s\S]*?M20 10\.656V21[\s\S]*?<\/svg><span class="site-nav-label">Resultados<\/span><\/a>/, 'Resultados deve usar o gráfico combinado de linha e barras de referência');
assert.match(css, /\.site-nav \.site-nav-icon\{[^}]*stroke:currentColor/s, 'ícones devem herdar a cor do link ativo do tema');
assert.match(css, /@keyframes blazarlab-nav-icon-tap/, 'a microanimação precisa estar definida');
assert.match(css, /prefers-reduced-motion:reduce\)\{\s*\.site-nav \.site-nav-icon/s, 'a microanimação deve respeitar movimento reduzido');
assert.match(css, /@media \(min-width:781px\) and \(max-width:1240px\)/, 'o cabeçalho compacto deve acomodar ícones e controles opcionais no intervalo intermediário');
assert.match(css, /@media \(min-width:781px\) and \(max-width:1240px\)\{\s*\.header-inner\{display:grid;[\s\S]*?\.nav-toggle\{[^}]*display:flex/s, 'o menu compacto permanece realmente ativo até 1240 px');
assert.match(js, /const animateNavIcon = link =>/, 'o clique precisa usar um controlador dedicado');
assert.match(js, /window\.matchMedia\?\.\('\(prefers-reduced-motion: reduce\)'\)/, 'o controlador deve consultar a preferência dinâmica de movimento reduzido');
assert.match(js, /site-nav-icon--clicked/, 'o clique precisa reiniciar e limpar a classe de animação');
assert.match(js, /delayedNavClose/, 'o menu móvel deve manter a linha visível por um instante para o feedback de toque');
assert.doesNotMatch(css, /\.site-nav \.site-nav-icon\{[^}]*color:\s*#[0-9a-f]{3,8}/i, 'ícones não podem fixar uma cor que conflite com temas/paletas');
console.log('OK: 6 ícones semânticos, microanimação de clique, currentColor, movimento reduzido e breakpoint compacto V1.3.40.');


// Behavioral test of initNavigation() with a tiny DOM/timer model.
class Classes {
  constructor(...names) { this.s = new Set(names); }
  add(name) { this.s.add(name); }
  remove(name) { this.s.delete(name); }
  contains(name) { return this.s.has(name); }
  toggle(name, force) { if (force === undefined) { if (this.s.has(name)) this.s.delete(name); else this.s.add(name); } else if (force) this.s.add(name); else this.s.delete(name); return this.s.has(name); }
}
class FakeNode {
  constructor(kind = 'node') { this.kind=kind; this.classList=new Classes(); this.attrs={}; this.handlers={}; this.innerHTML=''; this.textContent=''; this.offsetWidth=16; this.dataset={}; }
  addEventListener(type, fn) { (this.handlers[type] ||= []).push(fn); }
  fire(type, event={}) { for (const fn of this.handlers[type] || []) fn({target:this, ...event}); }
  setAttribute(name, value) { this.attrs[name]=String(value); }
  getAttribute(name) { return this.attrs[name] ?? null; }
  querySelector(selector) { return selector === '.sr-only' ? (this.label ||= new FakeNode('label')) : selector === '.site-nav-icon' ? this.icon : null; }
  querySelectorAll(selector) { return selector === 'a' ? this.links || [] : []; }
  closest() { return null; }
  focus() { this.focused=true; }
}
const links = labels.map((label, i) => {
  const link = new FakeNode('link'); link.labelText=label; link.icon=new FakeNode('svg-icon'); link.querySelector=(selector)=>selector === '.site-nav-icon' ? link.icon : null; return link;
});
const fakeNav = new FakeNode('nav'); fakeNav.links=links;
const fakeToggle = new FakeNode('toggle'); fakeToggle.label=new FakeNode('label');
const fakeRoot = new FakeNode('html');
const timers = new Map(); let nextTimer=0;
const docListeners = {};
const fakeDocument = {
  documentElement: fakeRoot,
  getElementById(id) { return id === 'siteNav' ? fakeNav : id === 'navToggle' ? fakeToggle : null; },
  querySelectorAll() { return []; },
  addEventListener(type, fn) { (docListeners[type] ||= []).push(fn); }
};
let reduceMotion = false;
const fakeWindow = {
  innerWidth: 390,
  matchMedia() { return {matches:reduceMotion}; },
  addEventListener() {},
  setTimeout(fn, delay) { const id=++nextTimer; timers.set(id,{fn,delay}); return id; },
  clearTimeout(id) { timers.delete(id); }
};
const start = js.indexOf('  function initNavigation() {');
const end = js.indexOf('\n  function methodSimulationMarkup', start);
assert.ok(start >= 0 && end > start, 'a função de navegação deve existir para o teste comportamental');
const isolated = js.slice(start,end) + '\nthis.__initNavigation = initNavigation;';
const context = {document:fakeDocument, window:fakeWindow, selectScenario(){}, console, Boolean, Number, WeakMap};
vm.runInNewContext(isolated, context, {timeout:1000});
context.__initNavigation();
// Desktop click animates only the chosen icon and removes the transient state.
links[0].fire('click');
assert.equal(links[0].icon.classList.contains('site-nav-icon--clicked'), true, 'clicar deve ativar o microfeedback do ícone');
assert.equal(links[1].icon.classList.contains('site-nav-icon--clicked'), false, 'o clique não deve animar os outros ícones');
const animationTimer = [...timers.entries()].find(([, timer]) => timer.delay === 270);
assert.ok(animationTimer, 'a classe transitória precisa de limpeza programada');
animationTimer[1].fn();
assert.equal(links[0].icon.classList.contains('site-nav-icon--clicked'), false, 'o microfeedback precisa se limpar sozinho');
// Mobile menu gives the icon a brief moment before closing, but Escape/outside close immediately.
fakeNav.classList.add('is-open'); fakeToggle.setAttribute('aria-expanded','true');
links[2].fire('click');
assert.equal(fakeNav.classList.contains('is-open'), true, 'o menu móvel permanece brevemente visível durante o feedback');
const closeTimer = [...timers.entries()].find(([, timer]) => timer.delay === 230);
assert.ok(closeTimer, 'o fechamento móvel deve ser adiado somente pelo tempo do feedback');
closeTimer[1].fn();
assert.equal(fakeNav.classList.contains('is-open'), false, 'o menu fecha depois do microfeedback');
// Reduced motion avoids setting the animation class or delaying menu closure.
reduceMotion = true; fakeRoot.classList.add('reduce-motion');
fakeNav.classList.add('is-open'); fakeToggle.setAttribute('aria-expanded','true');
const beforeTimers=timers.size;
links[4].fire('click');
assert.equal(links[4].icon.classList.contains('site-nav-icon--clicked'), false, 'movimento reduzido deve omitir a animação');
assert.equal(fakeNav.classList.contains('is-open'), false, 'com movimento reduzido, a navegação fecha sem atraso');
assert.equal(timers.size, beforeTimers, 'movimento reduzido não deve criar timers de feedback');
console.log('OK: teste comportamental do feedback de clique, fechamento móvel e movimento reduzido.');
