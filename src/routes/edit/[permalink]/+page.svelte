<script>
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  // TODO: extract everything later into specific states
  let editing = true;
  let description = "";
  let name = "";
  let price = "";
  let url = "";
  let download_limit = "";
  let permalink = "";
  let show_error = false;
  let error_message = "";
  let url_encoded_name = "test";
  let link_to_share = `localhost:5173/l/${$page.params.permalink}`;
  let fb_share = `javascript:window.open(%22http://www.facebook.com/dialog/feed?app_id=114816261931958&redirect_uri=http://gumroad.com/home&display=popup&message=Buy%20${url_encoded_name}%20on%20Gumroad%21&link=${link_to_share}%22,%22Share%22,%22width=400,height=200,scrollbars=yes%22);`;
  let x_share = `http://twitter.com/intent/tweet?text=Buy%20${url_encoded_name}%20on%20Gumroad%21&via=gumroad&url=${link_to_share}`;
  let views = 0;
  let conversion = 0;
  let hundred_minus_conversion = 0;
  let conversion_chart = `https://quickchart.io/chart?w=800&h=400&v=2.9.4&c=%7B%0A%20%20type%3A%20%27pie%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20data%3A%20%5B120%2C%2060%2C%2050%2C%20180%2C%20120%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D`;
  let number_of_downloads = 0;
  let total_profit = 0;
</script>

<div class="clear-both w-3/5 min-w-[800px] max-w-[960px] overflow-hidden mx-auto my-0 px-0 py-8">
  <div class="flex">
    <div class="bg-[#f9f9f9] w-[258px] h-[129px] border border-2 border-dashed border-[#eee] rounded-xl mr-5">
      <button on:click={() => goto("/add")} class="bg-[#f2f2f2] w-full font-bold text-lg text-[#0e7bba] p-4 rounded-tl-[15px] rounded-tr-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer">+ Add new link</button>
      <p class="clear-both overflow-hidden text-center my-4">You don't have any links.</p>
    </div>
    <div>
      <div class="flex justify-between align-center mb-4">
        <a href={fb_share} target="_blank" class="bg-[#3b5997] hover:bg-[#4967a5] float-left inline-block text-white no-underline font-bold leading-none relative cursor-pointer px-3 py-4 rounded-md border-b-[#0000004d] border-b border-solid active:py-4 active:px-5">Share on Facebook</a>
        <p class="w-1/2 text-center">Link to share:<br><input type="text" value={link_to_share} class="text-[#555] text-center font-sans font-bold w-[200px] mx-auto my-0 p-0 border-0 outline-none" readonly="readonly" title="Share this link to sell!"></p>
        <a href={x_share} target="_blank" class="bg-[#8dc0d9] hover:bg-[#a5cfe4] float-right inline-block text-white no-underline font-bold leading-none relative cursor-pointer px-3 py-4 rounded-md border-b-[#0000004d] border-b border-solid active:py-4 active:px-5">Share on Twitter</a>
      </div>
      
      <div class="bg-[#f9f9f9] w-full overflow-hidden text-center relative mb-5 p-3 rounded-2xl pt-3.5">
        <p class="inline-block w-full"><strong class="font-bold">{views}</strong> views <span class="text-sm text-[#999] mx-1 my-0">&rarr;</span> <img src={conversion_chart} height="20" width="40" class="align-middle mb-0.5 inline-block" alt="Conversion Chart" /> <span>{conversion}%</span> <span class="text-sm text-[#999] mx-1 my-0">&rarr;</span> <strong class="font-bold">{number_of_downloads}</strong> downloads at &#8776; <strong class="text-[#aaa] text-sm font-normal">{price}</strong> <span class="text-sm text-[#999] mx-1 my-0">&rarr;</span> <strong class="font-bold">${total_profit}</strong> in profit!</p>
      </div>

      <form action="/{permalink}" method="post" class="bg-[#f9f9f9] w-[680px] rounded-2xl">
        <a href="/" class="float-right text-[#CC333F] p-5">delete</a>
        <h3 class="font-medium text-[#333] text-2xl p-5">Edit link: {#if show_error}<small class="error">{error_message}</small>{/if}</h3>

        <p class="px-2.5 pb-3">
          <label for="name" class="font-bold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">Name:</label>
          <input id="name" name="name" type="text" placeholder="name" value={ name } class="w-[468px] text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none" />
        </p>
        <p class="px-2.5 pb-3">
          <label for="price" class="font-bold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">Price:</label>
          <input id="price" name="price" type="text" placeholder="$10" value={ price } class="w-[468px] text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none" />
        </p>
        <p class="px-2.5 pb-3">
          <label for="url" class="font-bold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">URL:</label>
          <input id="url" name="url" type="text" placeholder="https://" value={ url } class="w-[468px] text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none" />
        </p>
        <p class="px-2.5 pb-3">
          <label for="file" class="font-semibold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">or upload a file:</label>
          <button type="button" id="file" name="file" class="bg-red-800 text-white font-semibold p-2">Upload a file</button>
        </p>
        <p class="px-2.5 pb-3">
          <label for="description" class="font-bold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">Description:<br /><span class="font-normal text-[#ccc]">(optional)</span></label>
          {#if description}
            <textarea id="description" name="description">{ description }</textarea>
          {:else}
            <textarea id="description" name="description" class="min-h-[100px] text-sm w-[468px] border p-2 border border-slate-500 border-solid focus:outline-none"></textarea>
          {/if}
        </p>
        <h4 class="font-medium text-[#333] text-xl m-5">Additional link options:</h4>
        <p class="px-2.5 pb-3">
          <label for="download_limit" class="font-semibold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">Download limit:</label>
          <input id="download_limit" name="download_limit" type="text" placeholder="0" value={ download_limit } title="The number of people that can purchase this item. 0 means <em>no limit</em>!" class="w-[468px] text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none"/>
        </p>
        <button type="submit" class="bg-[#f2f2f2] w-full font-bold text-lg text-[#0e7bba] p-4 mt-2 rounded-bl-[15px] rounded-br-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer">
          Save changes
        </button>
        <div class="rainbow bar"></div>
      </form>
    </div>
  </div>
</div>