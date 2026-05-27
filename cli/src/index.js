#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import fs from 'fs-extra';
import path from 'path';
import readline from 'readline';

const program = new Command();
const API_URL = process.env.PRATHAM_UI_API_URL || 'http://localhost:5000';

// Native readline prompt helper
const promptUser = (question) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
};

program
  .name('pratham-ui')
  .description('S.H.I.E.L.D terminal tool to assemble React UI armor')
  .version('1.0.0');

// ----------------------------------------------------
// COMMAND: INIT
// ----------------------------------------------------
program
  .command('init')
  .description('Initialize config folder structure for PrathamUI')
  .action(async () => {
    console.log(chalk.red.bold('\n--- INITIALIZING S.H.I.E.L.D ARCHIVE PROTOCOL ---'));
    
    try {
      const outputDir = await promptUser('Enter component output path (default: src/components/ui): ') || 'src/components/ui';
      const isTSInput = await promptUser('Do you want to use TypeScript? (Y/n): ') || 'y';
      const format = isTSInput.toLowerCase().startsWith('n') ? 'JavaScript' : 'TypeScript';

      const config = {
        outputDir,
        format,
        registryUrl: API_URL,
      };

      await fs.outputJson(path.join(process.cwd(), 'pratham-ui.config.json'), config, { spaces: 2 });
      
      console.log(chalk.green.bold('\n✓ Configurations written to pratham-ui.config.json'));
      console.log(chalk.gray(`Output Directory: ${outputDir}`));
      console.log(chalk.gray(`Format Scheme: ${format}`));
      console.log(chalk.yellow('\nReady! Run: npx pratham-ui add marvel-button\n'));
    } catch (err) {
      console.error(chalk.red('Failed to initialize configuration:'), err);
    }
  });

// ----------------------------------------------------
// COMMAND: LIST
// ----------------------------------------------------
program
  .command('list')
  .description('Retrieve all UI components in PrathamUI archives')
  .action(async () => {
    const spinner = ora('Accessing Stark Systems registry...').start();
    try {
      const res = await fetch(`${API_URL}/api/components`);
      if (!res.ok) throw new Error('System catalog inaccessible');
      const data = await res.json();
      spinner.succeed(chalk.green('Archives linked successfully!\n'));

      console.log(chalk.bold.underline('MCU SUIT COMPONENTS INDEX:'));
      console.log(chalk.gray('----------------------------------------------------'));
      
      data.components.forEach((comp) => {
        const tierBadge = comp.tier === 'pro' ? chalk.yellow.bold('PRO') : chalk.green('FREE');
        console.log(
          `• ${chalk.white.bold(comp.name)} [${chalk.red(comp.slug)}] - Category: ${chalk.cyan(comp.category?.name || 'Unsorted')} (${tierBadge})`
        );
        console.log(chalk.gray(`  ${comp.description}`));
      });
      console.log(chalk.gray('----------------------------------------------------\n'));
    } catch (err) {
      spinner.fail(chalk.red('Failed to retrieve components:'));
      console.error(chalk.red(err.message));
    }
  });

// ----------------------------------------------------
// COMMAND: ADD
// ----------------------------------------------------
program
  .command('add <slug>')
  .description('Assemble a component into your local workspace')
  .option('-k, --key <api-key>', 'Clearance API token from User Dashboard')
  .action(async (slug, options) => {
    const configPath = path.join(process.cwd(), 'pratham-ui.config.json');
    
    // Check config
    if (!await fs.pathExists(configPath)) {
      console.log(chalk.red.bold('\n✕ Configuration file missing.'));
      console.log(chalk.yellow('Please execute: npx pratham-ui init\n'));
      return;
    }

    const config = await fs.readJson(configPath);
    let apiKey = options.key || process.env.PRATHAM_UI_KEY;

    // Fetch details
    const spinner = ora(`Analyzing "${slug}" blueprint...`).start();
    try {
      let res = await fetch(`${API_URL}/api/components/${slug}`);
      if (!res.ok) {
        throw new Error(`Specification "${slug}" not found in database.`);
      }
      let component = await res.json();

      // If pro component and no key, request it
      if (component.tier === 'pro' && !apiKey) {
        spinner.stop();
        console.log(chalk.yellow.bold('\n⚠️ ARC PRO LICENSE DETECTED'));
        apiKey = await promptUser('Enter your PrathamUI Pro API key: ');
        if (!apiKey) {
          console.log(chalk.red('\n✕ Error: Authentication key required for Pro components.\n'));
          return;
        }
        spinner.start(`Decrypting specification "${slug}"...`);
      }

      // If api key, query with authentication headers
      if (apiKey) {
        res = await fetch(`${API_URL}/api/components/${slug}?key=${apiKey}`, {
          headers: { 'x-api-key': apiKey },
        });
        component = await res.json();
      }

      // Check if locked
      if (component.isLocked) {
        spinner.fail(chalk.red(`Lock gate active for "${slug}".`));
        console.log(chalk.red(`Server message: ${component.componentCode}`));
        return;
      }

      // Resolve file name
      const ext = config.format === 'TypeScript' ? 'tsx' : 'jsx';
      const destPath = path.join(process.cwd(), config.outputDir, `${component.name}.${ext}`);

      // Write code
      await fs.outputFile(destPath, component.componentCode);
      spinner.succeed(chalk.green(`✓ Suit assembled: ${chalk.bold(component.name)} -> ${destPath}`));

      // Inform dependencies
      if (component.dependencies?.length > 0) {
        console.log(chalk.yellow('\n📦 INSTALL PACKAGES NEEDED:'));
        console.log(chalk.white(`  npm install ${component.dependencies.join(' ')}\n`));
      }

      // Inform Tailwind configuration
      console.log(chalk.cyan.bold('🎨 TAILWIND DESIGN WARNING:'));
      console.log(chalk.white('Ensure your tailwind.config.js includes the custom Marvel theme mapping.\n'));

    } catch (err) {
      spinner.fail(chalk.red('Failed to assemble component:'));
      console.error(chalk.red(err.message));
    }
  });

// ----------------------------------------------------
// COMMAND: UPDATE
// ----------------------------------------------------
program
  .command('update <slug>')
  .description('Upgrade an existing component spec')
  .option('-k, --key <api-key>', 'Clearance API token')
  .action(async (slug, options) => {
    // Redownloading component overwrites the existing file
    console.log(chalk.yellow(`\nInitiating suit upgrade for: ${slug}`));
    program.parse(['node', 'pratham-ui', 'add', slug, ...(options.key ? ['--key', options.key] : [])]);
  });

program.parse(process.argv);
