<script setup>
import { store } from '../store/eventStore';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next';
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
    <TransitionGroup name="toast">
      <div
        v-for="toast in store.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-2xl glass-panel border border-brand-400/30 backdrop-blur-xl text-white transform transition-all duration-300"
        :class="{
          'border-emerald-500/50 bg-emerald-950/80': toast.type === 'success',
          'border-rose-500/50 bg-rose-950/80': toast.type === 'error',
          'border-brand-400/50 bg-brand-950/90': toast.type === 'info',
        }"
      >
        <div class="flex items-center gap-3">
          <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-400 shrink-0" />
          <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-rose-400 shrink-0" />
          <Info v-else class="w-5 h-5 text-brand-300 shrink-0" />
          <span class="text-sm font-medium text-gray-100">{{ toast.message }}</span>
        </div>
        <button
          @click="store.removeToast(toast.id)"
          class="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors ml-2"
        >
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(100px);
}
</style>
