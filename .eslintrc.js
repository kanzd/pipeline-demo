/*
👋 “Hey” from the Praxis team
This configuration file already implements our standard lint rules, including compatibility with prettier.
*/

module.exports = {
  // see https://git.target.com/Praxis-Framework/create-praxis-app/tree/production/packages/eslint-config-praxis
  extends: ['@praxis/eslint-config-praxis'],
  parser: '@typescript-eslint/parser',
  rules: {
    'no-console': 'off', //change this depending on your development needs
    // add or override additional rules here: https://eslint.org/docs/rules/
  },
}
