/*
👋 “Hey” from the Praxis team
This configuration file already implements our standard formatting rules, including compatibility with eslint.
*/

module.exports = {
  // see https://git.target.com/Praxis-Framework/create-praxis-app/tree/production/packages/format
  ...require('@praxis/format'),
  parser: 'typescript',
  // add or override additional options here: https://prettier.io/docs/en/options.html
}
