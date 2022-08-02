<template>
  <td>
    {{name}}
  </td>
  <td v-if="!failure" class="tj"><a v-if="repository" :href="repository.url" target="_blank">{{repository.url}}</a></td>
  <td v-if="!failure"><IssueList :issues="issues"/></td>
  <td v-if="failure" colspan="2" class="dark-red">{{failure}}</td>
</template>

<script>
import IssueList from '../components/IssueList.vue'

export default {
  name: 'DependacySummary',
  components: {
    IssueList
  },
  props: {
    name: String,
    issues: { type: Array, default: () => [] },
    isLoaded: Boolean,
    repository: {
      url: String
    },
    failure: String
  }
}
</script>
