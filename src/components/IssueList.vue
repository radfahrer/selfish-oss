<template>
<div v-if="count">
	<div @click="toggle">{{count}} Issues <em class="b">{{icon}}</em></div>
	<div v-if="isOpen" class="tj">
		<ul class="list">
			<li v-for="issue in issues" :key="issue.number">
				<IssueSummary v-bind="issue"></IssueSummary>
			</li>
		</ul>
	</div>
</div>
</template>

<script>
import IssueSummary from './IssueSummary.vue'

export default {
  components: {
    IssueSummary
  },
  data () {
    return {
      isOpen: false
    }
  },
  props: {
    issues: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    count () {
      return this.issues ? this.issues.length : 0
    },
    icon () {
      return this.isOpen ? 'v' : '>'
    }
  },
  methods: {
    toggle () {
      this.$data.isOpen = !this.$data.isOpen
    }
  }
}
</script>
