const fs = require('fs');
const ts = require('typescript');
const text = fs.readFileSync('components/product/product-details.tsx', 'utf8');
const startText = '          {/* Wishlist & Share Buttons - on one row */}';
const endText = '            {/* Share Button with Menu */}';
const start = text.indexOf(startText);
const end = text.indexOf(endText, start);
if (start < 0 || end < 0) {
  console.error('markers not found');
  process.exit(1);
}
const snippet = text.slice(start, end) + '            {/* Share Button with Menu */}\n            </div>\n';
const header = `const isInWishlist = (id) => false;\nconst handleWishlist = () => {};\nconst setShowShareMenu = () => {};\nconst showShareMenu = false;\nconst product = { id: 1 };\nconst Button = (props) => null;\nconst Heart = () => null;\nconst Share2 = () => null;\n`;
const wrapper = header + 'const x = (' + snippet + ');';
const sf = ts.createSourceFile('test.tsx', wrapper, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
console.log('diagnostics', sf.parseDiagnostics.length);
sf.parseDiagnostics.forEach(d => {
  const p = sf.getLineAndCharacterOfPosition(d.start);
  console.log(d.messageText, 'at', p.line + 1, p.character + 1);
});
