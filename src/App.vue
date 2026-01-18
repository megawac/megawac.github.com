<template>
  <div v-if="loadingResume" class="loading">Loading resume...</div>
  <div v-else-if="resumeError" class="error">Error loading resume: {{ resumeError.message }}</div>
  <template v-else>
    <ResumeSection :resume="resume" class="col-md-12 col-lg-8 resume" />
    <GithubSummary 
      :user="user" 
      :organizations="organizations" 
      :repos="repos" 
      :pulls="pulls"
      class="col-md-12 col-lg-4 summary" 
    />
  </template>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import { useResume } from './composables/useResume'
import { useGithub } from './composables/useGithub'
import ResumeSection from './components/ResumeSection.vue'
import GithubSummary from './components/GithubSummary.vue'

const { resume, error: resumeError, loading: loadingResume, fetchResume } = useResume()
const { user, repos, pulls, organizations, fetchGithubData } = useGithub()

onMounted(async () => {
  await fetchResume()
  if (resume.value && resume.value.github) {
    fetchGithubData(resume.value.github)
  }
})
</script>

<style lang="less">
// Global styles are imported in main.js
</style>
