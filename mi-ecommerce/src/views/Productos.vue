<template>
  <div>
    <div class="filtros">
      <button @click="filtro = 'todos'">Todos</button>
      <button @click="filtro = 'maquina'">Máquinas</button>
      <button @click="filtro = 'tinta'">Tintas</button>
    </div>

    <div class="productos-grid">
      <ProductCard
        v-for="producto in productosFiltrados"
        :key="producto.id"
        :producto="producto"
        @agregar="agregarAlCarrito"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'

import { maquinas, tintas } from '@/data/productos.js'
import Swal from 'sweetalert2'
const productos = [...maquinas, ...tintas]

const filtro = ref('todos')

const productosFiltrados = computed(() => {
  return filtro.value === 'todos'
    ? productos
    : productos.filter(p => p.categoria === filtro.value)
})

const agregarAlCarrito = (producto) => {
  const carritoActual = JSON.parse(localStorage.getItem('carrito')) || []

  const indexExistente = carritoActual.findIndex(item => item.id === producto.id)

  if (indexExistente !== -1) {
    carritoActual[indexExistente].cantidad += 1
  } else {
    carritoActual.push({ ...producto, cantidad: 1 })
  }

  localStorage.setItem('carrito', JSON.stringify(carritoActual))

  const isTinta = producto.categoria === 'tinta';

Swal.fire({
  icon: 'success',
  title: `${producto.nombre} agregado al carrito`,
  background: 'linear-gradient(145deg, #1b1b1b, #2c2c2c)',
  color: '#eaeaea',
  iconColor: '#66ffcc',
  imageUrl: producto.imagen,
  imageHeight: isTinta ? 80 : 100,
  imageAlt: producto.nombre,
  showConfirmButton: false,
  timer: 1500
});
}

</script>

<style scoped>
.filtros {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filtros button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #444;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.filtros button:hover {
  background-color: #666;
}

.productos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}
</style>
