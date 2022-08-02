<template>
	<a :href="url" target="_blank">{{title}}</a>
</template>

<script>
export default {
  props: {
    title: String,
    url: String
  }
}
</script>
