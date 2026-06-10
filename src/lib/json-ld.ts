/**
 * Characters that must be escaped before embedding JSON inside an inline
 * <script> element. "<", ">" and "&" stop a "</script>" sequence (or HTML
 * entity) from breaking out of the tag; U+2028 and U+2029 are valid in JSON
 * but are illegal raw inside a JavaScript string and break some parsers.
 *
 * The class is built from an escaped ASCII string (rather than a regex literal
 * containing the raw separators) so the source file stays free of invisible
 * characters.
 */
const JSON_LD_ESCAPE_RE = new RegExp('[<>&\\u2028\\u2029]', 'g');

/**
 * Serialize an object for embedding inside a <script type="application/ld+json">
 * tag. Plain JSON.stringify is unsafe here because a CMS-supplied value could
 * contain "</script>" and break out of the script element. Escaping the unsafe
 * characters keeps the payload inert while remaining valid JSON.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(
    JSON_LD_ESCAPE_RE,
    (ch) => '\\u' + ch.charCodeAt(0).toString(16).padStart(4, '0'),
  );
}

/**
 * Return the ISO-8601 string for a date-like value, or undefined when the value
 * is missing or unparseable. Guards against `new Date(bad).toISOString()`
 * throwing "Invalid time value", which would otherwise blank a whole page.
 */
export function toIsoDateOrUndefined(
  value: Date | string | number | undefined | null,
): string | undefined {
  if (value === undefined || value === null || value === '') return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}
