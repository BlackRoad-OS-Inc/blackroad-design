/**
 * BlackRoad Design System — Token Generator
 * Generates CSS variables, Tailwind config, and JS/TS exports from tokens.json
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

interface ColorToken {
  value: string;
  type: 'color';
  description?: string;
}

interface SpacingToken {
  value: string;
  type: 'spacing';
}

interface TypographyToken {
  value: string;
  type: 'typography';
}

interface AnimationToken {
  value: string;
  type: 'animation';
  easing?: string;
}

type Token = ColorToken | SpacingToken | TypographyToken | AnimationToken;
type TokenMap = Record<string, Token | Record<string, Token>>;

/** Brand colors — the authoritative source */
export const BRAND_COLORS = {
  black: '#000000',
  white: '#FFFFFF',
  amber: '#F5A623',
  'hot-pink': '#FF1D6C',
  'electric-blue': '#2979FF',
  violet: '#9C27B0',
} as const;

export type BrandColor = keyof typeof BRAND_COLORS;

/** Brand gradient using golden ratio stops */
export const BRAND_GRADIENT = 
  'linear-gradient(135deg, #F5A623 0%, #FF1D6C 38.2%, #9C27B0 61.8%, #2979FF 100%)';

/** Forbidden colors from the old system — fail if found in code */
export const FORBIDDEN_COLORS = [
  '#FF9D00', '#FF6B00', '#FF0066', '#FF006B', '#D600AA', '#7700FF', '#0066FF'
] as const;

/** Golden ratio spacing scale */
export const SPACING = {
  xs: '8px',
  sm: '13px',   // 8 × φ
  md: '21px',   // 13 × φ
  lg: '34px',   // 21 × φ
  xl: '55px',   // 34 × φ
  '2xl': '89px', // 55 × φ
} as const;

/** Generate CSS custom properties from token map */
export function generateCSSVariables(tokens: TokenMap, prefix = 'br'): string {
  const vars: string[] = [':root {'];
  
  function flatten(obj: TokenMap | Token, path: string[] = []): void {
    if (typeof obj === 'object' && 'value' in obj) {
      const name = `--${prefix}-${path.join('-')}`;
      vars.push(`  ${name}: ${(obj as Token).value};`);
    } else if (typeof obj === 'object') {
      for (const [key, val] of Object.entries(obj)) {
        flatten(val as TokenMap | Token, [...path, key]);
      }
    }
  }
  
  flatten(tokens);
  vars.push('}');
  return vars.join('\n');
}

/** Generate Tailwind theme extension from brand tokens */
export function generateTailwindTheme(): Record<string, unknown> {
  return {
    colors: {
      'br-black': BRAND_COLORS.black,
      'br-white': BRAND_COLORS.white,
      'br-amber': BRAND_COLORS.amber,
      'br-pink': BRAND_COLORS['hot-pink'],
      'br-blue': BRAND_COLORS['electric-blue'],
      'br-violet': BRAND_COLORS.violet,
    },
    spacing: Object.fromEntries(
      Object.entries(SPACING).map(([k, v]) => [`br-${k}`, v])
    ),
    backgroundImage: {
      'br-gradient': BRAND_GRADIENT,
    },
  };
}

/** Validate a hex color is in the brand palette */
export function validateBrandColor(hex: string): { valid: boolean; reason?: string } {
  const upper = hex.toUpperCase();
  if (FORBIDDEN_COLORS.includes(hex as typeof FORBIDDEN_COLORS[number])) {
    return { valid: false, reason: `Forbidden color: ${hex} (old system)` };
  }
  const brandValues = Object.values(BRAND_COLORS).map(c => c.toUpperCase());
  if (!brandValues.includes(upper)) {
    return { valid: false, reason: `${hex} is not in the BlackRoad brand palette` };
  }
  return { valid: true };
}
