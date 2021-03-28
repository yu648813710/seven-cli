'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');


module.exports = class extends Generator {

  initializing() {
    this.props = {};
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the neat ${chalk.red('generator-seven-cli')} generator!`
      )
    );

    const prompts = [{
        type: 'input',
        name: 'projectName',
        message: 'Please input project name (sevenflow):',
        default: 'sevenflow_app'
      },
      {
        type: 'input',
        name: 'projectDesc',
        message: 'Please input project description:'
      },
      {
        type: 'input',
        name: 'projectMain',
        message: 'Main file (index.js):',
        default: 'index.js'
      },
      {
        type: 'input',
        name: 'projectAuthor',
        message: 'Author (seven):',
        default: 'seven'
      },
      {
        type: 'list',
        name: 'projectLicense',
        message: 'Please choose license:',
        choices: ['MIT', 'ISC', 'Apache-2.0', 'AGPL-3.0'],
        default: 'MIT'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  initPackage() {
    let pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    const {
      props
    } = this;

    pkg = Object.assign(pkg, {
      name: props.name,
      description: props.description,
      main: props.projectMain,
      license: props.projectLicense,
    });


    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }
  renderTplFile() {
    let target = [
      'index.html',
      'src/index.js',
      'webpack.config.js',
      'server.js',
      'babel.config.json'
    ];

    target.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.props
      );
    });
  }

  writing() {
    this.initPackage();
    this.renderTplFile();
    // this.fs.copy(
    //   this.templatePath('dummyfile.txt'),
    //   this.destinationPath('dummyfile.txt')
    // );
  }

  install() {
    this.installDependencies();
  }
};
