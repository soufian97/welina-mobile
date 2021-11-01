const glob = require('glob');
const fs = require('fs');
const path = require('path');
const { parse } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { LOCALS } = require('../app/config/i18n');

const mkDir = (path) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  return path;
};

const resolveAbsolutePath = (relativePath) =>
  path.join(process.cwd(), relativePath);

glob('app/**/*.{js,jsx,ts,tsx}', {}, (_err, files) => {
  let translationFiles = new Set();
  files.forEach((file) => {
    const sourceCode = fs.readFileSync(resolveAbsolutePath(file), 'utf-8');
    const ast = parse(sourceCode, {
      sourceType: 'module',
      plugins: ['jsx', 'classProperties'],
    });
    traverse(ast, {
      CallExpression({ node }) {
        if (node.callee.name === 'defineMessage') {
          translationFiles.add(file);
        }
      },
    });
  });
  let translation = [...translationFiles]
    .map((file) =>
      Object.values(require(path.join(process.cwd(), file))).map(
        (translation) =>
          Object.values(translation).map(({ id, defaultMessage }) => ({
            [id]: defaultMessage,
          })),
      ),
    )
    .flat(Number.MAX_VALUE)
    .reduce((acc, next) => ({ ...acc, ...next }), {});

  let rootTranslationDirectory = path.join(process.cwd(), 'app/translations');

  LOCALS.forEach((local) => {
    fs.writeFileSync(
      path.join(mkDir(rootTranslationDirectory), `${local}.json`),
      JSON.stringify(translation, null, 2),
    );
  });
});
