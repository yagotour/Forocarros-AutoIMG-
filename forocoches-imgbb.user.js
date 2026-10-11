// ==UserScript==
// @name         Forocoches - Pegar imágenes (ImgBB)
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Sube imágenes a ImgBB automáticamente al pegar en el cuadro de texto.
// @author       TuNombre
// @match        *://*.forocoches.com/*
// @grant        GM_xmlhttpRequest
// @connect      api.imgbb.com
// ==/UserScript==

(function() {
    'use strict';

    // Introduce tu clave en tu copia local de Tampermonkey.
    // No publiques una clave real en el repositorio.
    const IMGBB_API_KEY = 'REEMPLAZA_CON_TU_API_KEY';

    document.addEventListener('paste', function(e) {
        // Verificar que estamos dentro de la caja de respuesta
        if (!e.target.tagName || e.target.tagName.toLowerCase() !== 'textarea') return;

        const items = (e.clipboardData || window.clipboardData).items;
        if (!items) return;
        let imageFile = null;

        // Extraer la imagen del portapapeles
        for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf('image') === 0) {
                imageFile = items[i].getAsFile();
                break;
            }
        }

        if (!imageFile) return;
        e.preventDefault();

        const textarea = e.target;
        const startPos = textarea.selectionStart;
        const endPos = textarea.selectionEnd;
        const loadingText = '[Subiendo a ImgBB...]';

        // Mostrar indicador de carga
        textarea.value = textarea.value.substring(0, startPos) + loadingText + textarea.value.substring(endPos);
        textarea.selectionStart = textarea.selectionEnd = startPos + loadingText.length;

        // Preparar la subida
        const formData = new FormData();
        formData.append('image', imageFile);

        // Enviar a la API
        GM_xmlhttpRequest({
            method: 'POST',
            url: `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            data: formData,
            onload: function(response) {
                if (response.status === 200) {
                    try {
                        const res = JSON.parse(response.responseText);
                        const imageUrl = res.data.url; // Enlace directo a la imagen
                        const bbcode = `[img]${imageUrl}[/img]`;
                        textarea.value = textarea.value.replace(loadingText, bbcode);
                    } catch (error) {
                        alert('No se pudo interpretar la respuesta de ImgBB.');
                        textarea.value = textarea.value.replace(loadingText, '');
                    }
                } else {
                    alert('Error: revisa que la API Key de ImgBB sea correcta.');
                    textarea.value = textarea.value.replace(loadingText, '');
                }
            },
            onerror: function() {
                alert('Error de red al conectar con ImgBB.');
                textarea.value = textarea.value.replace(loadingText, '');
            }
        });
    });
})();
