import fs from "fs";
import pathConfig from './path.config';
import { rm } from 'shelljs';

rm('-Rf', pathConfig.build)
