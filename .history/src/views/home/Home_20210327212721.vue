<template>
  <div class="home">
    <div class="home-bar"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    this.initBar();
  },
  methods: {
    initBar() {
      let bar = this.$echarts.init(document.getElementsByClassName("home-bar")[0]);
      bar.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss"></style>
