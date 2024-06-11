<script>
  import "../global.css";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { is_logged_in, user_store } from "$lib";

  console.log($is_logged_in);
  const logout = async (event) => {
    event.preventDefault();

    const response = await fetch('/logout', { method: 'GET' });
    if (response.status === 200) {
      $is_logged_in = false;
      $user_store = { email: "", payment_address: "", name: "", reset_hash: "", balance: 0.00 };
      goto("/");
    }
  }
</script>

<svelte:head>
  <title>{$page.data.title || "Gumroad - Selling should be as easy as sharing a link."}</title>
  <meta property="og:site_name" content="Gumroad" />
  <meta property="og:title" content="Gumroad" />
  <meta property="og:url" content="http://gumroad.com/" />
  <meta property="og:type" content="website" />
  <meta property="og:description" content="Selling should be as easy as sharing a link." />
  <meta property="fb:page_id" content="http://www.facebook.com/gumroad" />
</svelte:head>

<body id={$page.data.body_id}>
  <div class="w-full mx-auto my-0">
    <!-- header -->
    <div class="bg-[#edc951] w-full h-[5px] overflow-hidden">
      <div class="bg-[#00a0b0] w-1/5 h-[100px] block float-left"></div>
      <div class="bg-[#6a4a3c] w-1/5 h-[100px] block float-left"></div>
      <div class="bg-[#cc333f] w-1/5 h-[100px] block float-left"></div>
      <div class="bg-[#eb6841] w-1/5 h-[100px] block float-left"></div>
      <div class="bg-[#edc951] w-1/5 h-[100px] block float-left"></div>
    </div>
    <!-- <div id="loading-indicator">Loading...</div> -->

    <div>
      {#if $page.data.hide_header === undefined}
        <div class="min-w-[800px] max-w-[960px] w-3/5 overflow-hidden mx-auto my-0 pb-2 border-b border-b-black border-dashed">
          {#if !$is_logged_in}
            <ul class="list-none float-right mt-10">
              <li class="font-normal text-xl float-left ml-5">Have an account? <a href="/login" class="text-[#0e7bba] no-underline hover:underline inline-block ml-0.5 pt-2.5 pb-[13px] px-3.5 border-t-[solid] border-t">Login!</a></li>
            </ul>
          {:else}
            {#if $is_logged_in}
              <p class="text-lg float-right text-[#999] ml-2.5 mr-0 mt-12 mb-0">
              {#if $page.url.pathname !== "/links"}
                <a href="/links" class="mx-2.5 my-0">Your links</a>
              {:else}
                <a href="/home" class="mx-2.5 my-0">Home</a>
              {/if}
              &bull; <span class="text-[#6c6b65] mx-2.5 my-0">${$user_store.balance === 0 ? "0.00" : $user_store.balance}</span> &bull; <a href="/settings" class="mx-2.5 my-0">Settings</a> &bull; <a href="/logout" on:click={logout} class="ml-2.5 my-0 mr-0">Logout</a>
              </p>
            {:else}
              <p>Thanks for using Gumroad <a href="mailto:hi@gumroad.com">Feedback?</a></p>
            {/if}
          {/if}
          <a href="/" class="text-[#0e7bba]">
            <h1 class="font-sans float-left font-bold text-[3rem] leading-none text-[#6A4A3C] hover:text-[#333] mt-6 mx-auto">Gumroad</h1>
          </a>
          <h2 class="clear-left font-sans float-left font-[normal] text-xl text-[#999] mb-[15px]">Share and sell your digital goods with just a link.</h2>
        </div>
      {/if}
    </div>

    <slot></slot>

    <!-- footer -->
    <div>
      <div class="overflow-hidden text-right clear-both w-3/5 min-w-[800px] max-w-[960px] mx-auto my-0 pt-4 pb-10 px-0 border-t border-dashed">
        <ul class="float-left mt-5">
          <li class="font-normal text-xl float-left ml-0 mr-5"><a href="/about" class="text-[#0e7bba] inline-block ml-2 pt-2 pb-3 px-3 hover:bg-[#f5f5f5] hover:rounded-3xl hover:border-t hover:border-t-slate-400">About</a> <span class="ml-4">•</span></li>
          <li class="font-normal text-xl float-left ml-0 mr-5"><a href="/faq" class="text-[#0e7bba] inline-block ml-2 pt-2 pb-3 px-3 hover:bg-[#f5f5f5] hover:rounded-3xl hover:border-t hover:border-t-slate-400">FAQ</a> <span class="ml-4">•</span></li>
          <li class="font-normal text-xl float-left ml-0 mr-5"><a href="http://twitter.com/gumroad/" target="_blank" class="text-[#0e7bba] inline-block ml-2 pt-2 pb-3 px-3 hover:bg-[#f5f5f5] hover:rounded-3xl hover:border-t hover:border-t-slate-400">Twitter</a></li>
        </ul>
        
        <div class="float-right">
          <p class="mt-2">Copyright © 2011 <a href="http://little.bigthin.gs/" class="text-[#555] hover:underline">Little Big Things, LLC</a>.</p>
          <p class="mt-2">A project by <a href="http://sahillavingia.com/" class="text-[#555] hover:underline">Sahil Lavingia</a>.</p>
        </div>
      </div>
    </div>
  </div>
</body>