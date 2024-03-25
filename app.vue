<template>
  <div>
    {{ response }}
  </div>
</template>
<script lang="ts" setup>
const query = gql`
query tasks {
  tasks {
    id
    todo
    done
  }
}
`
const response = await useAsyncQuery(query)
</script>