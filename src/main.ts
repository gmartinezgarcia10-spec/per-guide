// App entry. Import order matters: core publishes window.PER, chapters fill PER.CH,
// the bank glue fills PER.Q, then the app renders and routes.
import "./styles/app.css";
import "./core/per.ts";
import "./legacy/chapters.js";
import "./legacy/bank.js";
import "./legacy/app.js";
