module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true // Si necesitas las variables globales de Node.js, agrega 'node' aquí
  },
  "globals": {
    "process": true // Aquí se definen las variables globales
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-essential"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    // Aquí puedes agregar reglas personalizadas si las necesitas
  }
};