/* eslint-disable react/no-danger */

import React, { PropTypes } from 'react';

const Html = ({ content, state }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"
        integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7"
        crossOrigin="anonymous"
      />
      <title>GitHunt</title>
    </head>
    <body>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
      <div id="footer">
        <ul>
          <li>
            Fork on <a href="https://github.com/apollostack/GitHunt">Github</a>
          </li>
          <li>
            This is an{' '}
            <a href="http://www.apollostack.com/">Apollo</a>
            {' '}example app
          </li>
        </ul>
      </div>
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(state)};`
        }}
        charSet="UTF-8"
      />
      <script src="/static/bundle.js" charSet="UTF-8" />
    </body>
  </html>
);

Html.propTypes = {
  content: PropTypes.string.isRequired,
  // eslint-disable-line react/forbid-prop-types
  state: PropTypes.object.isRequired
};

export default Html;
