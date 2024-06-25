import { ref, onMounted, onUnmounted } from 'vue';

export function useTableScroll() {
  const tableContainer = ref<HTMLElement | null>(null);

  const handleWheel = (event: WheelEvent) => {
    if (tableContainer.value) {
      const delta = Math.sign(event.deltaY) * 50; // Cambiar 50 a un número menor para un desplazamiento más suave
      tableContainer.value.scrollLeft += delta;
      event.preventDefault();
    }
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (tableContainer.value) {
      const startX = event.pageX - tableContainer.value.offsetLeft;
      const scrollLeft = tableContainer.value.scrollLeft;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const x = moveEvent.pageX - tableContainer.value!.offsetLeft;
        const walk = (x - startX) * 2; // Cambiar 2 a un número menor para un desplazamiento más suave
        tableContainer.value!.scrollLeft = scrollLeft - walk;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  onMounted(() => {
    if (tableContainer.value) {
      tableContainer.value.addEventListener('wheel', handleWheel);
      tableContainer.value.addEventListener('mousedown', handleMouseDown);
    }
  });

  onUnmounted(() => {
    if (tableContainer.value) {
      tableContainer.value.removeEventListener('wheel', handleWheel);
      tableContainer.value.removeEventListener('mousedown', handleMouseDown);
    }
  });

  return { tableContainer };
}
