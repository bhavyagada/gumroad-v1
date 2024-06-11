import bcrypt from 'bcrypt';

export async function POST({ request, platform, cookies }) {
  const { email, password } = await request.json();
  if (!email || !password) return new Response(JSON.stringify({ error_message: "Fill in the form please!" }), { status: 400 });
  console.log(email, password);

  const user_from_db = await platform.env.DB.prepare("SELECT * FROM user WHERE email = ?").bind(email).run();
  console.log(user_from_db);
  if (user_from_db.results.length === 0) {
    return new Response(JSON.stringify({ error_message: "That email address isn't being used!" }), { status: 400 });
  }

  const user = user_from_db.results[0];
  const password_hash = await bcrypt.hash(password, user.salt);
  if (password_hash !== user.password) return new Response(JSON.stringify({ error_message: "Wrong credentials, please try again!" }), { status: 400 });

  cookies.set("user", user.email, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 30 });
  return new Response(JSON.stringify(user), { status: 200 }); // TODO: send empty string
}