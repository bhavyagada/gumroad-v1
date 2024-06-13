<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { is_logged_in, user_store } from "$lib";

  let data = {
    show_chart: false,
    number_of_links: 0,
    links: [],
    purchases: [],
    number_of_days: 0,
    s: "",
    chart_numbers: [],
    chart_max: 0,
    last_seven_days_purchase_total: "0.00",
    last_month_purchase_total: "0.00",
    purchase_total: "0.00",
    user_balance: "0.00"
  }
  let chart_src = "";

  onMount(async () => {
    const response = await fetch("/home");
    if (response.status === 302) {
      const logout_response = await fetch('/logout');
      if (logout_response.status === 200) {
        $is_logged_in = false;
        $user_store = { email: "", payment_address: "", name: "", reset_hash: "", balance: 0.00 };
        goto("/");
        return;
      }
    }

    if (response.status === 200) {
      data = await response.json();
      console.log(data);
      chart_src = `http://chart.apis.google.com/chart?chxr=0,0,${data.chart_max}&chf=bg,s,ffffff&chxt=y&chbh=a&chs=640x225&chco=CC333F,EB6841&cht=bvg&chds=0,${data.chart_max}&chd=t:${data.chart_numbers}`;
    }
  });
</script>

<div class="clear-both w-3/5 min-w-[800px] max-w-[960px] overflow-hidden mx-auto my-0 px-0 py-8">
  <div class="flex justify-between">
    <div class="bg-[#f9f9f9] w-[258px] h-[129px] border border-2 border-dashed border-[#eee] rounded-xl mr-5">
      <button on:click={() => goto("/add")} class="bg-[#f2f2f2] w-full font-bold text-lg text-[#0e7bba] p-4 rounded-tl-[15px] rounded-tr-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer">+ Add new link</button>
      {#if data.number_of_links === 0}
        <p class="clear-both overflow-hidden text-center my-4">You don't have any links.</p>
      {:else}
        <ul class="clear-both overflow-hidden text-center my-4">
          {#each data.links as link}
            <li class="text-[#454545]"><a href="/edit/{link.unique_permalink}" class="text-[#EE4B2B] text-lg leading-7">{link.name}</a></li>
          {/each}
        </ul>
		  {/if}
    </div>
    <div class="bg-[#f9f9f9] w-[680px] pl-5 pt-5 pb-2.5 px-0 rounded-[15px]">
      <h3 class="text-black font-medium text-xl mx-0 mt-1 mb-0">Last {data.number_of_days} day{data.s}:</h3>
      <div class="pt-5 pb-0">
        {#if data.show_chart}
          <img src={chart_src} width="640" height="225" alt="Sales Chart" />
        {:else}
          <p>Wait a few days and a chart will show up here!</p>
        {/if}
      </div>
      <div class="mx-0 mt-2.5 mb-0">
        <h4 class="font-medium text-black text-xl mt-6 mb-3 mx-0">History:</h4>
        <p class="mx-0 my-1"><strong class="text-[#444]">${data.last_seven_days_purchase_total}</strong> in the past 7 days.</p>
        <p class="mx-0 my-1"><strong class="text-[#444]">${data.last_month_purchase_total}</strong> in the past month.</p>
        <p class="mx-0 my-1"><strong class="text-[#444]">${data.purchase_total}</strong> in total.</p>
      </div>
    </div>
  </div>
</div>