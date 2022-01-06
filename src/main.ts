import * as core from '@actions/core'
import * as fs from 'fs/promises'
import {formatFileAndDirValue, isFileAndDirValid} from './file-and-dir-valid'

async function run(): Promise<void> {
  try {
    const need_merge: string = core.getInput('need_merge')
    const merge_file_dir: string = core.getInput('merge_file_dir')

    if (!need_merge) {
      core.info('need not merge file and dir')
    } else if (!isFileAndDirValid(merge_file_dir)) {
      core.info('merge_file_dir is not valid')
    } else {
      const fileAndPathList = formatFileAndDirValue(merge_file_dir)
      
    }

    // core.debug(`Waiting ${ms} milliseconds ...`) // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

    // core.debug(new Date().toTimeString())

    // core.debug(new Date().toTimeString())

    // core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
