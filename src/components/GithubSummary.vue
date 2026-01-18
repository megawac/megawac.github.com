<template>
  <div class="github-summary">
    <h2>Github Summary
      <small v-if="user && user.hireable != null" class="status">
        Status: <span>{{ user.hireable ? 'seeking interviews' : 'employed' }}</span>
      </small>
    </h2>
    
    <div v-if="user" class="user-info">
      <a :href="user.html_url">{{ user.name }}</a> has <span>{{ user.followers }}</span> followers and <span>{{ user.public_repos }}</span> public repositories on Github.
    </div>

    <div v-if="organizations && organizations.length > 0" class="organizations">
      <h3>Organizations</h3>
      <ul class="list-inline">
        <li v-for="org in organizations" :key="org.id">
          <a :href="org.html_url">{{ org.name }}</a>
        </li>
      </ul>
    </div>

    <div v-if="repos && repos.length > 0" class="repos">
      <h3>Public Repositories</h3>
      <ul>
        <li v-for="repo in repos" :key="repo.id">
          <a :href="repo.html_url" class="repo-name">{{ repo.name }}</a>
          <div class="stats">
            <span title="Number of Github users who've starred this repo">
              <span class="glyphicon glyphicon-star"></span>
              <span>{{ repo.stargazers_count }}</span>
            </span>
            <span title="Github users watching this repo">
              <span class="glyphicon glyphicon-eye-open"></span>
              <span>{{ repo.subscribers_count }}</span>
            </span>
            <span v-if="repo.commits" title="Total commits to the repo">
              <span class="glyphicon glyphicon-wrench"></span>
              <a :href="repo.commitsURL">{{ repo.commits }}</a>
            </span>
            <p>{{ repo.description }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="pulls && pulls.length > 0" class="contributions">
      <h3>Contributor to the Following Projects</h3>
      <ul>
        <li v-for="pull in pulls" :key="pull.id">
          <a :href="pull.html_url" class="repo-name">{{ pull.name }}</a>
          <div class="stats">
            <span title="Number of Github users who've starred this repo">
              <span class="glyphicon glyphicon-star"></span>
              <span>{{ pull.stargazers_count }}</span>
            </span>
            <span title="Github users watching this repo">
              <span class="glyphicon glyphicon-eye-open"></span>
              <span>{{ pull.subscribers_count }}</span>
            </span>
            <span v-if="pull.commits" title="Total commits to the repo">
              <span class="glyphicon glyphicon-wrench"></span>
              <a :href="pull.commitsURL">{{ pull.commits }}</a>
            </span>
            <p>{{ pull.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
defineProps({
  user: Object,
  organizations: Array,
  repos: Array,
  pulls: Array
})
</script>
