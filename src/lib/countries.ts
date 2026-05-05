// Static country data for the contact-form phone input.
// No runtime fetch, no third-party dep — the flag emoji is generated from the
// ISO 3166-1 alpha-2 code at render time, so each row only needs name + dial.

export interface Country {
  iso: string;
  name: string;
  dial: string;
}

export const COUNTRIES: Country[] = [
  // Europe
  { iso: 'AL', name: 'Albania', dial: '355' },
  { iso: 'AD', name: 'Andorra', dial: '376' },
  { iso: 'AT', name: 'Austria', dial: '43' },
  { iso: 'BY', name: 'Belarus', dial: '375' },
  { iso: 'BE', name: 'Belgium', dial: '32' },
  { iso: 'BA', name: 'Bosnia and Herzegovina', dial: '387' },
  { iso: 'BG', name: 'Bulgaria', dial: '359' },
  { iso: 'HR', name: 'Croatia', dial: '385' },
  { iso: 'CY', name: 'Cyprus', dial: '357' },
  { iso: 'CZ', name: 'Czechia', dial: '420' },
  { iso: 'DK', name: 'Denmark', dial: '45' },
  { iso: 'EE', name: 'Estonia', dial: '372' },
  { iso: 'FI', name: 'Finland', dial: '358' },
  { iso: 'FR', name: 'France', dial: '33' },
  { iso: 'DE', name: 'Germany', dial: '49' },
  { iso: 'GI', name: 'Gibraltar', dial: '350' },
  { iso: 'GR', name: 'Greece', dial: '30' },
  { iso: 'HU', name: 'Hungary', dial: '36' },
  { iso: 'IS', name: 'Iceland', dial: '354' },
  { iso: 'IE', name: 'Ireland', dial: '353' },
  { iso: 'IT', name: 'Italy', dial: '39' },
  { iso: 'LV', name: 'Latvia', dial: '371' },
  { iso: 'LI', name: 'Liechtenstein', dial: '423' },
  { iso: 'LT', name: 'Lithuania', dial: '370' },
  { iso: 'LU', name: 'Luxembourg', dial: '352' },
  { iso: 'MT', name: 'Malta', dial: '356' },
  { iso: 'MD', name: 'Moldova', dial: '373' },
  { iso: 'MC', name: 'Monaco', dial: '377' },
  { iso: 'ME', name: 'Montenegro', dial: '382' },
  { iso: 'NL', name: 'Netherlands', dial: '31' },
  { iso: 'MK', name: 'North Macedonia', dial: '389' },
  { iso: 'NO', name: 'Norway', dial: '47' },
  { iso: 'PL', name: 'Poland', dial: '48' },
  { iso: 'PT', name: 'Portugal', dial: '351' },
  { iso: 'RO', name: 'Romania', dial: '40' },
  { iso: 'RU', name: 'Russia', dial: '7' },
  { iso: 'SM', name: 'San Marino', dial: '378' },
  { iso: 'RS', name: 'Serbia', dial: '381' },
  { iso: 'SK', name: 'Slovakia', dial: '421' },
  { iso: 'SI', name: 'Slovenia', dial: '386' },
  { iso: 'ES', name: 'Spain', dial: '34' },
  { iso: 'SE', name: 'Sweden', dial: '46' },
  { iso: 'CH', name: 'Switzerland', dial: '41' },
  { iso: 'TR', name: 'Turkey', dial: '90' },
  { iso: 'UA', name: 'Ukraine', dial: '380' },
  { iso: 'GB', name: 'United Kingdom', dial: '44' },
  { iso: 'VA', name: 'Vatican City', dial: '379' },

  // Americas
  { iso: 'AR', name: 'Argentina', dial: '54' },
  { iso: 'BR', name: 'Brazil', dial: '55' },
  { iso: 'CA', name: 'Canada', dial: '1' },
  { iso: 'CL', name: 'Chile', dial: '56' },
  { iso: 'CO', name: 'Colombia', dial: '57' },
  { iso: 'CR', name: 'Costa Rica', dial: '506' },
  { iso: 'DO', name: 'Dominican Republic', dial: '1' },
  { iso: 'EC', name: 'Ecuador', dial: '593' },
  { iso: 'MX', name: 'Mexico', dial: '52' },
  { iso: 'PA', name: 'Panama', dial: '507' },
  { iso: 'PE', name: 'Peru', dial: '51' },
  { iso: 'US', name: 'United States', dial: '1' },
  { iso: 'UY', name: 'Uruguay', dial: '598' },
  { iso: 'VE', name: 'Venezuela', dial: '58' },

  // Asia & Pacific
  { iso: 'AU', name: 'Australia', dial: '61' },
  { iso: 'BD', name: 'Bangladesh', dial: '880' },
  { iso: 'CN', name: 'China', dial: '86' },
  { iso: 'HK', name: 'Hong Kong', dial: '852' },
  { iso: 'IN', name: 'India', dial: '91' },
  { iso: 'ID', name: 'Indonesia', dial: '62' },
  { iso: 'IR', name: 'Iran', dial: '98' },
  { iso: 'IQ', name: 'Iraq', dial: '964' },
  { iso: 'IL', name: 'Israel', dial: '972' },
  { iso: 'JP', name: 'Japan', dial: '81' },
  { iso: 'JO', name: 'Jordan', dial: '962' },
  { iso: 'KZ', name: 'Kazakhstan', dial: '7' },
  { iso: 'KW', name: 'Kuwait', dial: '965' },
  { iso: 'LB', name: 'Lebanon', dial: '961' },
  { iso: 'MY', name: 'Malaysia', dial: '60' },
  { iso: 'NZ', name: 'New Zealand', dial: '64' },
  { iso: 'PK', name: 'Pakistan', dial: '92' },
  { iso: 'PH', name: 'Philippines', dial: '63' },
  { iso: 'QA', name: 'Qatar', dial: '974' },
  { iso: 'SA', name: 'Saudi Arabia', dial: '966' },
  { iso: 'SG', name: 'Singapore', dial: '65' },
  { iso: 'KR', name: 'South Korea', dial: '82' },
  { iso: 'TW', name: 'Taiwan', dial: '886' },
  { iso: 'TH', name: 'Thailand', dial: '66' },
  { iso: 'AE', name: 'United Arab Emirates', dial: '971' },
  { iso: 'VN', name: 'Vietnam', dial: '84' },

  // Africa
  { iso: 'DZ', name: 'Algeria', dial: '213' },
  { iso: 'AO', name: 'Angola', dial: '244' },
  { iso: 'CM', name: 'Cameroon', dial: '237' },
  { iso: 'EG', name: 'Egypt', dial: '20' },
  { iso: 'ET', name: 'Ethiopia', dial: '251' },
  { iso: 'GH', name: 'Ghana', dial: '233' },
  { iso: 'KE', name: 'Kenya', dial: '254' },
  { iso: 'LY', name: 'Libya', dial: '218' },
  { iso: 'MA', name: 'Morocco', dial: '212' },
  { iso: 'NG', name: 'Nigeria', dial: '234' },
  { iso: 'SN', name: 'Senegal', dial: '221' },
  { iso: 'ZA', name: 'South Africa', dial: '27' },
  { iso: 'TZ', name: 'Tanzania', dial: '255' },
  { iso: 'TN', name: 'Tunisia', dial: '216' },
  { iso: 'UG', name: 'Uganda', dial: '256' },
];

// Convert an ISO 3166-1 alpha-2 code (e.g., "BE") to its Unicode flag emoji
// (e.g., "🇧🇪") by mapping each letter to its Regional Indicator Symbol.
export function flagEmoji(iso: string): string {
  const code = iso.toUpperCase();
  if (code.length !== 2) return '';
  return String.fromCodePoint(
    0x1f1e6 + code.charCodeAt(0) - 65,
    0x1f1e6 + code.charCodeAt(1) - 65,
  );
}

export const DEFAULT_COUNTRY = COUNTRIES.find(c => c.iso === 'BE')!;
