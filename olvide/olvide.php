<?php
// Cargar el entorno de WordPress
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

// Procesar el formulario de recuperación de contraseña
if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email'])) {
    // Obtener y sanitizar el correo electrónico ingresado
    $email = sanitize_email($_POST['email']);
    
    // Verificar si el correo electrónico es válido
    if (is_email($email)) {
        // Verificar si el correo electrónico está registrado en WordPress
        $user = get_user_by('email', $email);
        
        if ($user) {
            // Si el usuario existe, enviar enlace de recuperación de contraseña
            $retrieve_result = retrieve_password($user->user_login);
            
            if (is_wp_error($retrieve_result)) {
                // En caso de error al enviar el enlace
                echo "Hubo un error al enviar el enlace de recuperación.";
            } else {
                // Confirmar que el enlace fue enviado correctamente
                echo "Te hemos enviado un enlace de recuperación a tu correo.";
            }
        } else {
            // Si el correo no está registrado
            echo "No encontramos una cuenta con ese correo electrónico.";
        }
    } else {
        // Si el correo no es válido
        echo "Por favor ingresa un correo electrónico válido.";
    }
}
?>
