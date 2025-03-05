<?php
// Asegúrate de cargar el entorno de WordPress
require_once('wp-load.php'); // Asegúrate de que la ruta a wp-load.php sea correcta

// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del formulario y sanitizarlos
    $username = sanitize_text_field($_POST['username']);
    $email = sanitize_email($_POST['email']);
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm_password'];

    // Verificar si las contraseñas coinciden
    if ($password !== $confirm_password) {
        echo "Las contraseñas no coinciden.";
    } else {
        // Verificar si el nombre de usuario ya existe
        if (username_exists($username)) {
            echo "El nombre de usuario ya está registrado.";
        } else {
            // Verificar si el email ya está registrado
            if (email_exists($email)) {
                echo "El email ya está registrado.";
            } else {
                // Crear el nuevo usuario en WordPress
                $user_id = wp_create_user($username, $password, $email);

                // Verificar si hubo algún error al crear el usuario
                if (!is_wp_error($user_id)) {
                    // El usuario fue creado correctamente
                    echo "Usuario registrado exitosamente.";

                    // Iniciar sesión automáticamente después del registro
                    wp_set_current_user($user_id);
                    wp_set_auth_cookie($user_id);

                    // Redirigir al usuario a la página principal o donde desees
                    wp_redirect(home_url()); // Cambia esta URL si deseas redirigir a otra página
                    exit;
                } else {
                    echo "Hubo un error al registrar el usuario.";
                }
            }
        }
    }
}
?>
