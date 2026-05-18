const fs = require('fs');
const ts = require('typescript');
const text = fs.readFileSync('components/product/product-details.tsx', 'utf8');
const scanner = ts.createScanner(ts.ScriptTarget.Latest, false, ts.LanguageVariant.Standard, text, undefined, 0, ts.ScriptKind.TSX);
let tok;
const buf = [];
while ((tok = scanner.scan()) !== ts.SyntaxKind.EndOfFileToken) {
  buf.push({ pos: scanner.getTextPos(), kind: ts.SyntaxKind[tok], text: scanner.getTokenText() });
  if (buf.length > 50) buf.shift();
}
for (const token of buf) {
  console.log(token.pos, token.kind, JSON.stringify(token.text));
}
