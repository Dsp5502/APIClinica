import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}/`;
const router = Router();

const cleanFileName = (fileName: string) => {
  const extension = fileName.endsWith('.ts') ? '.ts' : '.js';
  return fileName.replace(extension, '');
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== 'index') {
    import(`./${cleanName}`).then((module) => {
      console.log(`Adding route /${cleanName}`);
      router.use(`/${cleanName}`, module.router);
    });
  }
});

export { router };
