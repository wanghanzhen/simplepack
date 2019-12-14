const { getAST, getDependencies, transform } = require('./parse');
const path = require('path');
const fs = require('fs');

module.exports = class Complier {
  constructor(options) {
    const { entry, output } = options;

    this.entry = entry;
    this.output = output;
    this.modules = [];
  }

  run() {
    const entryModule = this.bindModule(this.entry, true);

    this.modules.push(entryModule);

    this.modules.forEach(module => {
      module.dependencies.forEach(dependency => {
        this.modules.push(this.bindModule(dependency, false));
      });
    });

    this.emitFiles();
  }

  bindModule(filename, isEntry) {
    let ast;

    if (isEntry) {
      ast = getAST(filename);
    } else {
      const absolute = path.join(path.join(process.cwd(), './src', filename));
      console.log(absolute);
      ast = getAST(absolute);
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      source: transform(ast),
    }
  }
  emitFiles() {
    const outputPath = path.join(this.output.path, this.output.filename);

    let modules = '';
    
    this.modules.forEach((module, index) => {
      modules += `
'${module.filename}':
function(module, exports, require) {
  ${ module.source }
},`; 
    });


    
    const bundle = `
(function(modules) {
  function require(moduleId) {
    var fn = modules[moduleId];
    var module = { exports: {} };

    fn(module, module.exports, require);
    return module.exports;
  }
  require('${this.entry}');
})({${modules}})`;
    
    fs.writeFileSync(outputPath, bundle, 'utf-8');
  }
}