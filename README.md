# Forocoches – Pegar imágenes con ImgBB

Userscript para **subir automáticamente a ImgBB una imagen del portapapeles de Windows** y añadir el enlace al cuadro de respuesta de Forocoches usando BBCode. Así no hace falta subir la imagen manualmente y copiar después su URL.

## Qué hace

1. Copia una imagen al portapapeles de Windows.
2. En Forocoches, haz clic en el cuadro de respuesta y pega la imagen (`Ctrl + V`).
3. El script envía la imagen a ImgBB.
4. Cuando termina la subida, sustituye el indicador de carga por el BBCode correspondiente, por ejemplo:

   ```text
   [img]https://i.ibb.co/ejemplo/imagen.png[/img]
   ```

El script solo actúa al pegar una imagen dentro de un elemento `textarea`. El texto normal pegado no se modifica.

## Requisitos

- Un navegador compatible con una extensión de userscripts, por ejemplo **Tampermonkey**.
- Una cuenta o clave de API de [ImgBB](https://imgbb.com/).
- Acceso a Forocoches.

## Instalación

1. Instala la extensión [Tampermonkey](https://www.tampermonkey.net/) en tu navegador.
2. En Tampermonkey, crea un userscript nuevo.
3. Copia el contenido de `forocoches-imgbb.user.js` y pégalo en el editor de Tampermonkey.
4. Obtén una clave de API desde [la página de API de ImgBB](https://api.imgbb.com/).
5. En el script de **Tampermonkey (tu copia local)**, sustituye el texto `REEMPLAZA_CON_TU_API_KEY` por tu clave de ImgBB. Conserva las comillas simples que la rodean.
6. Guarda el script y abre o recarga Forocoches.

> **Importante:** no guardes tu clave real en el archivo que publiques en GitHub. El archivo del repositorio debe conservar el marcador `REEMPLAZA_CON_TU_API_KEY`; introduce tu clave únicamente en tu copia local de Tampermonkey.

## Uso

1. Copia una imagen al portapapeles (por ejemplo, una captura de pantalla).
2. Entra en Forocoches y coloca el cursor en el cuadro de respuesta.
3. Pulsa `Ctrl + V`.
4. Mientras se sube la imagen aparecerá `[Subiendo a ImgBB...]`. Cuando termine, se sustituirá por el BBCode de la imagen.
5. Publica el mensaje cuando hayas comprobado que el enlace se ha insertado correctamente.

## Solución de problemas

- **Aparece un error de API:** comprueba que la clave de ImgBB sea correcta y que no hayas dejado el marcador `REEMPLAZA_CON_TU_API_KEY` en tu copia local.
- **Aparece un error de red:** comprueba tu conexión y vuelve a intentarlo.
- **No pasa nada al pegar:** confirma que has pegado una imagen y que el cursor está dentro del cuadro de respuesta. El script no procesa imágenes pegadas en otros tipos de campos.
- **La imagen no se muestra en el mensaje:** verifica que el BBCode insertado y la URL sean correctos antes de publicar.

## Privacidad y seguridad

- Al pegar una imagen, esta se envía a **ImgBB**, un servicio externo. No pegues imágenes que no quieras compartir con ese servicio.
- La URL resultante se inserta en el mensaje de Forocoches; la visibilidad de la imagen dependerá de la configuración y las condiciones del servicio utilizado.
- La clave de API es una credencial: no la publiques en el repositorio ni en capturas de pantalla.
- Si una clave real ya se ha compartido públicamente o se ha subido a un repositorio, revócala o genera otra en ImgBB y actualiza tu copia local.

## Permisos del userscript

El script utiliza `GM_xmlhttpRequest` para enviar la imagen a `https://api.imgbb.com/1/upload` y declara `api.imgbb.com` mediante `@connect` en los metadatos de Tampermonkey.

## Aviso

Proyecto comunitario no afiliado a Forocoches ni a ImgBB. Úsalo bajo tu propia responsabilidad; el funcionamiento puede cambiar si cualquiera de los servicios modifica su web o su API.
