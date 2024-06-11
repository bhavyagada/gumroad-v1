export async function GET({ cookies }) {
  cookies.set('user', '', { path: '/', expires: new Date(0) });
  return new Response(JSON.stringify(''), { status: 200 });
}