const ts = require('typescript');
const text = `const isInWishlist = (id) => false;
const product = { id: 1 };
const x = (
  <Button size="lg">
    <Heart className={\`h-6 w-6 \${isInWishlist(product.id) ? \"fill-red-500 text-red-500\" : \"\"}\`} />
  </Button>
);`;
const sf = ts.createSourceFile('test.tsx', text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
console.log('diagnostics', sf.parseDiagnostics.length);
sf.parseDiagnostics.forEach(d => {
  const pos = sf.getLineAndCharacterOfPosition(d.start);
  console.log(d.messageText, 'at', pos.line+1, pos.character+1);
});
