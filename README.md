# Manejador de proyectos

Este proyecto fue creado como una herramienta para la gestión de proyectos, con el fin de facilitar mi desplazamiento a través 
de las carpetas de los proyectos que tengo en mi computadora.

Esta herramienta utiliza una carpeta llamada 'Dev' en la carpeta del usuario, en la cual se almacenan los proyectos. 

## Instalación y configuración

- Clonar el repositorio [Enlace al repositorio](https://github.com/KingPandX/pjManager)
- Crear una carpeta llamada 'Dev' en la carpeta del usuario


``` Lo siguiente es opcional pero claramente se recomienda usarse de esa forma ya que el programa fue creado para funcionar de esa manera```

Dependiendo del interprete de shell que se use, se debe agregar la siguiente línea en el archivo de configuración de la shell que se use (por ejemplo, en el archivo config.fish si se usa fish o en el archivo .bashrc si se usa bash):

```bash
alias pj="bun ~/[ruta del proyecto]/main.js"
alias dev="source ~/[ruta del proyecto]/change.sh"
```

## Uso de la herramienta

Esta herramienta tiene dos comandos principales: pj y dev.
el comando pj se usa para gestionar los proyectos, 
mientras que el comando dev se usa para cambiar de carpeta a la del proyecto activo.

### Comando pj

- ```pj list```: Muestra la lista de proyectos que se encuentran en la carpeta 'Dev'

- ```pj add [nombre del proyecto]```: Agrega un proyecto a la carpeta 'Dev'

- ```pj remove [nombre del proyecto]```: Elimina un proyecto de la carpeta 'Dev'

- ```pj set [nombre del proyecto]```: Selecciona un proyecto como proyecto activo



```Estos comandos no requieren ingresar el nombre del proyecto, si se ejecutan sin argumentos tienen un menu interactivo```
```
