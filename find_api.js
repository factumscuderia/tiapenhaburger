async function run() {
  const res = await fetch("https://tiapenhaburger.saipos.com/home");
  const html = await res.text();
  console.log("HTML length:", html.length);

  // find script tags
  const scripts = [...html.matchAll(/src="([^"]+\.js)"/g)].map(m => m[1]);
  console.log("Scripts:", scripts);

  for (const s of scripts) {
    const sUrl = s.startsWith("http") ? s : `https://tiapenhaburger.saipos.com/${s}`;
    try {
      const sRes = await fetch(sUrl);
      const sCode = await sRes.text();
      const urls = sCode.match(/https?:\/\/[a-zA-Z0-9.-]*saipos[a-zA-Z0-9.-]*\/[a-zA-Z0-9/_-]*/g) || [];
      const apiUrls = [...new Set(urls)].filter(u => u.includes("api") || u.includes("order") || u.includes("delivery") || u.includes("menu") || u.includes("store"));
      if (apiUrls.length > 0) {
        console.log(`In ${s}:`, apiUrls);
      }
    } catch (e) {
      console.error(e.message);
    }
  }
}
run();
