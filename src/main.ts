import * as core from '@actions/core'
import * as fsExtra from 'fs-extra'
import {formatFileAndDirValue, isFileAndDirValid} from './file-and-dir-valid'

async function run(): Promise<void> {
  try {
    const need_merge: string = core.getInput('need_merge')
    const merge_file_dir: string = core.getInput('merge_file_dir')
    const dist_path_name: string = core.getInput('dist_path_name')

    if (!need_merge) {
      core.info('need not merge file and dir')
    } else if (!isFileAndDirValid(merge_file_dir)) {
      core.info('merge_file_dir is not valid')
    } else {
      const fileAndPathList = formatFileAndDirValue(merge_file_dir)
      fileAndPathList.forEach(targetPath => {
        fsExtra.copySync(targetPath, `./${dist_path_name}/${targetPath}`)
        core.info(`mv file or dir to ${dist_path_name}`)
      })
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
