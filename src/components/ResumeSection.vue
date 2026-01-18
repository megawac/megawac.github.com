<template>
  <div v-if="resume" class="resume-content">
    <section>
      <h1 v-if="resume.name">{{ resume.name }}</h1>
      <h2 v-if="resume.title" id="job-field"><small>{{ resume.title }}</small></h2>
      <p v-if="resume.phone" class="res-info">{{ resume.phone }}</p>
      <p v-if="resume.contact" class="res-info">
        <a :href="'mailto:' + resume.contact">{{ resume.contact }}</a>
      </p>
      <p v-if="resume.portfolio" class="res-info">
        <a :href="resume.portfolio">{{ resume.portfolio }}</a>
      </p>
    </section>

    <section v-if="resume.objective" id="objective">
      <h2 class="underline">Objective</h2>
      <blockquote>
        <p>{{ resume.objective }}</p>
      </blockquote>
    </section>

    <section v-if="resume.aboutme" id="aboutme">
      <h2 class="underline">Summary</h2>
      <blockquote>
        <p>{{ resume.aboutme }}</p>
      </blockquote>
    </section>

    <section v-if="resume.skills" id="skills">
      <h2 class="underline">Skills / Languages</h2>
      <ul class="reactive-list">
        <li v-for="skill in resume.skills" :key="skill">{{ skill }}</li>
      </ul>
    </section>

    <section v-if="resume.frameworks && resume.frameworks.length > 0" id="frameworks">
      <h2 class="underline">Frameworks & Libraries</h2>
      <ul class="reactive-list">
        <li v-for="framework in resume.frameworks" :key="framework">{{ framework }}</li>
      </ul>
    </section>

    <section v-if="resume.experience && resume.experience.length > 0" id="experience">
      <h2 class="underline">Experience</h2>
      <ul class="non-content">
        <li v-for="job in resume.experience" :key="job.company">
          <section>
            <dl class="dl-horizontal">
              <dt>Company:</dt>
              <dd class="sect-title">{{ job.company }}</dd>
              <dt>Title:</dt>
              <dd>{{ job.title }}</dd>
              <template v-if="job.startDate">
                <dt>Tenure:</dt>
                <dd><span>{{ job.startDate }}</span> &ndash; <span>{{ job.endDate }}</span></dd>
              </template>
              <template v-if="job.link">
                <dt>Website:</dt>
                <dd><a :href="job.link">{{ job.link }}</a></dd>
              </template>
              <template v-if="job.technologies && job.technologies.length > 0">
                <dt>Technologies:</dt>
                <dd>{{ job.technologies }}</dd>
              </template>
              <template v-if="job.responsibilities">
                <dt>Responsibilities:</dt>
                <dd>{{ job.responsibilities }}</dd>
              </template>
              <template v-if="job.achievements">
                <dt>Achievements:</dt>
                <dd>{{ job.achievements }}</dd>
              </template>
            </dl>
          </section>
        </li>
      </ul>
    </section>

    <section v-if="resume.speaking && resume.speaking.length > 0" id="speaking">
      <h2 class="underline">Speaking</h2>
      <ul class="non-content">
        <li v-for="talk in resume.speaking" :key="talk.title">
          <section>
            <dl class="dl-horizontal">
              <dt>Title:</dt>
              <dd class="sect-title">{{ talk.title }}</dd>
              <dt>Location:</dt>
              <dd>{{ talk.link }}</dd>
              <template v-if="talk.link">
                <dt>Link:</dt>
                <dd><a :href="talk.link">{{ talk.link }}</a></dd>
              </template>
            </dl>
          </section>
        </li>
      </ul>
    </section>

    <section v-if="resume.projects && resume.projects.length > 0" id="projects">
      <h2 class="underline">Projects</h2>
      <ul class="non-content">
        <li v-for="project in resume.projects" :key="project.name">
          <section>
            <dl class="dl-horizontal">
              <dt>Name:</dt>
              <dd class="sect-title">{{ project.name }}</dd>
              <template v-if="project.technologies && project.technologies.length > 0">
                <dt>Technologies:</dt>
                <dd>{{ project.technologies }}</dd>
              </template>
              <dt>Description:</dt>
              <dd>{{ project.description }}</dd>
            </dl>
          </section>
        </li>
      </ul>
    </section>

    <section v-if="resume.education && resume.education.length > 0" id="education">
      <h2>Education</h2>
      <ul class="non-content">
        <li v-for="school in resume.education" :key="school.institute">
          <section>
            <dl class="dl-horizontal">
              <dt>Institute:</dt>
              <dd class="sect-title">{{ school.institute }}</dd>
              <dt>Program:</dt>
              <dd>{{ school.program }}</dd>
              <dt>Dates Attended:</dt>
              <dd><span>{{ school.startDate }}</span> &ndash; <span>{{ school.endDate }}</span></dd>
              <template v-if="school.achievements">
                <dt>Achievement:</dt>
                <dd>{{ school.achievements }}</dd>
              </template>
            </dl>
          </section>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
defineProps({
  resume: {
    type: Object,
    required: true
  }
})
</script>
