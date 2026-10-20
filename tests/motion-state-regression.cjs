#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const rootDir = path.resolve(__dirname, '..');
const js = fs.readFileSync(path.join(rootDir, 'blazarlab.js'), 'utf8');
const html = fs.readFileSync(path.join(rootDir, 'index.html'), 'utf8');
const version = fs.readFileSync(path.join(rootDir, 'VERSION'), 'utf8').trim();
assert.equal(version, '1.3.40');
assert.equal((js.match(/motionPreference\.addEventListener\('change', syncMotionPreference\)/g) || []).length, 1,
  'um único listener deve coordenar a preferência de movimento reduzido');
assert.doesNotMatch(html, /<article class="learning-step" tabindex="0"/,
  'os cartões introdutórios não interativos não devem criar paradas de teclado redundantes');

const start = js.indexOf('  function initExperimentalMotionLab() {');
const end = js.indexOf('\n  function initActiveNavigation()', start);
assert.ok(start >= 0 && end > start, 'o controlador experimental deve poder ser isolado para o teste');
const functionSource = js.slice(start, end).trim();

class FakeClassList {
  constructor(initial = []) { this.values = new Set(initial); }
  add(...values) { values.forEach(value => this.values.add(value)); }
  remove(...values) { values.forEach(value => this.values.delete(value)); }
  contains(value) { return this.values.has(value); }
  toggle(value, force) {
    if (force === undefined) { if (this.values.has(value)) this.values.delete(value); else this.values.add(value); }
    else if (force) this.values.add(value); else this.values.delete(value);
    return this.values.has(value);
  }
}
class FakeStyle {
  constructor() { this.values = new Map(); }
  setProperty(name, value) { this.values.set(name, String(value)); }
  getPropertyValue(name) { return this.values.get(name) || ''; }
  removeProperty(name) { this.values.delete(name); }
}
class FakeElement {
  constructor(classes = [], parent = null) {
    this.classList = new FakeClassList(classes);
    this.parentElement = parent;
    this.attributes = new Map();
    this.style = new FakeStyle();
    this.children = new Set();
    this.parentReveal = null;
  }
  setAttribute(name, value) { this.attributes.set(name, String(value)); }
  getAttribute(name) { return this.attributes.has(name) ? this.attributes.get(name) : null; }
  hasAttribute(name) { return this.attributes.has(name); }
  removeAttribute(name) { this.attributes.delete(name); }
  matches(selector) {
    return String(selector).split(',').some(part => {
      const classes = [...part.matchAll(/\.([a-zA-Z0-9_-]+)/g)].map(match => match[1]);
      return classes.length > 0 && classes.every(className => this.classList.contains(className));
    });
  }
  closest(selector) {
    if (selector === '[data-motion-reveal]') {
      if (this.hasAttribute('data-motion-reveal')) return this;
      if (this.parentReveal?.hasAttribute('data-motion-reveal')) return this.parentReveal;
    }
    return null;
  }
  contains(node) { return node === this || this.children.has(node); }
  getBoundingClientRect() { return { top: 120, bottom: 180, left: 0, right: 100, width: 100, height: 60 }; }
  getTotalLength() { return 120; }
}
class FakeIntersectionObserver {
  constructor(callback) { this.callback = callback; this.targets = new Set(); this.disconnected = false; FakeIntersectionObserver.instances.push(this); }
  observe(element) { this.targets.add(element); }
  unobserve(element) { this.targets.delete(element); }
  disconnect() { this.disconnected = true; this.targets.clear(); }
  reveal(element) { this.callback([{ target: element, isIntersecting: true }], this); }
}
FakeIntersectionObserver.instances = [];

