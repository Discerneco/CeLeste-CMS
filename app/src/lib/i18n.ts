import { browser } from '$app/environment';
import { init, register, locale as i18nLocale, dictionary, getLocaleFromNavigator } from 'svelte-i18n';

// Re-export the locale store for use in components
export const locale = i18nLocale;
import { derived, writable } from 'svelte/store';

// Create a store for language detection
export const detectedLocale = writable<string | null>(null);

// Define supported languages
export const supportedLocales = ['en', 'pt'];
export const defaultLocale = 'en';

// Register dictionaries
// Use a type assertion to handle the module import errors
register('en', async () => {
  const module = await import('../locales/en.json');
  return module.default || module;
});
register('pt', async () => {
  const module = await import('../locales/pt.json');
  return module.default || module;
});

// Initialize i18n
export function setupI18n() {
  init({
    fallbackLocale: defaultLocale,
    initialLocale: browser ? getLocaleFromNavigator() : defaultLocale,
  });

  // Set up locale detection
  if (browser) {
    // Try to detect from URL first (e.g., /pt/about)
    const path = window.location.pathname;
    const pathLocale = path.match(/^\/([a-z]{2})\//)?.[1];
    
    if (pathLocale && supportedLocales.indexOf(pathLocale) !== -1) {
      locale.set(pathLocale);
      detectedLocale.set(pathLocale);
    } else {
      // Try to detect from browser
      const browserLocale = getLocaleFromNavigator()?.split('-')[0];
      
      if (browserLocale && supportedLocales.indexOf(browserLocale) !== -1) {
        locale.set(browserLocale);
        detectedLocale.set(browserLocale);
      } else {
        // Fallback to default
        locale.set(defaultLocale);
        detectedLocale.set(defaultLocale);
      }
    }
  }
}

// Helper to get localized content from Airtable records
export function getLocalizedField(record: any, field: string, lang?: string) {
  // Get the current locale value from the store
  let currentLang: string = lang || '';
  if (!currentLang) {
    // Since locale is a store, we need to get its current value
    let currentLocale: string = defaultLocale;
    const unsubscribe = locale.subscribe(value => {
      currentLocale = value || defaultLocale;
    });
    unsubscribe();
    currentLang = currentLocale;
  }
  
  const suffix = currentLang === 'pt' ? '_pt' : '_en';
  return record[`${field}${suffix}`] || record[`${field}_en`]; // Fallback to English
}

// Create a derived store for translated messages
export const t = derived(
  [locale, dictionary],
  ([$locale, $dictionary]) => (key: string, vars: Record<string, any> = {}) => {
    if (!$dictionary || !$locale || !$dictionary[$locale]) {
      return key;
    }

    // Get the translation from the dictionary
    let text = $dictionary[$locale][key];

    // Replace variables in the text
    if (text && typeof text === 'string' && vars) {
      // Use a safer approach with Object.keys
      Object.keys(vars).forEach((k) => {
        const regex = new RegExp(`{${k}}`, 'g');
        text = typeof text === 'string' ? text.replace(regex, String(vars[k])) : text;
      });
    }

    return text || key;
  }
);
