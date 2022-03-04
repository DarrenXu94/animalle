<template>
    <div class="imgContainer" v-if="imgUrl">
        <img class="animalImg" v-bind:src="imgUrl" />
    </div>
    <a class="unsplashLink" :href="unsplashUrl">View original</a>
</template>

<script>
export default {
    name: "Picture",
    created() {
        this.getPicture()
    },
    data() {
        return {
            imgUrl: null,
            unsplashUrl: null
        }
    },
    methods: {
        getPicture() {
            const query = this.$store.getters.getCorrectWord
            const appid = import.meta.env.VITE_APP_ID
            fetch(`https://api.unsplash.com/search/photos?page=1&per_page=10&query=${query}&client_id=${appid}`)
                .then(response => response.json())
                .then(data => {
                    const randomIndex = Math.floor(Math.random() * data.results.length)
                    this.imgUrl = data.results[randomIndex].urls.regular;
                    this.unsplashUrl = data.results[randomIndex].links.html
                });
        }
    }


}
</script>

<style scoped>
.animalImg {
    /* width: 100%; */
    height: 100%;
    position: absolute;
    top: 0;
}
.imgContainer {
    height: 50vh;
    position: relative;
    display: flex;
    justify-content: center;
    margin-top: 7vh;
}

.unsplashLink {
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 2vh;
    justify-content: center;
}
</style>