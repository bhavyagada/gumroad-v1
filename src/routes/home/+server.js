export async function GET({ platform, cookies }) {
  const email = decodeURIComponent(cookies.get("user"));
  if (!email) return Response(JSON.stringify(''), { status: 302 });
  
  const user_from_db = await platform.env.DB.prepare("SELECT * FROM user WHERE email = ?").bind(email).run();
  const user = user_from_db.results[0];
  if (!user) return Response(JSON.stringify(''), { status: 302 });

  let links = [];
  links = await platform.env.DB.prepare("SELECT * FROM link WHERE owner = ?").bind(email).run();
  links = links.results;

  const seven_days_purchases = await platform.env.DB.prepare("SELECT * FROM purchase WHERE owner = ? AND create_date >= datetime('now', '-7 day')").bind(email).run();
  const month_purchases = await platform.env.DB.prepare("SELECT * FROM purchase WHERE owner = ? AND create_date >= datetime('now', '-30 day')").bind(email).run();
  const all_purchases = await platform.env.DB.prepare("SELECT * FROM purchase WHERE owner = ?").bind(email).run();

  const last_seven_days_purchase_total = seven_days_purchases.results.reduce((acc, purchase) => acc + purchase.price, 0);
  const last_month_purchase_total = month_purchases.results.reduce((acc, purchase) => acc + purchase.price, 0);
  const purchase_total = all_purchases.results.reduce((acc, purchase) => acc + purchase.price, 0);

  let bins = {};
  for (let purchase of month_purchases.results) {
    let date = purchase.create_date.toLocaleDateString();
    if (!bins[date]) bins[date] = [];
    bins[date].push(purchase);
  }

  let counts = {};
  for (let purchase of seven_days_purchases.results) {
    let date = purchase.createDate.toLocaleDateString();
    counts[date] = (counts[date] || 0) + 1;
  }

  let chart_numbers = [];
  for (let date in counts) {
    if (counts[date] > 0) {
      chart_numbers.push(counts[date]);
    } else {
      chart_numbers.push(0);
    }
  }
  chart_numbers = chart_numbers.slice(0, 14);

  let chart_max = 0;
  let show_chart = false;
  if (chart_numbers.length > 0) {
    chart_max = Math.ceil(1.2 * Math.max(...chart_numbers));
    show_chart = true;
  } else {
    chart_max = 0;
    show_chart = false;
  }

  let chart_length = chart_numbers.length;
  chart_numbers = chart_numbers.join(',');

  const s = chart_length === 1 ? "" : "s";

  return new Response(JSON.stringify({
    show_chart: show_chart,
    number_of_links: links.length,
    links: links,
    purchases: all_purchases.results,
    number_of_days: chart_length,
    s: s,
    chart_numbers: chart_numbers,
    chart_max: chart_max,
    last_seven_days_purchase_total: last_seven_days_purchase_total.toFixed(2),
    last_month_purchase_total: last_month_purchase_total.toFixed(2),
    purchase_total: purchase_total.toFixed(2),
    user_balance: user.balance.toFixed(2)
  }), { status: 200 });
}