import { randomBytes, pbkdf2Sync, randomUUID } from 'crypto';

export async function POST({ request, platform, cookies }) {
  const { email, password } = await request.json();
  if (!email || !password) return new Response(JSON.stringify({ error_message: "Fill in the form please!" }), { status: 400 });

  const user_from_db = await platform.env.DB.prepare("SELECT * FROM user WHERE email = ?").bind(email).run();
  console.log(user_from_db);
  if (user_from_db.results.length === 0) {
    const salt = randomBytes(16).toString('hex').slice(0, 16);
    const password_hash = pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');

    let permalink;
    let x = 1;
    while (x === 1) {
      permalink = ((len, chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz') => [...Array(len)].map(() => chars.charAt(Math.random() * chars.length)).join(''))(6);
      const permalinks_from_db = await platform.env.DB.prepare("SELECT * FROM permalink WHERE permalink = ?").bind(permalink).run();
      if (permalinks_from_db.results.length === 0) {
        await platform.env.DB.prepare("INSERT INTO permalink (permalink) VALUES (?)").bind(permalink).run();
        x = 0;
      }
    }

    const auth_token = randomUUID();
    await platform.env.DB.prepare("INSERT INTO user (email, salt, password, auth_token, reset_hash) VALUES (?, ?, ?, ?, ?)").bind(...[email, salt, password_hash, auth_token, permalink]).run();
    cookies.set("user", email, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 30 });
    return new Response(JSON.stringify({ email: email, reset_hash: permalink, balance: 0.00 }), { status: 200 });
  }

  const user = user_from_db.results[0];
  const password_hash = pbkdf2Sync(password, user.salt, 10000, 64, 'sha256').toString('hex');
  if (password_hash !== user.password) return new Response(JSON.stringify({ error_message: "That email is already taken, sorry!" }), { status: 400 });

  cookies.set("user", user.email, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60 * 60 * 24 * 30 });
  return new Response(JSON.stringify(user), { status: 200 }); // TODO: send empty string
}