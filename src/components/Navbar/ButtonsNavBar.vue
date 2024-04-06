<template>
  <div>
    <p>{{ buttonText }}</p>
    <a :href="buttonLink">
      <i :class="buttonIcon"></i>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    },
    buttonIcon: {
      type: String,
      required: true
    },
    buttonLink: {
      type: String,
      required: true
    }
  }
}
</script>
