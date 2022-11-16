# DOMUS

Estructura del proyecto:

```sh
packages/
  - backend/
    - Express + Mongodb
  - frontend/
    - React
README.md
package.json
# No tocar, pushear si se cambia algun modulo
yarn.lock
```

### Manejar modulos

```sh
# Instalar
yarn workspace frontend add "nombre_npm_modulo"
# Instalar para desarrollo
yarn workspace frontend add "nombre_npm_modulo" -D
# Borrar
yarn workspace frontend remove "nombre_npm_modulo"
```

