<script>
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { is_logged_in, user_store } from "$lib";

  onMount(() => { 
    if ($is_logged_in) goto("/home");
  });

  let email;
  let password;
  let data;

  const register = async (event) => {
    event.preventDefault();

    const response = await fetch('/', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'content-type': 'application/json'
      }
    });
  
    data = await response.json();
    if (response.status === 200) {
      $is_logged_in = true;
      $user_store = {
        email: data.email,
        reset_hash: data.reset_hash,
        balance: data.balance
      }
      goto("/home");
      return;
    }
  }
</script>

<div>
	<div class="clear-both w-3/5 min-w-[800px] max-w-[960px] overflow-hidden mx-auto my-0 px-0 py-8">
		<div class="float-left mr-[462px]">
      <ol class="w-11/12 list-none pl-1 pr-0 pt-2.5 pb-0">
        <li>
          <div class="bg-[#EDC951] font-serif text-white text-lg leading-3 indent-0 pt-1 px-3 pb-4 h-8 w-8 text-center float-left mr-4 rounded-full">1</div>
          <h3 class="font-sans text-black font-bold text-xl mb-1">Take a file or a link of value.</h3>
          <p class="ml-12 mb-4">This can be anything. From a link to an exclusive build of an app, to a secret blog post, to an icon you spent hours designing.</p>
        </li>
        <li>
          <div class="bg-[#EB6841] font-serif text-white text-lg leading-3 indent-0 pt-1 px-3 pb-4 h-8 w-8 text-center float-left mr-4 rounded-full">2</div>
          <h3 class="font-sans text-black font-bold text-xl mb-1">Share it.</h3>
          <p class="ml-12 mb-4">Just like any old link. Choose your own price. You don't have to create a store. And you don't have to do <em>any</em> management. <a href="http://gumroad.pages.dev/l/hjbaod">Click here</a> for an example.</p></li>
        <li>
          <div class="bg-[#CC333F] font-serif text-white text-lg leading-3 indent-0 pt-1 px-3 pb-4 h-8 w-8 text-center float-left mr-4 rounded-full">3</div>
          <h3 class="font-sans text-black font-bold text-xl mb-1">Make money.</h3>
          <p class="ml-12 mb-4">And that's it. At the end of each month we'll deposit the money you've earned to your PayPal account.</p></li>
      </ol>
			<p>Still don't get it? <a href="http://www.youtube.com/embed/CJqWkcncOuY" target="_blank">Watch a video</a>.</p>
		</div>
		<div class="bg-[#f9f9f9] float-right w-[458px] ml-[-462px] mt-2.5 rounded-2xl border-2 border-dashed border-[#eee]">
			<h2 class="font-sans text-center text-[#333] font-bold text-xl mt-5 mb-4 mx-5">Create an account in seconds: </h2>
			{#if data}
				<small class="text-[#c04355] text-base block text-center italic">{data.error_message}</small>
			{/if}
			<form action="/" method="post" class="m-0">
				<p class="overflow-hidden clear-both mx-5 my-2.5">
					<label for="email" class="font-bold text-[#777] text-right float-left w-[118px] pt-2.5">Email address:</label>
					<input bind:value={email} name="email" type="text" placeholder="email address" class="w-72 float-right text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none">
				</p>
				<p class="overflow-hidden clear-both mx-5 my-2.5">
					<label for="password" class="font-bold text-[#777] text-right float-left w-[118px] pt-2.5">Password:</label>
					<input bind:value={password} name="password" type="password" placeholder="password" class="w-72 float-right text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none">
				</p>
				<p class="m-0">
          <button on:click={register} type="submit" class="font-bold text-lg w-full text-[#0e7bba] mt-2.5 m-0 p-5 rounded-br-[15px] rounded-bl-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer hover:bg-[#f2f2f2]">Start Making Money</button>
        </p>
			</form>
		</div>
	</div>
</div>