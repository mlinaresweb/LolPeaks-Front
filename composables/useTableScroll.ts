import { ref, onMounted, onUnmounted } from 'vue';

export function useTableScroll() {
  const tableContainer = ref<HTMLElement | null>(null);
  let isDragging = false;
  let startX: number;
  let scrollLeft: number;

  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (tableContainer.value) {
      isDragging = true;
      startX = event.pageX - tableContainer.value.offsetLeft;
      scrollLeft = tableContainer.value.scrollLeft;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (isDragging) {
          const x = moveEvent.pageX - tableContainer.value!.offsetLeft;
          const walk = (x - startX) * 1.5; // Desplazamiento más suave
          tableContainer.value!.scrollLeft = scrollLeft - walk;
        }
      };

      const handleMouseUp = () => {
        isDragging = false;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  onMounted(() => {
    if (!isMobile() && tableContainer.value) {
      tableContainer.value.addEventListener('mousedown', handleMouseDown);
    }
  });

  onUnmounted(() => {
    if (!isMobile() && tableContainer.value) {
      tableContainer.value.removeEventListener('mousedown', handleMouseDown);
    }
  });

  return { tableContainer };
}
