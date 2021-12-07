import { promisify } from "util";
import download_git_repo from "download-git-repo";
import ora from 'ora'
export default async function (repo, desc) {
  const download = promisify(download_git_repo);
  const process = ora(`下载.....${repo}`);
  process.start();
  try {
    await download(repo, desc);
    
  } catch (error) {
    console.log('err',error)
    process.fail()
  }
  process.succeed();
};
