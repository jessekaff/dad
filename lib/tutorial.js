const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');

async function runTutorial() {
  console.log(chalk.blue.bold('\n📚 DAD Interactive Tutorial\n'));
  console.log(chalk.gray('Learn how to use DAD with your AI assistant.\n'));
  
  const { ready } = await inquirer.prompt([{
    type: 'confirm',
    name: 'ready',
    message: 'Ready to learn about DAD?',
    default: true
  }]);
  
  if (!ready) return;
  
  const sections = [
    {
      title: '1. Understanding DAD',
      content: [
        'DAD provides structured documentation that helps AI assistants understand your project.',
        '',
        'Key folders:',
        '  • .dad/product/     - Your product vision and roadmap',
        '  • .dad/standards/   - Coding conventions and best practices',
        '  • .dad/tasks/       - Feature specifications',
        '  • .dad/instructions/ - AI workflow commands'
      ]
    },
    {
      title: '2. The DAD Workflow',
      content: [
        'DAD follows a structured workflow:',
        '',
        '1. PLAN → Create specifications',
        '2. EXECUTE → Implement with tests',
        '3. ITERATE → Refine and improve',
        '',
        'This ensures consistent, high-quality development.'
      ]
    },
    {
      title: '3. Core AI Commands',
      content: [
        'Use these commands with Claude or Cursor:',
        '',
        chalk.yellow('plan-product'),
        '  → Initialize DAD for a NEW project',
        '  → Creates product vision, roadmap, tech stack',
        '',
        chalk.yellow('analyze-product'),
        '  → Install DAD in EXISTING codebase',
        '  → Analyzes your code and creates documentation',
        '',
        chalk.yellow('plan-task'),
        '  → Plan a new feature before coding',
        '  → Creates detailed specifications',
        '',
        chalk.yellow('execute-task'),
        '  → Implement the planned feature',
        '  → Follows TDD approach automatically'
      ]
    },
    {
      title: '4. Using with Claude Code',
      content: [
        'In Claude Code, simply type:',
        '',
        chalk.cyan('"Run plan-product"'),
        '  Claude will initialize your project docs',
        '',
        chalk.cyan('"Run plan-task for user authentication"'),
        '  Claude will create a detailed spec',
        '',
        chalk.cyan('"Run execute-task for the auth spec"'),
        '  Claude will implement everything',
        '',
        'Claude automatically reads from .dad/ folder!'
      ]
    },
    {
      title: '5. Using with Cursor',
      content: [
        'In Cursor, use commands in chat:',
        '',
        chalk.magenta('@plan-product'),
        '  Initialize project documentation',
        '',
        chalk.magenta('@plan-task user authentication'),
        '  Create feature specification',
        '',
        chalk.magenta('@execute-task #auth-spec'),
        '  Implement the feature',
        '',
        'Cursor uses .cursorignore to optimize context.'
      ]
    },
    {
      title: '6. Example Workflow',
      content: [
        'Let\'s say you want to add user authentication:',
        '',
        '1. Tell your AI: ' + chalk.green('"plan-task for user authentication"'),
        '   → Creates .dad/tasks/auth-spec.md',
        '',
        '2. Review the spec, then say: ' + chalk.green('"execute-task for auth"'),
        '   → AI implements everything systematically',
        '',
        '3. The AI will:',
        '   • Create database models',
        '   • Build API endpoints',
        '   • Add frontend components',
        '   • Write tests',
        '   • Update documentation'
      ]
    },
    {
      title: '7. Best Practices',
      content: [
        '✅ DO:',
        '  • Always plan before executing',
        '  • Keep .dad/product/mission.md updated',
        '  • Review AI-generated specs before executing',
        '  • Let DAD manage task complexity',
        '',
        '❌ DON\'T:',
        '  • Skip planning for complex features',
        '  • Edit .dad/instructions/ (core workflows)',
        '  • Ignore the generated documentation',
        '  • Try to execute without planning first'
      ]
    }
  ];
  
  for (let i = 0; i < sections.length; i++) {
    console.clear();
    console.log(chalk.blue.bold(`\n${sections[i].title}\n`));
    
    sections[i].content.forEach(line => {
      console.log(line.startsWith('  ') ? chalk.gray(line) : chalk.white(line));
    });
    
    if (i < sections.length - 1) {
      console.log('');
      const { next } = await inquirer.prompt([{
        type: 'confirm',
        name: 'next',
        message: 'Continue to next section?',
        default: true
      }]);
      
      if (!next) break;
    }
  }
  
  console.log(chalk.green.bold('\n✅ Tutorial Complete!\n'));
  console.log(chalk.yellow('Next steps:'));
  console.log('  1. Run ' + chalk.white('dad init') + ' in your project');
  console.log('  2. Open your AI assistant (Claude or Cursor)');
  console.log('  3. Try ' + chalk.white('"plan-product"') + ' or ' + chalk.white('"analyze-product"'));
  console.log('');
  console.log(chalk.cyan('💡 Tip: Run ' + chalk.white('dad commands') + ' to see all available AI commands.'));
  console.log('');
}

module.exports = { runTutorial };