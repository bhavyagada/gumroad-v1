import { redirect } from "@sveltejs/kit";

export async function handle({ event, resolve }) {
  const logged_in = event.cookies.get("user") && (event.cookies.get("user") !== '');

  const routes = ["/login", "/"];
  if (logged_in && routes.includes(event.url.pathname)) throw redirect(303, "/home")

  const protected_routes = ["/home", "/add", "/edit"];
  if (!logged_in && protected_routes.includes(event.url.pathname)) throw redirect(303, "/login");

	const response = await resolve(event);
	return response;
}