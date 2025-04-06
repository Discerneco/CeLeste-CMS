<script lang="ts">
  import { locale, t } from '$lib/i18n';
  import { page } from '$app/stores';
  
  export let showLabels = true;
  
  // Get current path without language prefix
  $: currentPath = $page.url.pathname;
  $: pathWithoutLang = currentPath.replace(/^\/[a-z]{2}\//, '/');
  
  // Generate URLs for each language
  $: enUrl = `/en${pathWithoutLang}`;
  $: ptUrl = `/pt${pathWithoutLang}`;
  
  function setLocale(newLocale: string) {
    locale.set(newLocale);
  }
</script>

<div class="language-switcher flex items-center space-x-2">
  <a 
    href={enUrl} 
    class="lang-link {$locale === 'en' ? 'font-bold text-primary' : 'text-gray-600 hover:text-primary'}"
    on:click|preventDefault={() => setLocale('en')}
    aria-label="Switch to English"
  >
    <span class="flag">🇺🇸</span>
    {#if showLabels}
      <span class="ml-1">EN</span>
    {/if}
  </a>
  
  <span class="text-gray-300">|</span>
  
  <a 
    href={ptUrl} 
    class="lang-link {$locale === 'pt' ? 'font-bold text-primary' : 'text-gray-600 hover:text-primary'}"
    on:click|preventDefault={() => setLocale('pt')}
    aria-label="Switch to Portuguese"
  >
    <span class="flag">🇧🇷</span>
    {#if showLabels}
      <span class="ml-1">PT</span>
    {/if}
  </a>
</div>

<style>
  .language-switcher {
    display: flex;
    align-items: center;
  }
  
  .lang-link {
    display: flex;
    align-items: center;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: all 0.2s;
  }
</style>
