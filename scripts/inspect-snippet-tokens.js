const fs = require('fs');
const ts = require('typescript');
const text = fs.readFileSync('components/product/product-details.tsx', 'utf8');
const startText = '          {/* Wishlist & Share Buttons - on one row */}';
const endText = '        </div>\n\n        {/* Trust Badges */}';
const start = text.indexOf(startText);
const end = text.indexOf(endText, start);
const snippet = text.slice(start, end) + '        </div>\n';
const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.JSX, snippet, undefined, 0, snippet.length);
let token;
const buf = [];
while ((token = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
  const pos = scanner.getTextPos();
  const tokText = scanner.getTokenText();
  if (pos < 3000) buf.push({ pos, kind: ts.SyntaxKind[token], text: tokText });
  if (buf.length > 200) buf.shift();
}
for (const entry of buf) {
  console.log(entry.pos, entry.kind, JSON.stringify(entry.text));
}
