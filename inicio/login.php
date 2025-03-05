<?php
// Asegúrate de cargar el entorno de WordPress
require_once($_SERVER['DOCUMENT_ROOT'] . '/wp-load.php'); // Asegúrate de que la ruta sea correcta

// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos del formulario y sanitizarlos
    $email = sanitize_email($_POST['email']);
    $password = $_POST['password'];

    // Intentar autenticar al usuario
    $user = wp_authenticate($email, $password);

    if (is_wp_error($user)) {
        // Si las credenciales son incorrectas
        echo "Usuario o contraseña incorrectos.";
    } else {
        // Si las credenciales son correctas
        wp_set_current_user($user->ID); // Establece el usuario actual
        wp_set_auth_cookie($user->ID); // Establece la cookie de autenticación

        // Redirigir al usuario a la página principal o a cualquier otra página
        wp_redirect(home_url()); // Cambia la URL si deseas redirigir a otra página
        exit;
    }
}
?>
