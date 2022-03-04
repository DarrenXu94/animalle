<template>
    <div class="imgContainer" v-if="imgUrl">
        <img class="animalImg" v-bind:src="imgUrl" />
    </div>
</template>

<script>
export default {
    name: "Picture",
    created() {
        this.getPicture()
    },
    data() {
        return {
            imgUrl: null
        }
    },
    methods: {
        getPicture() {
            const query = this.$store.getters.getCorrectWord
            const appid = import.meta.env.VITE_APP_ID
            fetch(`https://api.unsplash.com/search/photos?page=1&per_page=10&query=${query}&client_id=${appid}`)
                .then(response => response.json())
                .then(data => {
                    this.imgUrl = data.results[Math.floor(Math.random() * data.results.length)].urls.regular
                });
        }
    }


}
</script>

<style scoped>
.animalImg {
    width: 100%;
    height: 100%;
}
.imgContainer {
    max-width: 800px;
    margin: auto;
}
</style>