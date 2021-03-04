<template>
  <div class="column is-narrow">
    <nav class="panel is-info">
      <p class="panel-heading">
        {{ element.title }}
      </p>
      <Item v-for="(item, index) in element.items" :key="`item${index}`" :item="item"></Item>
    </nav>
  </div>
</template>

<script>
import Item from './Item.vue'
export default {
  name: 'Card',
  components: { Item },
  props: {
    element: {
      type: Object,
      requiered: true
    }
  }
}
</script>
