import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'

const supportedExtensions = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.jsx',
  '.md',
  '.mjs',
  '.scss',
  '.ts',
  '.tsx',
  '.yaml',
  '.yml'
])

function git(args) {
  return execFileSync('git', args, { encoding: 'utf8' }).trim()
}

function listChangedFiles() {
  const baseBranch = process.env.GITHUB_BASE_REF
  let beforeSha = process.env.GITHUB_EVENT_BEFORE

  if (!beforeSha && process.env.GITHUB_EVENT_PATH && existsSync(process.env.GITHUB_EVENT_PATH)) {
    try {
      beforeSha = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')).before
    } catch {
      beforeSha = undefined
    }
  }

  if (baseBranch) {
    return git(['diff', '--name-only', '--diff-filter=ACMR', `origin/${baseBranch}...HEAD`])
  }

  if (beforeSha && !/^0+$/.test(beforeSha)) {
    return git(['diff', '--name-only', '--diff-filter=ACMR', beforeSha, 'HEAD'])
  }

  if (process.env.CI) {
    return git(['diff', '--name-only', '--diff-filter=ACMR', 'HEAD^', 'HEAD'])
  }

  const tracked = git(['diff', '--name-only', '--diff-filter=ACMR', 'HEAD'])
  const untracked = git(['ls-files', '--others', '--exclude-standard'])
  return [tracked, untracked].filter(Boolean).join('\n')
}

const files = [...new Set(listChangedFiles().split('\n'))]
  .filter(Boolean)
  .filter((file) => existsSync(file))
  .filter((file) => {
    const index = file.lastIndexOf('.')
    return index >= 0 && supportedExtensions.has(file.slice(index))
  })

if (files.length === 0) {
  console.log('Prettier: no changed text files to check.')
  process.exit(0)
}

const mode = process.argv.includes('--write') ? '--write' : '--check'
const result = spawnSync('prettier', [mode, ...files], {
  encoding: 'utf8',
  shell: process.platform === 'win32',
  stdio: 'inherit'
})

process.exit(result.status ?? 1)
