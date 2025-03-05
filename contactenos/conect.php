<?php
function procesar_formulario_contacto() {
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['nombre']) && isset($_POST['email']) && isset($_POST['mensaje'])) {
        // Recibir y sanitizar los datos
        $nombre = sanitize_text_field($_POST['nombre']);
        $email = sanitize_email($_POST['email']);
        $mensaje = sanitize_textarea_field($_POST['mensaje']);

        // Dirección de correo electrónico a la que se enviará el mensaje
        $para = 'tuemail@ejemplo.com';  // Cambia a tu correo

        // Asunto y cuerpo del mensaje
        $asunto = 'Nuevo mensaje de contacto desde el formulario';
        $cuerpo = "Nombre: $nombre\nCorreo: $email\nMensaje: $mensaje";
        $headers = array('Content-Type: text/plain; charset=UTF-8', 'From: ' . $email);

        // Enviar correo usando wp_mail
        if (wp_mail($para, $asunto, $cuerpo, $headers)) {
            echo 'Mensaje enviado correctamente.';
        } else {
            echo 'Hubo un error al enviar el mensaje.';
        }
    }
}
add_action('wp_head', 'procesar_formulario_contacto');

?>