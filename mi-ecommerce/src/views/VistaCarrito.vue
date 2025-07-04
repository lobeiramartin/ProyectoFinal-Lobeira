<template>
  <div class="carrito">
    <h1>Tu carrito</h1>

    <div v-if="carrito.length === 0">
      <p>No hay productos en el carrito.</p>
    </div>

    <div v-else>
      <ul>
        <li v-for="(producto, index) in carrito" :key="index">
          <div class="producto-info">
            <strong>{{ producto.nombre }}</strong>
            <div class="cantidad-controles">
              <button @click="restarCantidad(index)">−</button>
              <span>{{ producto.cantidad }}</span>
              <button @click="sumarCantidad(index)">+</button>
            </div>
            <span class="subtotal">${{ producto.precio * producto.cantidad }}</span>
          </div>
          <button @click="eliminarProducto(index)">Eliminar</button>
        </li>
      </ul>

      <p class="total">Total: ${{ total }}</p>
      <div class="acciones-carrito">
        <button class="btn-vaciar" @click="vaciarCarrito">Vaciar carrito</button>
        <button class="btn-finalizar" @click="finalizarCompra">Finalizar compra</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const usuariosRegistrados = ref(JSON.parse(localStorage.getItem('usuarios')) || {});

const carrito = ref([])

onMounted(() => {
  const datos = JSON.parse(localStorage.getItem('carrito')) || []
  carrito.value = datos
})

