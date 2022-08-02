<template>
<section>
	<h1>Upload A File Below:</h1>
	<form @submit.prevent="onSubmit" enctype="multipart/form-data">
		<label for="package-upload">
			Upload <pre>package.json</pre>
		</label>
		<input type="file" ref="package-file" @change="onSelect" id="package-upload"/>
		<button>Process</button>
	</form>
</section>
</template>

<script>
export default {
  name: 'FileUpload',
  data () {
    return {
      package: '',
      deps: [],
      fileReader: new FileReader()
    }
  },
  methods: {
    onSelect () {
      this.package = this.$refs['package-file'].files[0]
    },
    onSubmit () {
      this.fileReader.readAsText(this.package)
    },
    onFileRead () {
      /* get info */
      const { dependencies, name } = JSON.parse(this.fileReader.result)
      const dependencyData = Object.keys(dependencies).map((name) => ({ name, issues: [] }))

      /* store info */
      localStorage.setItem('package-name', name)
      localStorage.setItem('dependencies', JSON.stringify(dependencyData))

      /* re-direct */
      this.$router.push('/analize')
    }
  },
  mounted () {
    this.fileReader.addEventListener('load', this.onFileRead)
  }

}
</script>
