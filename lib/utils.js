/**
 * @param {string} ruleName
 * @returns {string}
 */
exports.documentUrl = (ruleName) => {
  return `https://github.com/layaxx/eslint-plugin-classnames/tree/main/docs/rules/${ruleName}.md`;
};

/**
 * @param {string} value
 * @returns {string[]}
 */
exports.getClasses = (value) => {
  if (!value) {
    return [];
  }

  return value.split(/\s+/);
};
