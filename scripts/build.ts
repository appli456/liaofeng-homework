import fs from 'fs';
import path from 'path';
import { exec, cp, } from 'shelljs';
import pathConfig from './path.config';
import {copyFolder} from "./utils";

const enterprise = pathConfig.enterprise;

function buildEnterprise() {
  const js = path.join(enterprise, 'js');
  const media = path.join(enterprise, 'media');
  const styles = path.join(enterprise, 'styles');
  const html = path.join(enterprise, 'public');
  const buildEnterprise = path.join(pathConfig.build, 'enterprise');
  if (!fs.existsSync(buildEnterprise)) {
    fs.mkdirSync(buildEnterprise);
  }

  exec('cd packages/enterprise && npm run tailwind:build', {}, () => {
    Promise.all([
      copyFolder(js, path.join(buildEnterprise, 'js')),
      copyFolder(media, path.join(buildEnterprise, 'media')),
      copyFolder(styles, path.join(buildEnterprise, 'styles')),
      copyFolder(html, path.join(buildEnterprise, 'public'))
    ]).then().catch((e) => {
      console.log('企业站编译失败:', e);
    })
  });
}

function buildPersonalProfile() {
  const buildPersonalProfile = path.join(pathConfig.build, 'personal-profile');
  if (!fs.existsSync(buildPersonalProfile)) {
    fs.mkdirSync(buildPersonalProfile);
  }
  const css = path.join(pathConfig.personalProfile, 'index.css');
  const html = path.join(pathConfig.personalProfile, 'index.html');
  const img = path.join(pathConfig.personalProfile, 'img.png');

  fs.copyFileSync(css, path.join(buildPersonalProfile, 'index.css'));
  fs.copyFileSync(html, path.join(buildPersonalProfile, 'index.html'));
  fs.copyFileSync(img, path.join(buildPersonalProfile, 'img.png'));
}

function buildBarrage() {
  const dist = path.join(pathConfig.barrageDirectory, 'dist');
  const buildBarrage = path.join(pathConfig.build, 'barrage');

  if (!fs.existsSync(buildBarrage)) {
    fs.mkdirSync(buildBarrage);
  }

  exec("cd packages/barrage && npm run build", {}, () => {
    copyFolder(dist, buildBarrage).then();
  });
}

function buildGithubTrending() {
  const dist = path.join(pathConfig.githubTrending, 'dist');
  const buildGithubTrending = path.join(pathConfig.build, 'github-trending');

  if (!fs.existsSync(buildGithubTrending)) {
    fs.mkdirSync(buildGithubTrending);
  }

  exec("cd packages/github-trending && npm run build", {}, () => {
    copyFolder(dist, buildGithubTrending).then();
  });
}

function buildGithubTrendingRaw() {
  const buildGithubTrending = path.join(pathConfig.build, 'github-trending-raw');

  if (!fs.existsSync(buildGithubTrending)) {
    fs.mkdirSync(buildGithubTrending);
  }

  const js = path.join(pathConfig.githubTrendingRaw, 'app.js');
  const html = path.join(pathConfig.githubTrendingRaw, 'index.html');

  fs.copyFileSync(js, path.join(buildGithubTrending, 'app.js'));
  fs.copyFileSync(html, path.join(buildGithubTrending, 'index.html'));
}

function buildCart() {
  const dist = path.join(pathConfig.cart, 'dist');
  const buildCart = path.join(pathConfig.build, 'cart');

  if (!fs.existsSync(buildCart)) {
    fs.mkdirSync(buildCart);
  }

  exec("cd packages/cart && npm run build", {}, () => {
    copyFolder(dist, buildCart).then();
  });
}

function copyToGithubPage() {
  cp('-rf', pathConfig.build, path.join(pathConfig.appDirectory, '..', 'appli456.github.io'))
}

if (!fs.existsSync(pathConfig.build)) {
  fs.mkdirSync(pathConfig.build);
}

buildPersonalProfile();
buildBarrage();
buildEnterprise();
buildGithubTrending();
buildGithubTrendingRaw();
buildCart();

copyToGithubPage();
