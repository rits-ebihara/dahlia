#!/usr/local/bin/node

import fs from 'fs-extra';
import path from 'path';

const argPath = process.argv[2].replace(/^(\.\/)?src\//, '');

if (/[a-zA-Z0-9/[\].\-_]+/.test(argPath) === false) {
  console.error(
    '第1引数(パス)は半角英数字と記号"/[]-_."のみを指定してください。',
  );
  process.exit(1);
}

const fullPath = path.join(process.cwd(), 'src', argPath);
const pathObj = path.parse(fullPath);

const name = pathObj.name;

if (/^[A-Z]/.test(name) === false) {
  console.error(
    'パスの最後(コンポーネント名 or ページ名)は大文字から始まる名前を指定してください。',
  );
  process.exit(1);
}

if (fs.existsSync(fullPath)) {
  console.error('指定されたパスはすでに存在します。');
  process.exit(1);
}

await fs.mkdirp(fullPath);
const tempDir = path.join(process.cwd(), '.rcfc-template');

const fileCopyPromise = [
  fs.copyFile(
    path.join(tempDir, `$component.tsx`),
    path.join(fullPath, `${name}.tsx`),
  ),
  fs.copyFile(
    path.join(tempDir, `index.tsx`),
    path.join(fullPath, `index.tsx`),
  ),
  fs.copyFile(
    path.join(tempDir, `$component.test.tsx`),
    path.join(fullPath, `${name}.test.tsx`),
  ),
  fs.copyFile(
    path.join(tempDir, `$component.stories.tsx`),
    path.join(fullPath, `${name}.stories.tsx`),
  ),
];

await Promise.all(fileCopyPromise);

const replace = async fsPath => {
  const file = await fs.readFile(fsPath, 'utf8');
  const replaced = file
    .replace(/\$component/g, name)
    .replace(/\$path/g, argPath);
  return fs.writeFile(fsPath, replaced);
};

const sedPromise = [
  replace(path.join(fullPath, `${name}.tsx`)),
  replace(path.join(fullPath, `index.tsx`)),
  replace(path.join(fullPath, `${name}.test.tsx`)),
  replace(path.join(fullPath, `${name}.stories.tsx`)),
];

await Promise.all(sedPromise);
