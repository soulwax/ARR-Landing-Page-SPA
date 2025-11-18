/**
 * Formats code blocks by highlighting comments in gray
 * @param {string} code - The code string to format
 * @returns {string} - HTML string with comments wrapped in spans
 */
export function formatCodeWithComments(code) {
  // Match comments: # followed by any characters until end of line
  // This handles both inline comments and full-line comments
  return code.replace(/(#.*$)/gm, '<span class="code-comment">$1</span>')
}

