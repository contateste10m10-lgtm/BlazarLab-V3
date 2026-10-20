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
assert.equal(version, '1.3.40', 'a suíte deve acompanhar a versão de estabilidade das animações');
assert.match(js, /function initExperimentalMotionLab\(\)/, 'o controlador de animações experimentais deve existir');
assert.match(js, /new IntersectionObserver\(/, 'revelações devem ocorrer ao entrar na viewport, sem polling contínuo');
assert.match(js, /prefers-reduced-motion:\s*reduce/, 'a preferência de movimento reduzido deve ser consultada');
assert.match(js, /initExperimentalMotionLab\(\);/, 'o controlador deve ser iniciado pela inicialização principal');
assert.match(js, /line\.getTotalLength\(\)/, 'o comprimento do traçado SVG deve ser medido quando possível');
for (const keyframe of ['blazarlab-signal-trace', 'blazarlab-peak-emphasis', 'blazarlab-orbit-one', 'blazarlab-orbit-two', 'blazarlab-orbit-three']) {
  assert.ok(css.includes(`@keyframes ${keyframe}`), `keyframe ausente: ${keyframe}`);
}
assert.match(css, /html\.motion-lab-active \[data-motion-reveal\]\.motion-revealed:not\(\[data-motion-reveal-effect=\"opacity\"\]\)/, 'revelação com movimento deve excluir os cartões sem transformação');
assert.match(js, /data-motion-reveal-effect/, 'cartões com hover devem usar revelação por opacidade');
assert.match(js, /document\.addEventListener\('focusin', revealFocusedTarget, true\)/, 'o foco deve revelar conteúdo antes de permanecer nele');
assert.match(js, /for \(const timer of revealTimers\) window\.clearTimeout\(timer\)/, 'mudança de preferência deve cancelar timers pendentes');
assert.equal((js.match(/motionPreference\.addEventListener\('change', syncMotionPreference\)/g) || []).length, 1, 'deve existir um único ouvinte sincronizado para a preferência');
assert.match(css, /html\.reduce-motion\.motion-lab-active \[data-motion-reveal\][\s\S]*?opacity:\s*1\s*!important/, 'movimento reduzido não pode deixar conteúdos invisíveis');
assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/, 'CSS deve cobrir a preferência do sistema');
assert.match(css, /html\.motion-lab-active \.hero-visual \.signal-line/, 'curva ilustrativa do hero deve ter o traçado animado');
assert.doesNotMatch(js, /setInterval\(/, 'a camada experimental não deve adicionar timers contínuos de polling');
assert.doesNotMatch(css, /blazarlab-orbit-(?:one|two|three)[^;]*infinite/i, 'as novas animações orbitais não devem repetir indefinidamente sem controle de pausa');
assert.match(html, /Sinal variável ilustrativo/, 'a curva animada deve continuar identificada como ilustração');
console.log(`OK: laboratório experimental de movimento, degradação segura e respeito a movimento reduzido — BlazarLab ${version}.`);
