import { ref } from 'vue'

const isOpen = ref(false)

export function useFilterModal() {
  function openFilter(e = null) {
    e?.preventDefault()
    e?.stopPropagation()
    isOpen.value = true
  }
  function closeFilter() {
    isOpen.value = false
  }

  return {
    closeFilter,
    isOpen,
    openFilter,
  }
}
