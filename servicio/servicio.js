function agregarAlCarrito(servicio) {
    // Obtener el arreglo de servicios y sus cantidades desde el almacenamiento local, si existen
    let servicios = JSON.parse(localStorage.getItem('serviciosSeleccionados')) || [];
    let cantidades = JSON.parse(localStorage.getItem('cantidadesServicios')) || [];

    // Verificar si el servicio ya está en el carrito
    let indice = servicios.indexOf(servicio);
    
    if (indice !== -1) {
        // Si el servicio ya existe, aumentar su cantidad
        cantidades[indice] += 1;
    } else {
        // Si el servicio no existe, agregarlo al carrito con cantidad 1
        servicios.push(servicio);
        cantidades.push(1);
    }

    // Guardar los arreglos actualizados en el almacenamiento local
    localStorage.setItem('serviciosSeleccionados', JSON.stringify(servicios));
    localStorage.setItem('cantidadesServicios', JSON.stringify(cantidades));

    // Redirigir al carrito
    window.location.href = '/carrito/carrito.html';
}
