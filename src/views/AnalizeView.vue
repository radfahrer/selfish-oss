<template>
<section>
	<h1>Your Package: {{packageName}}</h1>
</section>
<section class="center w-50-ns">
	<h2>Dependencies</h2>
	<table class="w-100">
    <thead>
      <tr>
        <th>Package Name</th>
        <th>Repository</th>
        <th>Issues</th>
      </tr>
    </thead>
    <tbody>
      <tr class="striped--light-gray" v-for="data in dependencyData" :key="data.name">
      <Dependency v-bind="data" />
      </tr>
    </tbody>
  </table>
</section>
</template>

<script>
import Dependency from '../components/Dependency.vue'

function checkResponse (response) {
  if (response.ok) {
    return response.json()
  } else {
    throw new Error('Fetching registry data failed')
  }
}

function parseRepository (data) {
  const { repository: repoInfo } = data
  if (repoInfo && repoInfo.type === 'git') {
    const [owner, repository] = repoInfo.url.match(/github.com\/(.*)\/(.*)\.git/).slice(1)
    const url = `https://github.com/${owner}/${repository}`
    return { owner, repository, url }
  } else {
    throw new Error('no github repository found')
  }
}

function fetchIssues ({ owner, repository }) {
  const url = new URL(`https://api.github.com/repos/${owner}/${repository}/issues`)
  url.searchParams.append('per_page', '100')
  const headers = new Headers({ Accept: 'application/vnd.github+json', Authorization: 'token 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' })
  const listIssues = new Request(url, { headers })
  return fetch(listIssues).then(checkResponse)
}

function summarizeLabel ({ name, description, color }) {
  return { name, description, color }
}

function summarizeIssue ({ labels, html_url: url, title, number }) {
  return { url, title, number, labels: labels.map(summarizeLabel) }
}
export default {
  name: 'AnalizePackage',
  components: {
    Dependency
  },
  data () {
    return { packageName: '', dependencyData: [] }
  },
  mounted () {
    this.packageName = localStorage.getItem('package-name')
    this.dependencyData = JSON.parse(localStorage.getItem('dependencies'))
    this.analizeDependencies()
  },
  methods: {
    analizeDependencies () {
      this.dependencyData.forEach(this.analizeDependency)
    },
    analizeDependency (dependency) {
      const { name, isLoaded, isFailed } = dependency
      if (isFailed || !isLoaded) {
        const request = new Request(`https://registry.npmjs.org/${name}`)
        fetch(request)
          .then(checkResponse)
          .then(parseRepository)
          .then((repository) => {
            dependency.repository = repository
            return repository
          })
          .then(fetchIssues)
          .then((issues) => {
            dependency.issues = issues.map(summarizeIssue)
          }).catch((error) => {
            dependency.failure = error.message
          }).finally(() => {
            /* replace the dependency data in local storage */
          })
      }
    }
  }

}
</script>
