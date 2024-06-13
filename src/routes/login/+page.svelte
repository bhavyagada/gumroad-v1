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

  const login = async (event) => {
    event.preventDefault();

    const response = await fetch('/login', {
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
        payment_address: data.payment_address,
        name: data.name,
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
		<div class="bg-[#f9f9f9] w-[458px] border border-2 border-dashed border-[#eee] rounded-xl float-none mx-auto my-0">
			<h2 class="font-sans text-[22px] text-[#333] font-semibold text-center mx-5 mt-5 mb-4">Login to your account:</h2>
			{#if data}
				<small class="text-[#c04355] text-base block text-center italic">{data.error_message}</small>
			{/if}
			<form action="/login" method="post" class="m-0">
				<p class="clear-both overflow-hidden my-2.5 mx-5">
					<label for="email" class="font-bold text-[#777] text-right float-left w-[118px] pt-2.5">Email address:</label>
					<input bind:value={email} name="email" type="text" placeholder="email address" class="w-72 float-right text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none">
				</p>
				<p class="clear-both overflow-hidden my-2.5 mx-5">
					<label for="password" class="font-bold text-[#777] text-right float-left w-[118px] pt-2.5">Password:</label>
					<input bind:value={password} name="password" type="password" placeholder="password" class="w-72 float-right text-black text-sm p-2 border border-slate-500 border-solid focus:outline-none">
				</p>
				<p class="m-0 clear-both overflow-hidden">
          <button on:click={login} type="submit" class="bg-[#f2f2f2] font-bold text-lg w-full text-[#0e7bba] mt-2.5 m-0 p-5 rounded-br-[15px] rounded-bl-[15px] border-t-2 border-t-[#eee] border-0 border-dashed hover:underline hover:text-[#0a547f] hover:cursor-pointer">Login</button>
        </p>
			</form>
		</div>
	</div>
</div>