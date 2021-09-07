import axios from 'axios';
import { JSDOM } from 'jsdom'
const query = process.argv[2];
if(!query) {
    process.exit(0);
}

async function run() {
    const res = await axios.get(`https://codequiz.azurewebsites.net/`, {withCredentials: true, headers: {cookie: `hasCookie=true`}});
    const html: string = res.data;
    const dom = new JSDOM(html);
    const tbody = dom.window.document.querySelector('tbody');
    for(const tr of tbody.children) {
        if(tr.children[0].innerHTML.trim().toString() === query.trim()) {
            console.info(tr.children[1].innerHTML);
        } else {
            continue;
        }

    }
}

run();