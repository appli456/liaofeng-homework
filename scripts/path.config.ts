import path from 'path';
const appDirectory = path.join(__dirname, '..');
const monorepoDir = path.join('packages');
const buildDir = path.join(appDirectory, 'build');

export default {
  appDirectory,
  monorepo: monorepoDir,
  barrageDirectory: path.join(monorepoDir, 'barrage'),
  personalProfile: path.join(monorepoDir, 'personal-profile'),
  enterprise: path.join(monorepoDir, 'enterprise'),
  githubTrending: path.join(monorepoDir, 'github-trending'),
  cart: path.join(monorepoDir, 'cart'),
  build: buildDir,
}
