import * as fs from 'fs';
import * as path from 'path';

export interface MethodObject {
  [key: string]: MethodObject | Function;
}

function createMethodObject(directory: string): MethodObject {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }

  const files = fs.readdirSync(directory);
  const methodObject: MethodObject = {};

  files.forEach((file) => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      methodObject[file] = createMethodObject(filePath);
    } else if (stats.isFile() && (file.endsWith('.js') || file.endsWith('.ts'))) {
      const moduleName = file.replace(/\.(js|ts)$/, '');
      const modulePath = path.relative(__dirname, filePath);
      const module = require(`./${modulePath}`);

      const exportedFunctions = Object.keys(module).filter(
        (key) => typeof module[key] === 'function'
      );

      if (exportedFunctions.length > 0) {
        const moduleObject: Record<string, Function> = {};

        exportedFunctions.forEach((funcName) => {
          moduleObject[funcName] = module[funcName];
        });

        methodObject[moduleName] = moduleObject;
      }
    }
  });

  return methodObject;
}

export { createMethodObject };
