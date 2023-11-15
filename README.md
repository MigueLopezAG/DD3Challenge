# DD3Challenge
servidor que permite la interacción con la aplicación WORDLE

Las tecnologias que se utilizaron para la aplicacion fueron Nodejs, Express, Typescript, ademas de algunas librerias que nos ayudaron con el objetivo del proyecto.
La base de datos que se necesita para la ejecucion de esta aplicaion es postgresql, para la conexion y manejo de querys de la base de datos se utilizo el ORM sequelize,
las credenciales que se utilizaron para la conexion a la base de datos se pueden encontrar en el archivo .env o en el archivo ./src/config/config.ts
aqui podemos encontrar la configuracion de la base de datos, el tipo de bd que se utilizara con sequelize y la llave para encriptar los datos con jwt.

El puerto para acceder a nuestra aplicacion es el 3001, para poder acceder a nuestra api la base de nuestra ruta es "/api/v1" seguido del endpint al que se desea acceder, para este caso se cuentan con 2 endpoints, "/dictionary" el cual se encarga de la creacion, validacion y consulta de las palabras con las que se manejara el juego, "/user" nos permite manejar la creacion de los usuarios y la actualizacion de su informacion como son las partidas jugadas y las victorias obtenidas.

para poder hacer uso del servicio es neesario crear o iniciar sesion, la plicacion cuenta con la funcion de recibir el nombre del usuario (userName) y la contraseña (password) si el usuario no existe en la base de datos se crea y se genera una sesion con un token que cuenta con 15 minutos de tiempo de vida, si el usuario existe, se verifica que la contraseña corresponda a la que se tiene registrada y encriptada con la libreria "bcrypt", si la validacion es exitosa se genera una sesion con un token con el mismo tiempo de vida, este token es necesario para poder aceder a algunos servicios como la generacion de una nueva palabra y la comparacion de la palabra. Este token se recibe atraves de los headers.

El servidor cuenta con un endpoint para generar la palabra, uno para su validacion y otro para obtener los mejores resultados de las palabras adivinadas, estos endpoints se encuentran en el archivo dictionary.Routes. Por la parte del usuario se tienen las rutas para su validacion o login, obtener la infomracion del del usuario y los usuarios con los mejores aciertos.