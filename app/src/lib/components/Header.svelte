<script lang="ts">
  import { t } from '$lib/i18n';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  
  export let siteName = 'CeLeste CMS';
  
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="bg-white shadow-sm">
  <div class="container mx-auto px-4 py-4">
    <div class="flex justify-between items-center">
      <!-- Logo and site name -->
      <div class="flex items-center">
        <a href="/" class="text-xl font-bold text-primary">{siteName}</a>
      </div>
      
      <!-- Desktop navigation -->
      <nav class="hidden md:flex items-center space-x-6">
        <a href="/" class="nav-link">{$t('nav.home')}</a>
        <a href="/news" class="nav-link">{$t('nav.news')}</a>
        <a href="/events" class="nav-link">{$t('nav.events')}</a>
        <a href="/contact" class="nav-link">{$t('nav.contact')}</a>
        
        <div class="ml-4">
          <LanguageSwitcher showLabels={true} />
        </div>
        
        <a href="/login" class="btn btn-primary">{$t('nav.login')}</a>
      </nav>
      
      <!-- Mobile menu button -->
      <button 
        class="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-100"
        on:click={toggleMenu}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {#if isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
    </div>
    
    <!-- Mobile navigation -->
    {#if isMenuOpen}
      <div class="md:hidden mt-4 py-4 border-t border-gray-200">
        <nav class="flex flex-col space-y-4">
          <a href="/" class="nav-link">{$t('nav.home')}</a>
          <a href="/news" class="nav-link">{$t('nav.news')}</a>
          <a href="/events" class="nav-link">{$t('nav.events')}</a>
          <a href="/contact" class="nav-link">{$t('nav.contact')}</a>
          
          <div class="py-2">
            <LanguageSwitcher showLabels={true} />
          </div>
          
          <a href="/login" class="btn btn-primary w-full text-center">{$t('nav.login')}</a>
        </nav>
      </div>
    {/if}
  </div>
</header>

<style>
  .nav-link {
    color: rgb(75, 85, 99);
    transition-property: color;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  .nav-link:hover {
    color: var(--color-primary);
  }
</style>