const sumarCantidad = (index) => {
  carrito.value[index].cantidad += 1
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

const restarCantidad = (index) => {
  if (carrito.value[index].cantidad > 1) {
    carrito.value[index].cantidad -= 1
    localStorage.setItem('carrito', JSON.stringify(carrito.value))
  } else {
    eliminarProducto(index)
  }
}

const eliminarProducto = (index) => {
  carrito.value.splice(index, 1)
  localStorage.setItem('carrito', JSON.stringify(carrito.value))
}

const vaciarCarrito = () => {
  carrito.value = []
  localStorage.removeItem('carrito')
}
import Swal from 'sweetalert2';

const finalizarCompra = () => {
  if (!sessionStorage.getItem('usuario')) {
    Swal.fire({
      icon: 'info',
      title: 'Iniciá sesión para continuar',
      showCancelButton: true,
      confirmButtonText: 'Iniciar sesión',
      cancelButtonText: 'Crear cuenta',
      background: '#1e1e1e',
      color: '#f0f0f0',
      iconColor: '#66ccff'
    }).then(result => {
      const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || {};

      if (result.isConfirmed) {
        // Login
        Swal.fire({
          title: 'Login',
          html: `
            <input type="text" id="login-usuario" class="swal2-input" placeholder="Usuario">
            <input type="password" id="login-clave" class="swal2-input" placeholder="Contraseña">
          `,
          confirmButtonText: 'Ingresar',
          background: '#1e1e1e',
          color: '#f0f0f0',
          preConfirm: () => {
            const usuario = document.getElementById('login-usuario').value;
            const clave = document.getElementById('login-clave').value;

            if (!usuario || !clave) {
              Swal.showValidationMessage('Completá ambos campos');
              return false;
            }

            if (!usuariosRegistrados[usuario]) {
              Swal.showValidationMessage('El usuario no existe');
              return false;
            }

            if (usuariosRegistrados[usuario] !== clave) {
              Swal.showValidationMessage('Contraseña incorrecta');
              return false;
            }

            sessionStorage.setItem('usuario', usuario);
          }
        }).then(() => {
          finalizarCompra();
        });

      } else {
        
        Swal.fire({
          title: 'Crear cuenta',
          html: `
            <input type="text" id="registro-usuario" class="swal2-input" placeholder="Nuevo usuario">
            <input type="password" id="registro-clave" class="swal2-input" placeholder="Contraseña">
            <input type="password" id="registro-clave2" class="swal2-input" placeholder="Repetir contraseña">
          `,
          confirmButtonText: 'Registrarse',
          background: '#1e1e1e',
          color: '#f0f0f0',
          preConfirm: () => {
            const usuario = document.getElementById('registro-usuario').value;
            const clave = document.getElementById('registro-clave').value;
            const clave2 = document.getElementById('registro-clave2').value;

            if (!usuario || !clave || !clave2) {
              Swal.showValidationMessage('Completá todos los campos');
              return false;
            }

            if (clave !== clave2) {
              Swal.showValidationMessage('Las contraseñas no coinciden');
              return false;
            }

            if (usuariosRegistrados[usuario]) {
              Swal.showValidationMessage('Ese usuario ya existe');
              return false;
            }

            usuariosRegistrados[usuario] = clave;
            localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
            sessionStorage.setItem('usuario', usuario);
          }
        }).then(() => {
          finalizarCompra(); 
        });
      }
    });

    return; 
  }
const mostrarResumen = (direccion, pago) => {
  const formas = {
    debito: 'Tarjeta de débito',
    credito1: 'Tarjeta de crédito (1 pago)',
    credito3: 'Tarjeta de crédito (3 pagos sin interés)',
    mercadopago: 'MercadoPago',
    qr: 'Pago con QR'
  };

  Swal.fire({
    icon: 'success',
    title: '¡Compra confirmada!',
    html: `
      <p>Enviaremos tu pedido a:</p>
      <strong>${direccion}</strong>
      <p>Forma de pago: <strong>${formas[pago]}</strong></p>
      <p>Total abonado: <strong>$${total.value}</strong></p>
    `,
    background: '#1e1e1e',
    color: '#f0f0f0',
    iconColor: '#66ff99'
  });

  carrito.value = [];
  localStorage.removeItem('carrito');
};


  Swal.fire({
    icon: 'success',
    title: '¡Bienvenido!',
    text: 'Ahora podés completar tu compra.',
    background: '#1e1e1e',
    color: '#f0f0f0',
    iconColor: '#66ff99'
  });

Swal.fire({
  title: 'Datos de envío y pago',
  html: `
    <input type="text" id="direccion" class="swal2-input" placeholder="Dirección de envío">
    <select id="pago" class="swal2-input">
      <option value="" disabled selected>Seleccioná forma de pago</option>
      <option value="debito">Tarjeta de débito</option>
      <option value="credito1">Tarjeta de crédito (1 pago)</option>
      <option value="credito3">Tarjeta de crédito (3 pagos sin interés)</option>
      <option value="mercadopago">MercadoPago</option>
      <option value="qr">Pago con QR</option>
    </select>
  `,
  confirmButtonText: 'Continuar',
  background: '#1e1e1e',
  color: '#f0f0f0',
  preConfirm: () => {
    const direccion = document.getElementById('direccion').value;
    const pago = document.getElementById('pago').value;

    if (!direccion || !pago) {
      Swal.showValidationMessage('Completá todos los campos');
      return false;
    }

    return { direccion, pago };
  }
}).then((result) => {
  if (!result.isConfirmed) return;

  const { direccion, pago } = result.value;

  if (['debito', 'credito1', 'credito3'].includes(pago)) {
    
    Swal.fire({
      title: 'Datos de tarjeta',
      html: `
        <input type="text" id="numero" class="swal2-input" placeholder="Número de tarjeta">
        <input type="text" id="vencimiento" class="swal2-input" placeholder="MM/AA">
        <input type="text" id="cvv" class="swal2-input" placeholder="CVV">
      `,
      confirmButtonText: 'Confirmar pago',
      background: '#1e1e1e',
      color: '#f0f0f0',
      preConfirm: () => {
        const numero = document.getElementById('numero').value;
        const vencimiento = document.getElementById('vencimiento').value;
        const cvv = document.getElementById('cvv').value;

        if (!numero || !vencimiento || !cvv) {
          Swal.showValidationMessage('Completá todos los datos de la tarjeta');
          return false;
        }
      }
    }).then((res) => {
      if (res.isConfirmed) {
        mostrarResumen(direccion, pago);
      }
    });

  } else if (pago === 'qr') {

    Swal.fire({
      title: 'Escaneá el código QR para pagar',
      html: `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.youtube.com/watch?v=EJIvDjEXPAM" alt="QR de pago">`,
      background: '#1e1e1e',
      color: '#f0f0f0',
      confirmButtonText: 'Ya pagué'
    }).then((res) => {
      if (res.isConfirmed) {
        mostrarResumen(direccion, pago);
      }
    });

  } else {
    mostrarResumen(direccion, pago);
  }
});
}
  const total = computed(() => {
    return carrito.value.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0)
  });
</script>

<style scoped>
.carrito {
  padding: 2rem;
}

.acciones-carrito {
  display: flex;
  justify-content: center;
  gap: 2rem; /* Espacio entre los botones */
  margin-top: 2rem;
}

.acciones-carrito .btn-vaciar,
.acciones-carrito .btn-finalizar {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-vaciar {
  background-color: #ff5c5c;
  color: white;
}

.btn-vaciar:hover {
  background-color: #ff1f1f;
}

.btn-finalizar {
  background-color: #2b9b75;
  color: #000;
}

.btn-finalizar:hover {
  background-color: #14bd8a;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

button {
  background-color: #444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #666;
}

.total {
  font-weight: bold;
  margin-top: 2rem;
}

.producto-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cantidad-controles {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cantidad-controles button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  font-size: 1.2rem;
  border: none;
  background-color: #333;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.subtotal {
  font-weight: bold;
}
.btn-finalizar {
  margin-top: 1rem;
  background-color: #2b9b75;
  color: #000;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-finalizar:hover {
  background-color: #14bd8a;
}
</style>

