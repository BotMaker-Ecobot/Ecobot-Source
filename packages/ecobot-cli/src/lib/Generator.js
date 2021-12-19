import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();

function generate(path) {
  // TODO: Make it so that you import a path of the template type
  const tempFile = (process.cwd(), path);
  const existingConfig = fs.existsSync(tempFile);
  const fsPromise = fs.promises;

  fsPromise.mkdir(path).then(() => {
    fse.copy(process.env.templateSource, path);
  });

}

export default generate;
