import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { spawn } from 'node:child_process'

export function getProjects() {
  const projects = fs.readdirSync(os.homedir() + '/Dev/')
  const onliFolders = projects.filter((project) => {
    return fs.statSync(os.homedir() + '/Dev/' + project).isDirectory()
  })
  return onliFolders
}

export function setProject(projectName: string) {
  const project = projectName
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

export function createProject(name: string, gen: string, git: boolean) {
  console.log(name, gen, git)
  if (name === null) {
    console.log('Project name is required')
    return
  }

  if (gen === 'none') {
    createFolder(name)
    if (git) {
      const child = spawn('git', ['init'], { stdio: 'inherit', cwd: os.homedir() + '/Dev/' + name })
      child.on('error', (err) => { console.log(err); return })
      console.log('Git repository created')
    }
    return
  }

  const child = spawn('bun', ['create', gen, name], { stdio: 'inherit', cwd: os.homedir() + '/Dev' })
  child.on('error', (err) => { console.log(err) })
}

function createFolder(name: string) {
  const projectPath = path.join(os.homedir(), 'Dev', name)
  if (fs.existsSync(projectPath)) {
    console.log('Project already exists')
    return
  }
  fs.mkdirSync(projectPath)
}

export function removeProject(projectName: string) {
  const project = projectName
  const projectList = getProjects()
  if (!projectList.includes(project)) {
    console.log('Project not found')
    return
  }
  fs.rmdirSync(path.join(os.homedir(), 'Dev', project), { recursive: true })
  console.log('Project removed')
}
