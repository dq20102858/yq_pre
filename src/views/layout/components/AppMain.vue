<template>
    <section>
        <transition name="fade" mode="out-in">
            <keep-alive v-if="isRouterAlive" :include="cachedViews">
                <router-view :key="key"></router-view>
            </keep-alive>
        </transition>
    </section>
</template>
<script>
    export default {
      name: "AppMain",
      provide() {
         return {
             reload: this.reload
         }
      },
      data () {
          return {
              isRouterAlive: true,
          }
      },
      computed: {
        cachedViews() {
            return this.$store.state.tagsView.cachedViews
        },
        key() {
            return this.$route.fullPath
        }
    },
      methods: {
        reload() {
              this.isRouterAlive = false;
              this.$nextTick(() => {
                  this.isRouterAlive = true;
              });
          }
      }
    };
</script>
