<script>
  import { goto } from "$app/navigation";

  // TODO: extract everything later into specific states
  let editing = false;
  let description = "";
  let name = "";
  let price = "";
  let url = "";
  let download_limit = "";
  let permalink = "";
  let show_error = false;
  let error_message = "";
</script>

<div class="clear-both w-3/5 min-w-[800px] max-w-[960px] overflow-hidden mx-auto my-0 px-0 py-8">
  <div class="flex justify-between">
    <div class="bg-[#f9f9f9] w-[258px] h-[129px] border border-2 border-dashed border-[#eee] rounded-xl mr-5">
      <button on:click={() => goto("/add")} class="bg-[#f2f2f2] w-full font-bold text-lg text-[#0e7bba] p-4 rounded-tl-[15px] rounded-tr-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer">+ Add new link</button>
      <p class="clear-both overflow-hidden text-center my-4">You don't have any links.</p>
    </div>
    <form action="/{ permalink }" method="post" class="bg-[#f9f9f9] w-[680px] rounded-[15px]">
      {#if editing}
        <a href="/" class="float-right text-[#CC333F] ml-0 mr-7 mt-6 mb-0">delete</a>
        <h3 class="font-medium text-[#333] text-2xl m-5">Edit link: {#if show_error}<small class="error">{error_message}</small>{/if}</h3>
      {:else}
        <h3 class="font-medium text-[#333] text-2xl m-5">Create a new link: {#if show_error}<small class="error">{error_message}</small>{/if}</h3>
      {/if}
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
      
      {#if editing}
        <div id="link-options">
          <h4 class="font-medium text-[#333] text-xl m-5">Additional link options:</h4>
          <p class="px-2.5 pb-3">
            <label for="download_limit" class="font-semibold text-[#777] text-right float-left w-[180px] pt-1.5 pr-2">Download limit:</label>
            <input id="download_limit" name="download_limit" type="text" placeholder="0" value={ download_limit } title="The number of people that can purchase this item. 0 means <em>no limit</em>!" class="w-[468px] text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none"/>
          </p>
        </div>
      {/if}
      
      <button type="submit" class="bg-[#f2f2f2] w-full font-bold text-lg text-[#0e7bba] p-4 mt-2 rounded-bl-[15px] rounded-br-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer">
        {#if editing}
          Save changes
        {:else}
          Add link
        {/if}
      </button>
      <!-- <div class="rainbow bar"></div> -->
    </form>
  </div>
</div>