import * as marked from "marked";
import * as sanitizeHtml from "sanitize-html";

// self の型チェック回避して受け取るため、as any を付加
const worker: Worker = self as any;

worker.addEventListener("message", (event) => {
    worker.postMessage({ result: event.data });
    const text = event.data;

    const sanitizeOptions = {
        allowedTags: [...sanitizeHtml.defaults.allowedTags, "h1", "h2"],
    };
    const html = sanitizeHtml(marked.parse(text).toString(), sanitizeOptions);

    worker.postMessage({ html });
});
