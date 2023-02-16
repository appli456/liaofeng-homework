import fs from 'fs';
import { join } from 'path';
import { readdir, lstat, copyFile } from 'fs/promises';

function copyFolder(path: string, outputPath: string): Promise<any> {
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath);
  }

  return lstat(path).then((stat) => {
    if (stat.isDirectory()) {
      return readdir(path)
    }
    throw new Error('路径不是文件夹')
  }).then((files) => {
    const promises: Promise<any>[] = []

    files.forEach((file) => {
      const promise = new Promise((resolve) => {
        lstat(join(path, file)).then((fileStat) => {
          const fileRelativePath = file.replace(path, '');
          if(fileStat.isDirectory()) {
            resolve(copyFolder(join(path, file), join(outputPath, file)));
          } else {
            resolve(copyFile(join(path, file), join(outputPath, file)));
          }
          resolve(true);
        });
      });

      promises.push(promise);

      return Promise.all(promises);
    });
  }).catch((err) => {
    console.log('err', err);
  }).finally(() => {
    return true;
  });
}

export {
  copyFolder,
}
