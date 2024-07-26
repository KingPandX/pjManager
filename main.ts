import { getProjects, createProject, removeProject, setProject } from './pjmanage'
import { add, select, AddAnswers, SelectionAnswers } from './promps'

const commands = { list: list, add: _add, remove: _remove, set: _set }

function list() {
  const projects = getProjects()
  console.log('Projects:')
  console.log(' ' + projects.join('\n '))
}

async function _add() {
  const answers: AddAnswers = await add()
  createProject(answers.projectName, answers.gen, answers.git)
}

async function _remove() {
  const projects = getProjects()
  const answers: SelectionAnswers = await select(projects)
  removeProject(answers.projectName)
}

async function _set() {
  const projects = getProjects()
  const answers: SelectionAnswers = await select(projects)
  setProject(answers.projectName)
}

commands[process.argv[2]]()
