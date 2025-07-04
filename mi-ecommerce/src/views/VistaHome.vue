
<template>
  <section class="catalogo">
    <h2>Máquinas de Tatuar</h2>
    <div class="grid">
      <ProductCard
        v-for="item in maquinas"
        :key="item.id"
        :producto="item"
        @agregar="agregarAlCarrito"
      />
    </div>

    <h2>Tintas</h2>
    <div class="grid">
      <ProductCard
        v-for="item in tintas"
        :key="item.id"
        :producto="item"
        @agregar="agregarAlCarrito"
      />
    </div>
  </section>
</template>

<script setup>
import ProductCard from '@/components/ProductCard.vue';
import { maquinas, tintas } from '@/data/productos.js';

import { useCarrito } from '@/store/carrito.js';
const { agregar } = useCarrito();

function agregarAlCarrito(producto) {
  agregar(producto);
}
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
}
</style>
