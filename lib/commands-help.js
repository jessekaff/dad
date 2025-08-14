const chalk = require('chalk');

async function showCommands() {
  console.log(chalk.blue.bold('\n🤖 DAD AI Commands Reference\n'));
  console.log(chalk.gray('Use these commands with your AI assistant after running "dad init".\n'));
  
  const commands = [
    {
      name: 'plan-product',
      description: 'Initialize DAD for a NEW project',
      when: 'Starting from scratch with no code',
      usage: {
        claude: '"Run plan-product"',
        cursor: '@plan-product'
      },
      outputs: [
        '.dad/product/mission.md',
        '.dad/product/roadmap.md',
        '.dad/product/tech-stack.md',
        '.dad/standards/*'
      ]
    },
    {
      name: 'analyze-product',
      description: 'Install DAD in EXISTING codebase',
      when: 'Adding DAD to a project with code',
      usage: {
        claude: '"Run analyze-product"',
        cursor: '@analyze-product'
      },
      outputs: [
        'Same as plan-product but based on existing code',
        'Inferred tech stack and patterns'
      ]
    },
    {
      name: 'plan-task',
      description: 'Create detailed feature specification',
      when: 'Before implementing any new feature',
      usage: {
        claude: '"Run plan-task for [feature name]"',
        cursor: '@plan-task [feature name]'
      },
      outputs: [
        '.dad/tasks/[feature]-spec.md',
        'User stories',
        'Technical requirements',
        'Task breakdown'
      ]
    },
    {
      name: 'execute-task',
      description: 'Implement a planned feature',
      when: 'After running plan-task',
      usage: {
        claude: '"Run execute-task for [spec name]"',
        cursor: '@execute-task #[spec-name]'
      },
      outputs: [
        'Complete implementation',
        'Tests',
        'Documentation updates'
      ]
    },
    {
      name: 'execute-subtask',
      description: 'Implement specific subtasks',
      when: 'Working on part of a larger feature',
      usage: {
        claude: '"Run execute-subtask [subtask-id]"',
        cursor: '@execute-subtask [subtask-id]'
      },
      outputs: [
        'Subtask implementation',
        'Unit tests'
      ]
    }
  ];
  
  // Command details
  commands.forEach(cmd => {
    console.log(chalk.yellow.bold(`📋 ${cmd.name}`));
    console.log(chalk.white(`   ${cmd.description}`));
    console.log(chalk.gray(`   When: ${cmd.when}`));
    console.log('');
    console.log(chalk.cyan('   Usage:'));
    console.log(`     Claude: ${chalk.white(cmd.usage.claude)}`);
    console.log(`     Cursor: ${chalk.white(cmd.usage.cursor)}`);
    console.log('');
    console.log(chalk.green('   Creates:'));
    cmd.outputs.forEach(output => {
      console.log(chalk.gray(`     • ${output}`));
    });
    console.log('');
  });
  
  // Workflow example
  console.log(chalk.blue.bold('📖 Example Workflow:\n'));
  
  const workflow = [
    { step: '1. Initialize', cmd: 'dad init --claude', desc: 'Set up DAD in your project' },
    { step: '2. Plan', cmd: 'Run plan-product', desc: 'Create project documentation' },
    { step: '3. Feature', cmd: 'Run plan-task for user auth', desc: 'Spec out authentication' },
    { step: '4. Build', cmd: 'Run execute-task for auth', desc: 'Implement authentication' },
  ];
  
  workflow.forEach(w => {
    console.log(chalk.yellow(w.step));
    console.log(chalk.white(`   ${w.cmd}`));
    console.log(chalk.gray(`   → ${w.desc}`));
    console.log('');
  });
  
  console.log(chalk.cyan.bold('💡 Tips:\n'));
  console.log('  • Always plan before executing');
  console.log('  • Review generated specs before implementation');
  console.log('  • Keep .dad/product/ updated as project evolves');
  console.log('  • Use .dad/standards/ for consistency');
  console.log('');
  console.log(chalk.gray('Learn more: https://github.com/jessekaff/dad'));
  console.log('');
}

module.exports = { showCommands };