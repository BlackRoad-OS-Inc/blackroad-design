/**
 * Tests for Design Token Generator
 * Run: npx ts-node --esm test/test_design_tokens.ts
 */
import assert from 'node:assert';
import { 
  BRAND_COLORS, 
  BRAND_GRADIENT, 
  FORBIDDEN_COLORS,
  SPACING,
  generateCSSVariables,
  generateTailwindTheme,
  validateBrandColor 
} from '../src/tokens/generator.js';

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (e: unknown) {
    console.log(`  ✗ ${name}: ${(e as Error).message}`);
    failed++;
  }
}

console.log('\n🎨 Design Token Tests\n');

test('BRAND_COLORS has exactly 6 colors', () => {
  assert.equal(Object.keys(BRAND_COLORS).length, 6);
});

test('hot-pink is #FF1D6C', () => {
  assert.equal(BRAND_COLORS['hot-pink'], '#FF1D6C');
});

test('amber is #F5A623', () => {
  assert.equal(BRAND_COLORS.amber, '#F5A623');
});

test('gradient uses all 4 brand colors', () => {
  assert.ok(BRAND_GRADIENT.includes('#F5A623'));
  assert.ok(BRAND_GRADIENT.includes('#FF1D6C'));
  assert.ok(BRAND_GRADIENT.includes('#9C27B0'));
  assert.ok(BRAND_GRADIENT.includes('#2979FF'));
});

test('gradient uses golden ratio stops', () => {
  assert.ok(BRAND_GRADIENT.includes('38.2%'));
  assert.ok(BRAND_GRADIENT.includes('61.8%'));
});

test('spacing follows golden ratio', () => {
  assert.equal(SPACING.xs, '8px');
  assert.equal(SPACING.sm, '13px');
  assert.equal(SPACING.md, '21px');
});

test('FORBIDDEN_COLORS has 7 old colors', () => {
  assert.equal(FORBIDDEN_COLORS.length, 7);
});

test('validateBrandColor accepts #FF1D6C', () => {
  const r = validateBrandColor('#FF1D6C');
  assert.ok(r.valid);
});

test('validateBrandColor rejects forbidden #FF9D00', () => {
  const r = validateBrandColor('#FF9D00');
  assert.ok(!r.valid);
  assert.ok(r.reason?.includes('Forbidden'));
});

test('generateCSSVariables produces :root block', () => {
  const css = generateCSSVariables({
    primary: { value: '#FF1D6C', type: 'color' }
  });
  assert.ok(css.includes(':root {'));
  assert.ok(css.includes('--br-primary: #FF1D6C'));
});

test('generateTailwindTheme includes br-pink', () => {
  const theme = generateTailwindTheme();
  assert.equal((theme.colors as Record<string, string>)['br-pink'], '#FF1D6C');
});

test('generateTailwindTheme includes gradient', () => {
  const theme = generateTailwindTheme();
  assert.ok((theme.backgroundImage as Record<string, string>)['br-gradient'].includes('linear-gradient'));
});

console.log(`\n${passed + failed} tests: ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);
