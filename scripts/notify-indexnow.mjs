
const KEY = '42499e3e7e81483bafad2a5581c06000';
const HOST = 'www.2smarthome.es';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap-0.xml`;

console.log(`Fetching sitemap from ${SITEMAP_URL}...`);

const res = await fetch(SITEMAP_URL);
if (!res.ok) {
  console.error(`Failed to fetch sitemap: ${res.status} ${res.statusText}`);
  process.exit(1);
}

const xml = await res.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

if (urls.length === 0) {
  console.error('No URLs found in sitemap.');
  process.exit(1);
}

console.log(`Notifying IndexNow with ${urls.length} URLs...`);

const indexnowRes = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
});

if (indexnowRes.ok || indexnowRes.status === 202) {
  console.log(`✓ IndexNow accepted (${indexnowRes.status})`);
} else {
  const body = await indexnowRes.text();
  console.error(`✗ IndexNow error ${indexnowRes.status}: ${body}`);
  process.exit(1);
}
