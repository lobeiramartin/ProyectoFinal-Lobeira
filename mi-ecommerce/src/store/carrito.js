import { ref } from 'vue';

const carrito = ref([]);

export function useCarrito() {
  function agregar(producto) { carrito.value.push(producto); }
  function quitar(id) {
    carrito.value = carrito.value.filter(p => p.id !== id);
  }
  return { carrito, agregar, quitar };
}
