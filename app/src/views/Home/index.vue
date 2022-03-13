<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <Recommend></Recommend>
        <Rank></Rank>
        <Like></Like>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :floor="floor"></Floor>
        <Brand></Brand>
    </div>
</template>

<script>
    import ListContainer from '@/views/Home/ListContainer'
    import Recommend from '@/views/Home/Recommend'
    import Rank from '@/views/Home/Rank'
    import Like from '@/views/Home/Like'
    import Floor from '@/views/Home/Floor'
    import Brand from '@/views/Home/Brand'
    import {mapState} from 'vuex'


    export default {

        name: "",
        components: {
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
        mounted() {
            this.$store.dispatch("getFloorList");
        },
        computed:{
            ...mapState({
                floorList:(state)=>state.home.floorList,
            })
        }
    }
</script>

<style scoped>

</style>