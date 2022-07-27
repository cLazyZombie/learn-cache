if ('caches' in window) {
    console.log('caches supported');

    await run();
}else {
    console.log('caches not support');
}

async function run() {
    const cache = await caches.open('cache-v1')
    let data = await load_json(cache, '/cat.json');
    console.log(data);
}

async function load_json(cache, s) {
    const has_data = await cache.has(s);
    if (!has_data) {
        console.log(s + ' is not cached');
        const options = {
            method: "GET",
            headers: new Headers( {
                'Content-Type': 'text/html'
            }),
        }
        await cache.add(new Request(s, options));
    }

    const resp = await cache.match(s);
    if (typeof(resp) == 'undefined') {
        return resp;
    } else {
        return await resp.json()
    }
}
