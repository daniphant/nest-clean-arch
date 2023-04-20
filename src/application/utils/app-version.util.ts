import * as fs from 'fs';
import * as path from 'path';

export const getAppVersion = (): string => {
  const packageJsonPath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'package.json',
  );

  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  return packageJson.version;
};
