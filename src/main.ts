import cac from 'cac'
import init from './init/cli'
import { name, version } from '../package.json'

const cli = cac(name)

cli
  .command('create', 'Create new project from a template')
  .option('-f, --force', 'Overwrite if the target exists')
  .option('-o, --offline', 'Try to use an offline template')
  // .option('-d, --debug', 'Output detailed exception when exception occurs')
  .allowUnknownOptions() // for prompts override.
  .example('  # with an official template')
  .example(`  $ ${name} <template> [project]`)
  .example('  # with a custom github repo')
  .example(`  $ ${name} <owner>/<repo> [project]`)
  .action(init)