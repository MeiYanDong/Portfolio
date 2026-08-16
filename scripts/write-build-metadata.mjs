import { execFileSync } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

function git(args, fallback = '') {
  try {
    return execFileSync('git', args, { encoding: 'utf8' }).trim()
  } catch {
    return fallback
  }
}

const revision =
  process.env.COMMIT_REF || process.env.GITHUB_SHA || git(['rev-parse', 'HEAD'], 'unknown')
const dirty = git(['status', '--porcelain']) !== ''
const metadata = {
  revision,
  shortRevision: revision === 'unknown' ? revision : revision.slice(0, 12),
  builtAt: new Date().toISOString(),
  context: process.env.CONTEXT || process.env.GITHUB_EVENT_NAME || 'local',
  dirty
}

const outputDirectory = resolve('out')
mkdirSync(outputDirectory, { recursive: true })
writeFileSync(resolve(outputDirectory, 'build-meta.json'), `${JSON.stringify(metadata, null, 2)}\n`)
console.log(`Build metadata written for ${metadata.shortRevision}${dirty ? ' (dirty)' : ''}.`)
