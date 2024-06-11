import { browser } from "$app/environment";
import { writable } from "svelte/store";

export const is_logged_in = writable(browser && JSON.parse(localStorage.getItem("auth")) || false);
export const user_store = writable(browser && JSON.parse(localStorage.getItem("user")) || { email: "", payment_address: "", name: "", reset_hash: "", balance: 0.00 });
if (browser) {
  is_logged_in.subscribe((value) => (localStorage.auth = JSON.stringify(value)));
  user_store.subscribe((value) => (localStorage.user = JSON.stringify(value)))
}
