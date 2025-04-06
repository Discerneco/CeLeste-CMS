<script lang="ts">
  import { t } from '$lib/i18n';
  import LanguageSwitcher from './LanguageSwitcher.svelte';
  
  export let siteName = 'CeLeste CMS';
  export let year = new Date().getFullYear();
</script>

<footer class="bg-gray-100 border-t border-gray-200 mt-12">
  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <!-- Site info -->
      <div class="col-span-1 md:col-span-2">
        <h3 class="text-lg font-bold mb-4">{siteName}</h3>
        <p class="text-gray-600 mb-4">{$t('app.tagline')}</p>
        <div class="mt-4">
          <LanguageSwitcher showLabels={true} />
        </div>
      </div>
      
      <!-- Quick links -->
      <div class="col-span-1">
        <h3 class="text-lg font-bold mb-4">{$t('nav.home')}</h3>
        <ul class="space-y-2">
          <li><a href="/" class="text-gray-600 hover:text-primary">{$t('nav.home')}</a></li>
          <li><a href="/about" class="text-gray-600 hover:text-primary">{$t('nav.about')}</a></li>
          <li><a href="/news" class="text-gray-600 hover:text-primary">{$t('nav.news')}</a></li>
          <li><a href="/events" class="text-gray-600 hover:text-primary">{$t('nav.events')}</a></li>
        </ul>
      </div>
      
      <!-- Contact -->
      <div class="col-span-1">
        <h3 class="text-lg font-bold mb-4">{$t('nav.contact')}</h3>
        <ul class="space-y-2">
          <li><a href="/contact" class="text-gray-600 hover:text-primary">{$t('nav.contact')}</a></li>
          <li><a href="/login" class="text-gray-600 hover:text-primary">{$t('nav.login')}</a></li>
          <li><a href="/register" class="text-gray-600 hover:text-primary">{$t('nav.register')}</a></li>
        </ul>
      </div>
    </div>
    
    <!-- Copyright -->
    <div class="border-t border-gray-200 mt-8 pt-6 text-center text-gray-500">
      <p>&copy; {year} {siteName}. All rights reserved.</p>
      <p class="mt-2 text-sm">
        <a href="https://github.com/Discerneco/CeLeste-CMS" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">
          Open Source Project
        </a>
      </p>
    </div>
  </div>
</footer>
