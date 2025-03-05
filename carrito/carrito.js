// Recuperamos los servicios seleccionados y sus cantidades desde el almacenamiento local
let servicios = JSON.parse(localStorage.getItem('serviciosSeleccionados')) || [];
let cantidades = JSON.parse(localStorage.getItem('cantidadesServicios')) || [];

const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Precios de los servicios (puedes ajustarlos según corresponda)
const precios = {
    'Servicio 1': 20,
    'Servicio 2': 35,
    'Servicio 3': 50
};

// Si hay servicios seleccionados, los mostramos en cuadros
if (servicios.length > 0) {
    servicios.forEach((servicio, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        const servicioName = document.createElement('p');
        servicioName.textContent = servicio;

        // Crear el contenedor de la cantidad
        const quantityContainer = document.createElement('div');
        quantityContainer.classList.add('quantity-container');
        
        const decrementButton = document.createElement('button');
        decrementButton.textContent = '<';
        decrementButton.onclick = function() {
            decreaseQuantity(index);
        };

        const quantityDisplay = document.createElement('span');
        quantityDisplay.id = `quantity-${index}`;
        quantityDisplay.textContent = cantidades[index] || 1;

        const incrementButton = document.createElement('button');
        incrementButton.textContent = '>';
        incrementButton.onclick = function() {
            increaseQuantity(index);
        };

        quantityContainer.appendChild(decrementButton);
        quantityContainer.appendChild(quantityDisplay);
        quantityContainer.appendChild(incrementButton);

        // Crear el botón de eliminar
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-service');
        removeButton.textContent = 'X';
        removeButton.onclick = function() {
            removeService(index);
        };

        cartItem.appendChild(servicioName);
        cartItem.appendChild(quantityContainer);
        cartItem.appendChild(removeButton);

        cartItemsContainer.appendChild(cartItem);
    });
} else {
    const noServicesMessage = document.createElement('p');
    noServicesMessage.textContent = "No has seleccionado ningún servicio.";
    cartItemsContainer.appendChild(noServicesMessage);
}

// Función para disminuir la cantidad
function decreaseQuantity(index) {
    let currentQuantity = cantidades[index] || 1;

    if (currentQuantity > 1) {
        currentQuantity--;
        cantidades[index] = currentQuantity;
        document.getElementById(`quantity-${index}`).textContent = currentQuantity;
        updateLocalStorage();
        updateTotalPrice();
    }
}

// Función para aumentar la cantidad
function increaseQuantity(index) {
    let currentQuantity = cantidades[index] || 1;

    currentQuantity++;
    cantidades[index] = currentQuantity;
    document.getElementById(`quantity-${index}`).textContent = currentQuantity;
    updateLocalStorage();
    updateTotalPrice();
}

// Función para eliminar un servicio
function removeService(index) {
    servicios.splice(index, 1); // Eliminar el servicio del array
    cantidades.splice(index, 1); // Eliminar la cantidad asociada

    // Actualizar la vista
    updateLocalStorage();
    renderCartItems();
    updateTotalPrice();
}

// Función para actualizar el almacenamiento local con los datos actuales
function updateLocalStorage() {
    localStorage.setItem('serviciosSeleccionados', JSON.stringify(servicios));
    localStorage.setItem('cantidadesServicios', JSON.stringify(cantidades));
}

// Función para renderizar los servicios en el contenedor
function renderCartItems() {
    cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
    if (servicios.length > 0) {
        servicios.forEach((servicio, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            
            const servicioName = document.createElement('p');
            servicioName.textContent = servicio;

            const quantityContainer = document.createElement('div');
            quantityContainer.classList.add('quantity-container');
            
            const decrementButton = document.createElement('button');
            decrementButton.textContent = '<';
            decrementButton.onclick = function() {
                decreaseQuantity(index);
            };

            const quantityDisplay = document.createElement('span');
            quantityDisplay.id = `quantity-${index}`;
            quantityDisplay.textContent = cantidades[index] || 1;

            const incrementButton = document.createElement('button');
            incrementButton.textContent = '>';
            incrementButton.onclick = function() {
                increaseQuantity(index);
            };

            quantityContainer.appendChild(decrementButton);
            quantityContainer.appendChild(quantityDisplay);
            quantityContainer.appendChild(incrementButton);

            const removeButton = document.createElement('button');
            removeButton.classList.add('remove-service');
            removeButton.textContent = 'X';
            removeButton.onclick = function() {
                removeService(index);
            };

            cartItem.appendChild(servicioName);
            cartItem.appendChild(quantityContainer);
            cartItem.appendChild(removeButton);

            cartItemsContainer.appendChild(cartItem);
        });
    } else {
        const noServicesMessage = document.createElement('p');
        noServicesMessage.textContent = "No has seleccionado ningún servicio.";
        cartItemsContainer.appendChild(noServicesMessage);
    }
    updateTotalPrice();
}

// Función para calcular y actualizar el total
function updateTotalPrice() {
    let total = 0;
    const subtotalContainer = document.getElementById('subtotal-container');
    subtotalContainer.innerHTML = ''; // Limpiamos el contenedor de subtotales

    servicios.forEach((servicio, index) => {
        const precioUnitario = precios[servicio] || 0;
        const cantidad = cantidades[index] || 1;
        const subtotal = precioUnitario * cantidad;
        total += subtotal;

        // Crear un elemento para el subtotal del servicio
        const subtotalElement = document.createElement('p');
        subtotalElement.textContent = `${servicio}: $${subtotal.toFixed(2)} (Unidad: $${precioUnitario.toFixed(2)})`;
        subtotalContainer.appendChild(subtotalElement);
    });

    totalPriceElement.textContent = total.toFixed(2);
}

// Llamamos a la función de actualización de total y subtotales al cargar la página
window.onload = function() {
    renderCartItems(); // Renderizamos los ítems del carrito
    updateTotalPrice(); // Actualizamos el total y subtotales
};
// Función para verificar si el usuario está autenticado
// Función para verificar si el usuario está autenticado
function verificarSesion() {
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');  // Suponiendo que el estado de sesión se guarda en el localStorage

    if (!usuarioAutenticado) {
        // Si no está autenticado, redirigimos a la página de inicio de sesión
        window.location.href = "/inicio/incio.html";  // Cambia la URL de acuerdo con tu página de inicio de sesión
    }
}

// Llamamos a la función cuando la página se carga
verificarSesion();

// Función de confirmar compra
document.getElementById('confirmar-compra').addEventListener('click', function() {
    verificarSesion();  // Verificamos si el usuario está autenticado al hacer clic
    // Si el usuario está autenticado, se puede proceder con la compra
    alert("Compra confirmada. ¡Gracias por tu compra!");
    // Aquí podrías agregar el código para procesar la compra
});
