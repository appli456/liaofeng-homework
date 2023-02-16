import fs from "fs";
import pathConfig from './path.config';

fs.unlinkSync(pathConfig.build);
