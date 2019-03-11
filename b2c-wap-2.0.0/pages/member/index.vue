<template>
    <section>
        <h1>个人中心的</h1>
    </section>
</template>

<script>
export default {
    layout: 'secondPage',
    // transition: 'fade',
    data (){
        return {
            title: '个人中心-云药库'
        }
    },
    head (){
        return {
        title: this.title,
            meta: [
                { hid: 'description', name: 'description', content: '云药库，会员中心，个人中心' }
            ]
        }
    },
}
</script>

<style lang="scss" scoped>
    section {
        padding:10px;    
    }
    h1 {
        @include border-bottom( $color: red );
    }
</style>

