const fs = require('fs');
const ts = require('typescript');
const file = 'components/product/product-details.tsx';
const text = fs.readFileSync(file, 'utf8');
const startText = '          {/* Wishlist & Share Buttons - on one row */}';
const endText = '        </div>\n\n        {/* Trust Badges */}';
const start = text.indexOf(startText);
const end = text.indexOf(endText, start);
if (start < 0 || end < 0) {
  console.error('markers not found');
  process.exit(1);
}
const snippet = text.slice(start, end) + '        </div>\n';
const lines = snippet.split(/\r?\n/);
const candidate = lines.slice(0, 25).join('\n') + '\n          </div>\n';
const header = `const isInWishlist = (id) => false;\nconst handleWishlist = () => {};\nconst setShowShareMenu = () => {};\nconst showShareMenu = false;\nconst handleCopyLink = () => {}; const handleShareFacebook = () => {}; const handleShareWhatsApp = () => {}; const handleShareEmail = () => {}; const Copy = () => null; const Facebook = () => null; const MessageCircle = () => null; const Mail = () => null; const Share2 = () => null; const Button = (props) => null; const Heart = () => null; const product = { id: 1 };\n`;
const wrapper = header + 'const x = (' + candidate + ');';
const sf = ts.createSourceFile('test.tsx', wrapper, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
console.log('diagnostics', sf.parseDiagnostics.length);
for (const d of sf.parseDiagnostics) {
  const p = sf.getLineAndCharacterOfPosition(d.start);
  console.log(`${d.messageText} at ${p.line+1}:${p.character+1}`);
}
console.log('----SNIPPET----');
console.log(candidate);
