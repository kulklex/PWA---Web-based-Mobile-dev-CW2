<template>
    <section class="container">
        <div class="mx-2 px-4 row justify-content-center">
            <div class="border col-3 d-flex m-4 p-4" v-for="lesson in lessons" :key="lesson.id">
                <div>
                    <h5 class="card-title text-left">
                        {{ lesson.subject }}
                    </h5>
                    <h6 class="card-subtitle text-left">
                        {{ lesson.location }}
                    </h6>
                    <p class="card-text">
                        &#163;{{ lesson.price }}
                    </p>
                    <p class="card-text">
                        Spaces: {{ lesson.spaces }}
                    <p v-show="lesson.spaces <= 0" style="color: red;">
                        No more available space
                    </p>
                    </p>
                    <button class="btn btn-outline-primary" @click="$emit('add', lesson)" :disabled="lesson.spaces <= 0">
                        Add to cart
                    </button>
                </div>
                <div style="margin-left: 2rem; font-size: 3rem; color:blue;">
                    <img :src="'https://courseworkvuejs-env.eba-igkjeup4.eu-west-2.elasticbeanstalk.com/' + lesson.image"
                        height="100" width="90">
                </div>
            </div>
        </div>
    </section>
</template>


<script>
export default {
    props: ['lessons']
}
</script>