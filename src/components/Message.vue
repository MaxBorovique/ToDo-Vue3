<script>
export default {
  name: 'Message',
  emits: ['hide'],
  props: {
    active: Boolean,
  },
  methods: {
    hide() {
      this.$emit('hide')
    }
  }
};
</script>
<template>
  <article class="message" :class="{ 'message--hidden': !active }">
    <div class="message-header">
      <slot name="header"></slot>
      <button class="delete" @click="hide"></button>
    </div>

    <div class="message-body">
      <slot>Message</slot>
    </div>
  </article>
</template>

<style>
.message {
  transform-origin: top center;
  transition-property: opacity, transform;
  transition-duration: 0.3s;
}
.message--hidden {
  transform: scaleY(0);
  opacity: 0;
  pointer-events: none;
}
</style>
