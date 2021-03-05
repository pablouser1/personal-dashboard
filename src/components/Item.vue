<template>
  <a :href="item.url" target="_blank" class="panel-block">
    {{ item.name }}
  </a>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: {
      type: Object,
      requiered: true
    }
  }
}
</script>
