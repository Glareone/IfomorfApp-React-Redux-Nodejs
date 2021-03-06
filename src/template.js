// template.js exports a function. It takes title, state and content as input.
// It injects them into the template and returns the final HTML document.
// To pass along the state, the template attaches state to window.__STATE__ inside a <script> tag.
// Now you can read state on the client side by accessing window.__STATE__.
// We also include the SSR companion assets/client.js client-side application in another script tag.
// If you request the pure client version, it only puts assets/bundle.js inside the script tag.
import React from 'react';
// template.js exports a function. It takes title, state and content as input.
// It injects them into the template and returns the final HTML document.
function template(title, initialState = {}, content = "") {
  // there is nothing special except window.__STATE__. All we need to do is grab the initial state from
  // window.__STATE__ and pass it to our configureStore() function as the initial state.
  let scripts = '';
  if (content) {
    // To pass along the state, the template attaches state to window.__STATE__ inside a <script> tag.
    // Now you can read state on the client side by accessing window.__STATE__.
    // We also include the SSR companion assets/client.js client-side application in another script tag.
    scripts = `<script>window.__STATE__ = ${JSON.stringify(initialState)}</script><script src="assets/client.js"></script>`
  } else {
    // If you request the pure client version, it only puts assets/bundle.js inside the script tag.
    // we use `` symbols because we need string to compose it in html tag instead of object
    scripts = `<script src="../assets/bundle.js"></script>`;
    // this version will return incorrect string and client rendering will work incorrect.
    //scripts = `<script src="../assets/bundle.js" />`;
    // will provide object to us instead of string
    //scripts = (<script src="../assets/bundle.js" />);
  }
  // returns composed version
  return (`<html lang="en">
              <head>
                <meta charSet="utf-8" />
                <title>${title}</title>
                <link href="../assets/style.css" rel="stylesheet" />
              </head>
              <body>
                <div class="content"><div id="app" class="wrap-inner">${content}</div>
                <div>${scripts}</div>
              </body>
              </html>`);
}

module.exports = template;
