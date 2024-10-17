<script>
export default {
  name: "TodoItem",
  props: {
    todo: Object,
  },
  emits: ["update", "delete"],
  data() {
    return {
      editing: false,
      newTitile: this.todo.title,
    };
  },
  methods: {
    toggle() {
      this.$emit("update", {
        ...this.todo,
        completed: !this.todo.completed,
      });
    },
    rename() {
      if (!this.editing) {
        return;
      }

      this.editing = false;

      if (this.newTitile === this.todo.title) {
        return;
      }

      if (this.newTitile.length === 0) {
        this.remove();

        return;
      }

      this.$emit("update", {
        ...this.todo,
        title: this.newTitile,
      });

      this.newTitile = "";
    },
    remove() {
      this.$emit("delete");
    },
    edit() {
      this.newTitile = this.todo.title;
      (this.editing = true),
        this.$nextTick(() => {
          this.$refs["input-text"].focus();
        });
    },
  },
};
</script>
<template>
  <div class="todo" :class="{ completed: todo.completed }">
    <label class="todo__status-label">
      <input
        type="checkbox"
        class="todo__status"
        :checked="todo.completed"
        @change="toggle"
      />
    </label>

    <form v-if="editing" @submit.prevent="rename">
      <input
        type="text"
        class="todo__title-field"
        placeholder="Empty todo will be deleted"
        v-model.trim="newTitile"
        @keyup.esc="editing = false"
        ref="input-text"
        @blur="rename"
      />
    </form>

    <template v-else>
      <span class="todo__title" @dblclick="edit">{{ todo.title }}</span>

      <button class="todo__remove" @:click="remove">x</button>
    </template>

    <div class="modal overlay" :class="{ 'is-active': false }">
      <div class="modal-background has-background-white-ter"></div>
      <div class="loader"></div>
    </div>
  </div>
</template>
<style></style>
