import inquirer from 'inquirer';

export interface AddAnswers {
  projectName: string;
  gen: string;
  git: boolean;
}

export interface SelectionAnswers {
  projectName: string;
}

export async function add() {
  const request = await inquirer.prompt(
    [{ type: 'input', name: 'projectName', message: 'Project name:' }, { type: 'list', name: 'gen', message: 'Select generator:', choices: ['vite', 'none'] }, { type: 'confirm', name: 'git', message: 'Create git repository?', default: false }]
  ).then((answers) => {
    return answers as AddAnswers
  })
  return request
}

export async function select(projects: string[]) {
  const request = await inquirer.prompt(
    [{ type: 'list', name: 'projectName', message: 'Select the project:', choices: projects }
    ]).then((answers) => {
      return answers as SelectionAnswers
    })
  return request
}
