const ts = require('typescript');
const text = `const isInWishlist = (id) => false;
const product = { id: 1 };
const x = (
  <Button className={\`flex-1 sm:flex-none sm:px-4 bg-transparent transition-colors \${isInWishlist(product.id) ? "bg-red-50 border-red-300" : ""}\`} />
);
`;
const sf = ts.createSourceFile('test.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
console.log('diagnostics', sf.parseDiagnostics.length);
sf.parseDiagnostics.forEach(d => {
  const p = sf.getLineAndCharacterOfPosition(d.start);
  console.log(d.messageText, 'at', p.line + 1, p.character + 1);
});