function createHarness({ reduced = false, intersectionObserver = true } = {}) {
  const root = new FakeElement(['html']);
  const parent = new FakeElement(['layout']);
  const targets = [
    new FakeElement(['hero-copy-eyebrow'], parent),
    new FakeElement(['learning-step'], parent),
    new FakeElement(['method-card'], parent),
    new FakeElement(['abstract-card'], parent),
    new FakeElement(['reference-item'], parent)
  ];
  const listeners = new Map();
  const windowListeners = new Map();
  const timers = new Map();
  const clearedTimers = new Set();
  const rafCallbacks = [];
  let nextTimer = 1;
  const mediaListeners = [];
  const mediaQuery = {
    matches: reduced,
    addEventListener(type, callback) { if (type === 'change') mediaListeners.push(callback); },
    addListener(callback) { mediaListeners.push(callback); }
  };
  const doc = {
    documentElement: root,
    querySelectorAll() { return targets; },
    querySelector(selector) { return selector === '.hero-signal .signal-line' ? targets[0] : null; },
    addEventListener(type, callback) { if (!listeners.has(type)) listeners.set(type, []); listeners.get(type).push(callback); }
  };
  const win = {
    innerHeight: 800,
    matchMedia() { return mediaQuery; },
    setTimeout(callback, delay) { const id = nextTimer++; timers.set(id, { callback, delay }); return id; },
    clearTimeout(id) { clearedTimers.add(id); timers.delete(id); },
    requestAnimationFrame(callback) { rafCallbacks.push(callback); return rafCallbacks.length; },
    addEventListener(type, callback) { if (!windowListeners.has(type)) windowListeners.set(type, new Set()); windowListeners.get(type).add(callback); },
    removeEventListener(type, callback) { windowListeners.get(type)?.delete(callback); }
  };
  if (intersectionObserver) win.IntersectionObserver = FakeIntersectionObserver;
  const sandbox = { window: win, document: doc, Map, Set, Array, Number, Boolean, String, IntersectionObserver: FakeIntersectionObserver };
  vm.runInNewContext(`${functionSource}\ninitExperimentalMotionLab();`, sandbox, { timeout: 1000 });
  const dispatchMedia = nextReduced => {
    mediaQuery.matches = nextReduced;
    mediaListeners.forEach(callback => callback({ matches: nextReduced, media: '(prefers-reduced-motion: reduce)' }));
  };
  return { root, targets, listeners, windowListeners, timers, clearedTimers, rafCallbacks, dispatchMedia, mediaQuery, intersectionObserver };
}

// Initial state with movement allowed starts the progressive layer.
const h = createHarness({ reduced: false });
assert.equal(h.root.classList.contains('motion-lab-active'), true, 'a camada deve iniciar quando movimento é permitido');
assert.equal(h.root.classList.contains('reduce-motion'), false);
assert.ok(h.targets.every(target => target.hasAttribute('data-motion-reveal')));
assert.equal(h.targets.find(target => target.classList.contains('method-card')).getAttribute('data-motion-reveal-effect'), 'opacity',
  'cartões com transform de hover devem receber efeito de entrada apenas por opacidade');
assert.ok(h.listeners.get('focusin')?.length, 'o foco deve ter um listener de segurança');
assert.ok(h.listeners.get('focusout')?.length, 'o estado transitório de foco deve poder ser liberado');

const firstObserver = FakeIntersectionObserver.instances.at(-1);
const reference = h.targets.find(target => target.classList.contains('reference-item'));
firstObserver.reveal(reference);
assert.equal(reference.classList.contains('motion-revealed'), true);
assert.equal(h.timers.size, 1, 'revelar deve criar um único timer de limpeza de delay');

// Switching preference to reduce during the session must synchronously clear the layer and timers.
h.dispatchMedia(true);
assert.equal(h.root.classList.contains('reduce-motion'), true);
assert.equal(h.root.classList.contains('motion-lab-active'), false);
assert.equal(firstObserver.disconnected, true, 'o observer anterior deve ser desconectado');
assert.equal(h.timers.size, 0, 'a limpeza deve cancelar timers pendentes');
assert.ok([...h.clearedTimers].length > 0);
assert.ok(h.targets.every(target => !target.hasAttribute('data-motion-reveal')));
assert.ok(h.targets.every(target => !target.classList.contains('motion-revealed')));

// Switching the preference back must restart the layer without page reload.
h.dispatchMedia(false);
assert.equal(h.root.classList.contains('reduce-motion'), false, 'o estado reduce-motion deve ser atualizado antes do reinício');
assert.equal(h.root.classList.contains('motion-lab-active'), true, 'a camada deve reiniciar sem recarga');
assert.ok(h.targets.every(target => target.hasAttribute('data-motion-reveal')));
assert.ok(FakeIntersectionObserver.instances.length >= 2);

// Keyboard focus immediately reveals the hidden card and releases its temporary focus state.
const methodCard = h.targets.find(target => target.classList.contains('method-card'));
const innerButton = new FakeElement(['method-visual-trigger']);
innerButton.parentReveal = methodCard;
(h.listeners.get('focusin') || [])[0]({ target: innerButton });
assert.equal(methodCard.classList.contains('motion-revealed'), true, 'o cartão focado deve ficar visível imediatamente');
assert.equal(methodCard.classList.contains('motion-reveal-focus-visible'), true);
(h.listeners.get('focusout') || [])[0]({ target: innerButton, relatedTarget: new FakeElement(['outside']) });
assert.equal(methodCard.classList.contains('motion-reveal-focus-visible'), false);

// Missing IntersectionObserver gracefully disables the layer while keeping content attributes untouched/visible.
const fallback = createHarness({ reduced: false, intersectionObserver: false });
assert.equal(fallback.root.classList.contains('motion-lab-active'), false);
assert.ok(fallback.targets.every(target => !target.hasAttribute('data-motion-reveal')),
  'sem IntersectionObserver o conteúdo não pode receber estados que o ocultem');

console.log('OK: preferência dinâmica, timers, foco de teclado, entrada sem conflito de hover e fallback de movimento.');
