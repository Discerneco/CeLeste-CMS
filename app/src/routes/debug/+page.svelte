<script lang="ts">
  import { onMount } from 'svelte';
  import { t } from '$lib/i18n';
  import type { SiteConfig, NewsItem, EventDetails } from '$lib/airtable';
  
  // This data comes from the server-side load function
  export let data: {
    serverData: {
      siteConfig?: SiteConfig;
      newsItems?: NewsItem[];
      eventDetails?: EventDetails | null;
      error?: string;
      success: boolean;
    }
  };
  
  let siteConfig: SiteConfig | null = null;
  let newsItems: NewsItem[] = [];
  let eventDetails: EventDetails | null = null;
  let loading = true;
  let error: string | null = null;
  let serverData = data.serverData;
  
  onMount(async () => {
    try {
      // Fetch site configuration
      const siteConfigResponse = await fetch('/api/site-config');
      const siteConfigData = await siteConfigResponse.json();
      
      // Fetch news items
      const newsResponse = await fetch('/api/news?featured=true&limit=3');
      const newsData = await newsResponse.json();
      
      // Fetch event details
      const eventResponse = await fetch('/api/events');
      const eventData = await eventResponse.json();
      
      // Update state with fetched data
      if (siteConfigData.success) {
        siteConfig = siteConfigData.data;
      }
      
      if (newsData.success) {
        newsItems = newsData.data;
      }
      
      if (eventData.success) {
        eventDetails = eventData.data;
      }
      
      loading = false;
    } catch (e: unknown) {
      console.error('Error fetching data:', e);
      error = e instanceof Error ? e.message : 'An unknown error occurred';
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Debug | CeLeste CMS</title>
</svelte:head>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Airtable Integration Debug</h1>
  
  <div class="mb-8">
    <h2 class="text-2xl font-bold mb-4">Server-Side Data</h2>
    {#if serverData.success}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Site Config -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold mb-3">Site Configuration</h3>
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-sm">{JSON.stringify(serverData.siteConfig, null, 2)}</pre>
        </div>
        
        <!-- News Items -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 class="text-xl font-semibold mb-3">News Items</h3>
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-sm">{JSON.stringify(serverData.newsItems, null, 2)}</pre>
        </div>
        
        <!-- Event Details -->
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2">
          <h3 class="text-xl font-semibold mb-3">Event Details</h3>
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-60 text-sm">{JSON.stringify(serverData.eventDetails, null, 2)}</pre>
        </div>
      </div>
    {:else}
      <div class="bg-red-50 p-4 rounded-md mb-6">
        <p class="text-red-700">Server Error: {serverData.error}</p>
      </div>
    {/if}
  </div>
  
  <h2 class="text-2xl font-bold mb-4">Client-Side Data</h2>
  {#if loading}
    <div class="bg-blue-50 p-4 rounded-md mb-6">
      <p class="text-blue-700">Loading data from Airtable API endpoints...</p>
    </div>
  {:else if error}
    <div class="bg-red-50 p-4 rounded-md mb-6">
      <p class="text-red-700">Error: {error}</p>
    </div>
  {:else}
    <!-- Site Configuration -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Site Configuration</h2>
      {#if siteConfig}
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-60">{JSON.stringify(siteConfig, null, 2)}</pre>
        </div>
      {:else}
        <p class="text-gray-500">No site configuration data available.</p>
      {/if}
    </section>
    
    <!-- News Items -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Featured News</h2>
      {#if newsItems.length > 0}
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-60">{JSON.stringify(newsItems, null, 2)}</pre>
        </div>
      {:else}
        <p class="text-gray-500">No news items available.</p>
      {/if}
    </section>
    
    <!-- Event Details -->
    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Event Details</h2>
      {#if eventDetails}
        <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <pre class="bg-gray-100 p-4 rounded overflow-auto max-h-60">{JSON.stringify(eventDetails, null, 2)}</pre>
        </div>
      {:else}
        <p class="text-gray-500">No event details available.</p>
      {/if}
    </section>
  {/if}
  
  <div class="mt-8">
    <a href="/" class="text-primary hover:underline">← Back to Home</a>
  </div>
</div>
