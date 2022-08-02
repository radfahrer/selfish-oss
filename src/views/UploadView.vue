<template>
<section class="w-50-l center">
	<h1>Upload Your Package To Find Issues</h1>
  <p class="tj">If you wish to contribute by resolving issues for open source packages, you can upload your <em class="code">package.json</em> and analize it for a list of issues from your dependencies.</p>
	<form @submit.prevent="onSubmit" enctype="multipart/form-data">
   <div v-if="!pat" class="pa3">
      <label for="pat">Personal Access Token</label>
      <input class="ml2" type="password" id="pat" name="pat" ref="pat" @change="storePAT"/>
   </div>
		<label class="pa4" for="package-upload">
			Upload <em class="code">package.json</em>
		</label>
    <div class="pa2 pt3">
      <input type="file" ref="package-file" @change="onSelect" id="package-upload"/>
      <button>Analize</button>
    </div>
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
    },
    storePAT () {
      localStorage.setItem('pat', this.$refs.pat.value)
    }
  },
  computed: {
    pat () {
      return localStorage.getItem('pat')
    }
  },
  mounted () {
    this.fileReader.addEventListener('load', this.onFileRead)
  }

}
</script>
