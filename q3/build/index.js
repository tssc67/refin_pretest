"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const jsdom_1 = require("jsdom");
const query = process.argv[2];
if (!query) {
    process.exit(0);
}
async function run() {
    const res = await axios_1.default.get(`https://codequiz.azurewebsites.net/`, { withCredentials: true, headers: { cookie: `hasCookie=true` } });
    const html = res.data;
    const dom = new jsdom_1.JSDOM(html);
    const tbody = dom.window.document.querySelector('tbody');
    for (const tr of tbody.children) {
        if (tr.children[0].innerHTML.trim().toString() === query.trim()) {
            console.info(tr.children[1].innerHTML);
        }
        else {
            continue;
        }
    }
}
run();
//# sourceMappingURL=index.js.map