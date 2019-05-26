<template>
  <div>
    <b-dropdown
      id="themeColor"
      name="themeColor"
      v-model="ddTestVm.ddTestSelectedOption"
      text="Select theme"
      variant="primary"
      class="m-md-2"
      v-on:change="changeItem"
    >
      <b-dropdown-item
        v-for="option in ddTestVm.options"
        :key="option.postColor"
        :postColor="option.postColor"
        @click="changeItem(ddTestVm.ddTestSelectedOption = option.postColor)"
      >{{option.text}}</b-dropdown-item>
    </b-dropdown>
  </div>
</template>

<script>
export default {
  name: "ColorPost",
  data() {
    return {
      someOtherProperty: null,
      ddTestVm: {
        originalValue: [],
        ddTestSelectedOption: "Red",
        disabled: false,
        readonly: false,
        visible: true,
        color: "",
        options: [
          {
            postColor: "#ff6699",
            text: "Summer"
          },
          {
            postColor: "#ff8c1a",
            text: "Autumn"
          },
          {
            postColor: "#66ccff",
            text: "Winter"
          },
          {
            postColor: "#66ff66",
            text: "Spring"
          }
        ]
      }
    };
  },
  methods: {
    changeItem: function(value) {
      this.$emit("clicked", value);
    }
  },
  watch: {},
  async created() {}
};
</script>

<style>
</style>