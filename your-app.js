// Import CodeMirror
const CodeMirror = require('codemirror');

// Initialize CodeMirror
const codeEditor = CodeMirror.fromTextArea(document.getElementById('code'), {
    mode: 'javascript',
    theme: 'default', // You can choose a different theme
    lineNumbers: true,
});
