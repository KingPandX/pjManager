import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import inquirer from 'inquirer'

//mostrar la lista de carpetas en la ruta ~/Dev/

const method = Bun.argv[2]

const commands = ['list', 'set', 'add', 'remove']

function getProjects() {
  const projects = fs.readdirSync(os.homedir() + '/Dev/')
  const onliFolders = projects.filter((project) => {
    return fs.statSync(os.homedir() + '/Dev/' + project).isDirectory()
  })
  return onliFolders
}

if (method === 'list') {
  const projects = getProjects()
  console.log(projects.join('\n'))
}

if (method === 'set') {
  if (!Bun.argv[3]) {
    inquirer.prompt([{ type: 'list', name: 'project', message: 'Select a project', choices: getProjects() }])
      .then((answer) => {
        setProject(answer)
      })
  }
  else {
    setProject(Bun.argv[3])
  }
}

function setProject(answer) {
  const project = answer.project || answer
  const projectList = getProjects()
  if (!projectList.includes(project)) {
    console.log('Project not found')
    return
  }
  const projectPath = path.join(os.homedir(), 'Dev', project)
  console.log(projectPath)
  fs.writeFileSync(path.join(os.homedir(), 'Dev', '.path'), projectPath)
  console.log('Project set')
}

if (method === 'add') {
  if (!Bun.argv[3]) {
    inquirer.prompt([{ type: 'input', name: 'project', message: 'Enter the project name' }])
      .then((answer) => {
        createProject(answer.project)
      })
  }
  else {
    createProject(bun.argv[3])
  }
}

function createProject(name) {
  const projectList = getProjects()

  if (projectList.includes(name)) {
    console.log('Project already exists')
    return
  }

  fs.mkdirSync(path.join(os.homedir(), 'Dev', name))
}

if (method === 'remove') {
  if (!Bun.argv[3]) {
    inquirer.prompt([{ type: 'list', name: 'project', message: 'Select a project', choices: getProjects() }])
      .then((answer) => {
        areYouSure(answer.project)
      })
  }
  else {
    areYouSure(Bun.argv[3])
  }
}

function removeProject(answer) {
  const project = answer
  const projectList = getProjects()
  if (!projectList.includes(project)) {
    console.log('Project not found')
    return
  }
  fs.rmdirSync(path.join(os.homedir(), 'Dev', project), { recursive: true })
  console.log('Project removed')
}

function areYouSure(projectToRemove) {
  inquirer.prompt([{ type: 'confirm', name: 'sure', message: 'Are you sure you want to remove ' + projectToRemove }])
    .then((answer) => {
      if (answer.sure) {
        removeProject(projectToRemove)
      }
    })
}

if (!commands.includes(method)) {
  console.log('Command not found')
}
