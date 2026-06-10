import { describe, expect, it } from 'vitest';
import { serializeJsonLd, toIsoDateOrUndefined } from './json-ld';

describe('serializeJsonLd', () => {
  it('produces valid JSON that round-trips', () => {
    const data = { '@type': 'Thing', name: 'Russo NV' };
    expect(JSON.parse(serializeJsonLd(data))).toEqual(data);
  });

  it('escapes a "</script>" breakout attempt so the tag cannot close early', () => {
    const out = serializeJsonLd({ name: '</script><script>alert(1)</script>' });
    expect(out).not.toContain('</script>');
    expect(out).not.toContain('<');
    expect(out).not.toContain('>');
    // Still parses back to the original string.
    expect(JSON.parse(out).name).toBe('</script><script>alert(1)</script>');
  });

  it('escapes & and the U+2028/U+2029 separators', () => {
    const out = serializeJsonLd({ a: 'A&B', b: 'x y z' });
    expect(out).toContain('\\u0026');
    expect(out).toContain('\\u2028');
    expect(out).toContain('\\u2029');
    const parsed = JSON.parse(out);
    expect(parsed.a).toBe('A&B');
    expect(parsed.b).toBe('x y z');
  });
});

describe('toIsoDateOrUndefined', () => {
  it('returns an ISO string for valid input', () => {
    expect(toIsoDateOrUndefined('2024-03-01')).toBe(new Date('2024-03-01').toISOString());
  });

  it('returns undefined for empty / nullish input', () => {
    expect(toIsoDateOrUndefined('')).toBeUndefined();
    expect(toIsoDateOrUndefined(undefined)).toBeUndefined();
    expect(toIsoDateOrUndefined(null)).toBeUndefined();
  });

  it('returns undefined instead of throwing on an unparseable date', () => {
    expect(() => toIsoDateOrUndefined('not-a-date')).not.toThrow();
    expect(toIsoDateOrUndefined('not-a-date')).toBeUndefined();
  });
});
