#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const version = fs.readFileSync(path.join(root, 'VERSION'), 'utf8').trim();

function attributes(tag) {
  const result = {};
  for (const match of tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return result;
}
function localFile(reference, base = root) {
  const clean = reference.split(/[?#]/, 1)[0];
  if (!clean || clean.startsWith('/')) return null;
  return path.resolve(base, decodeURIComponent(clean));
}

assert.match(version, /^\d+\.\d+\.\d+$/, 'VERSION deve usar semver');

// IDs must be unique so every in-page link has one unambiguous destination.
const ids = [...html.matchAll(/\bid\s*=\s*(?:"([^"]+)"|'([^']+)')/gi)]
  .map(match => match[1] ?? match[2]);
const idSet = new Set(ids);
assert.equal(ids.length, idSet.size, 'IDs HTML duplicados prejudicam as âncoras e os atalhos');

let anchorCount = 0;
let internalCount = 0;
let externalCount = 0;
for (const match of html.matchAll(/<a\b[^>]*>/gi)) {
  const attrs = attributes(match[0]);
  if (!Object.hasOwn(attrs, 'href')) continue;
  anchorCount++;
  const href = attrs.href.trim();
  assert.ok(href, `Link vazio encontrado: ${match[0]}`);

  if (href.startsWith('#')) {
    internalCount++;
    assert.ok(idSet.has(decodeURIComponent(href.slice(1))), `Âncora interna inexistente: ${href}`);
  } else if (/^(https?:|mailto:|tel:)/i.test(href)) {
    externalCount++;
    if (/^https?:/i.test(href)) {
      const url = new URL(href);
      assert.ok(['http:', 'https:'].includes(url.protocol), `Protocolo externo inválido: ${href}`);
      if (attrs.target?.toLowerCase() === '_blank') {
        const rel = new Set((attrs.rel || '').toLowerCase().split(/\s+/).filter(Boolean));
        assert.ok(rel.has('noopener'), `Link _blank sem rel=noopener: ${href}`);
        assert.ok(rel.has('noreferrer'), `Link _blank sem rel=noreferrer: ${href}`);
      }
    }
  } else if (/^(data:|javascript:)/i.test(href)) {
    assert.fail(`Protocolo de link não permitido em conteúdo público: ${href}`);
  } else {
    const file = localFile(href);
    assert.ok(file && file.startsWith(root + path.sep), `Referência local fora do pacote: ${href}`);
    assert.ok(fs.existsSync(file), `Arquivo local referenciado não existe: ${href}`);
  }
}

// Verify page resources (scripts, styles, icons and previews) are packaged locally.
let localResourceCount = 0;
for (const match of html.matchAll(/<(?:script|link)\b[^>]*>/gi)) {
  const attrs = attributes(match[0]);
  const reference = attrs.src || attrs.href;
  if (!reference || /^(https?:|\/\/|data:|#|mailto:)/i.test(reference)) continue;
  const file = localFile(reference);
  assert.ok(file && file.startsWith(root + path.sep), `Recurso HTML fora do pacote: ${reference}`);
  assert.ok(fs.existsSync(file), `Recurso HTML ausente: ${reference}`);
  localResourceCount++;
}

// Verify local CSS url(...) assets too; ignore SVG fragments and embedded data URLs.
const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, '');
let localCssAssetCount = 0;
for (const match of cssWithoutComments.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
  const reference = match[2].trim();
  if (!reference || /^(data:|https?:|\/\/|#)/i.test(reference)) continue;
  const file = localFile(reference);
  assert.ok(file && file.startsWith(root + path.sep), `Recurso CSS fora do pacote: ${reference}`);
  assert.ok(fs.existsSync(file), `Recurso CSS ausente: ${reference}`);
  localCssAssetCount++;
}

// Images, if later added as <img>, must have an alt attribute (empty is allowed for decorative images).
for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
  const attrs = attributes(match[0]);
  assert.ok(Object.hasOwn(attrs, 'alt'), `Imagem sem atributo alt: ${match[0]}`);
}

// Canonical metadata must remain pointed at the production URL, not a preview deployment.
assert.match(html, /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']https:\/\/contateste10m10-lgtm\.github\.io\/BlazarLab-V3\/?["'])[^>]*>/i,
  'URL canônica deve apontar para a publicação de produção');
assert.match(html, /<meta\b(?=[^>]*\bproperty=["']og:url["'])(?=[^>]*\bcontent=["']https:\/\/contateste10m10-lgtm\.github\.io\/BlazarLab-V3\/?["'])[^>]*>/i,
  'og:url deve apontar para a publicação de produção');

console.log(`OK: auditoria de links e recursos v${version}; ${anchorCount} links (${internalCount} âncoras internas, ${externalCount} externos), ${localResourceCount} recursos HTML e ${localCssAssetCount} recursos CSS locais.`);
