<script lang="ts">
  import { t } from '$lib/i18n';
</script>

<svelte:head>
  <title>{$t('app.name')}</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <section class="hero py-12">
    <h1 class="text-4xl font-bold mb-6">{$t('home.welcome')}</h1>
    <p class="text-xl mb-8">{$t('home.description')}</p>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">{$t('home.temple_reunion')}</h2>
        <p class="text-gray-700">{$t('home.temple_description')}</p>
        <div class="mt-6">
          <a href="/events" class="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            {$t('events.upcoming')} →
          </a>
        </div>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <h2 class="text-2xl font-semibold mb-4">{$t('news.latest')}</h2>
        <p class="text-gray-700 mb-4">{$t('news.no_news')}</p>
        <div class="mt-6">
          <a href="/news" class="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            {$t('news.read_more')} →
          </a>
        </div>
      </div>
    </div>
  </section>
</main>
