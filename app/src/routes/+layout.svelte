<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { setupI18n } from '$lib/i18n';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  // Initialize i18n system
  onMount(() => {
    setupI18n();
  });
</script>

<div class="flex flex-col min-h-screen">
  <Header siteName="CeLeste CMS" />
  
  <main class="flex-grow">
    <slot />
  </main>
  
  <Footer siteName="CeLeste CMS" />
</div>
