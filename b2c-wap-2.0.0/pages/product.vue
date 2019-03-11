<template>
    <div>
        <nuxt-link to="/">首页</nuxt-link>
    </div>
</template>

<script>
    export default {
        middleware: 'userAuth',
        transition: 'silde'
    }
</script>

<style scoped>

</style>