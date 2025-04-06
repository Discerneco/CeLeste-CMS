<script lang="ts">
  import { t } from '$lib/i18n';
  
  // Data from server-side load function
  export let data;
  
  // Destructure data from server
  const { featuredNews, eventDetails, success, error } = data;
  
  // Format date for display
  function formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  }
</script>

<svelte:head>
  <title>{$t('app.name')}</title>
</svelte:head>

<main class="container mx-auto px-4 py-8">
  <section class="hero py-12">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-4xl font-bold">{$t('home.welcome')}</h1>
      <a href="/debug" class="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm transition-colors">
        Debug Airtable Integration
      </a>
    </div>
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
        
        {#if !success}
          <div class="bg-red-50 p-4 rounded-md mb-4">
            <p class="text-red-700">{error || 'Error loading news'}</p>
          </div>
        {:else if featuredNews && featuredNews.length > 0}
          <div class="space-y-4">
            {#each featuredNews as news}
              <div class="border-b border-gray-100 pb-4 last:border-b-0">
                <h3 class="font-medium text-lg">{news.title}</h3>
                {#if news.published_date}
                  <p class="text-sm text-gray-500 mb-2">{$t('news.published_on', { date: formatDate(news.published_date) })}</p>
                {/if}
                <p class="text-gray-700 line-clamp-2">{news.summary || news.content?.substring(0, 120) + '...'}</p>
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-gray-700 mb-4">{$t('news.no_news')}</p>
        {/if}
        
        <div class="mt-6">
          <a href="/news" class="inline-block px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            {$t('news.read_more')} →
          </a>
        </div>
      </div>
    </div>
  </section>
</main>
