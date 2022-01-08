import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'
import {
  isFileAndDirValid,
  formatFileAndDirValue
} from '../src/file-and-dir-valid'

test('input type not valid', async () => {
  const input = ''
  expect(isFileAndDirValid(input)).toBeFalsy()
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs and need not merge', () => {
  process.env['INPUT_REMOTE_PATH'] = path.join(__dirname, 'temp-path', 'test')
  process.env['INPUT_REMOTE_PATH_PREV'] = path.join(
    __dirname,
    'temp-path',
    'test-prev'
  )

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test runs and need merge but merge_file_dir is not valid', () => {
  process.env['INPUT_REMOTE_PATH'] = path.join(__dirname, 'temp-path', 'test')
  process.env['INPUT_REMOTE_PATH_PREV'] = path.join(
    __dirname,
    'temp-path',
    'test-prev'
  )
  process.env['INPUT_NEED_MERGE'] = 'true'

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})

test('test runs and need merge and success', () => {
  process.env['INPUT_REMOTE_PATH'] = path.join(
    __dirname,
    '..',
    'temp-path',
    'test'
  )
  process.env['INPUT_REMOTE_PATH_PREV'] = path.join(
    __dirname,
    '..',
    'temp-path',
    'test-prev'
  )
  process.env['INPUT_NEED_MERGE'] = 'true'
  process.env['INPUT_MERGE_FILE_DIR'] = './.gitignore,./.github'
  process.env['INPUT_DIST_PATH_NAME'] = 'temp-path'

  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
