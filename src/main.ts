import * as core from '@actions/core'
import * as fsExtra from 'fs-extra'
import * as path from 'path'
import {formatFileAndDirValue, isFileAndDirValid} from './file-and-dir-valid'

async function run(): Promise<void> {
  try {
    const need_merge: string = core.getInput('need_merge') || 'false'
    const merge_file_dir: string = core.getInput('merge_file_dir')
    const dist_path_name: string = core.getInput('dist_path_name') || 'dist'

    if (need_merge === 'false') {
      core.info('need not merge file and dir')
    } else if (!isFileAndDirValid(merge_file_dir)) {
      core.info('merge_file_dir is not valid')
    } else {
      const distPath = path.join(__dirname, '..', dist_path_name)
      if (!fsExtra.existsSync(distPath)) fsExtra.mkdirSync(distPath)

      const fileAndPathList = formatFileAndDirValue(merge_file_dir)

      for (const targetPath of fileAndPathList) {
        const copyPath = path.join(distPath, targetPath)
        const originPath = path.join(__dirname, '..', targetPath)
        if (fsExtra.existsSync(originPath)) {
          fsExtra.copySync(originPath, copyPath, {
            overwrite: true
          })
          core.debug(`merge ${originPath} to ${copyPath}`)
        } else {
          core.debug(`the file or dir path ${originPath} is not exists`)
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
