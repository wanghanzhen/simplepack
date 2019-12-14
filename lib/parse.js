const fs = require('fs');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const { transformFromAst } = require('@babel/core');

module.exports = {
  getAST: path => {
    const source = fs.readFileSync(path, 'utf-8');
    return babylon.parse(source, {
      sourceType: 'module',
    });
  },
  getDependencies: ast => {
    const dependecies = [];

    traverse(ast, {
      ImportDeclaration: ({ node }) => {
        dependecies.push(node.source.value);
      },
      
    });
    
    return dependecies;
  },
  transform: ast => {
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/env']
    });
    
    return code;
  }
}