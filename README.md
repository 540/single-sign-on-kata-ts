# Single Sign On Kata

A veces la seguridad es engorrosa. Tienes que acceder a una máquina por la mañana, después acceder a tu cliente de correo, luego acceder a la intranet corporativa, luego acceder a tu perfil privado, todo el rato accediendo a sitios introduciendo más y más usuarios y contraseñas. Hay varias formas de solucionar esto y en esta kata veremos una de ellas.

Funciona de tal forma que la primera vez que accedes a un servicio, pones un usuario y una contraseña y el servicio las valida contra un registro central de usuarios y si son válidas el "Single Sign On Registry" te genera un token. Más tarde cuando quieres acceder a otro servicio, entregas el token en vez de tener que introducir de nuevo el usuario y la contraseña. El servicio puede comprobar con el "Sign On Registry" si el token es válido y si lo es, siplemente, te da acceso. Si el "Sign On Registry" no reconoce tu token, notificará al servicio y se te denegará la petición.

En esta Kata, tu trabajo es desarrollar un nuevo servicio que use el "Single Sign on Registry". La funcionalidad actual del servicio es simple, dice "Hola Papirruqui!" (o cualquiera que sea tu nombre) si tu token de acceso es válido.


El "Single Sign On Registry" está desarrollado por otro equipo por lo que no podemos acceder a él. Pero tenemos la interfaz para el "Single Sign On Registry" para que podamos avanzar con nuestro servicio.

## Dobles de tests

Esta kata es útil para prácticar la utilizacin de diferentes tipos de dobles de tests.

## Credits

Esta es únicamente la versión TypeScript de la kata original. La kata original está publicada en [emilybache github](https://github.com/emilybache/Single-Sign-On-Kata)
