<template>
  <div style="height: 100%">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          height="100%"
          :elevation="hover ? 24 : 5"
          tile
          :href="href"
          target="_blank"
        >
          <v-img
            v-if="!src.includes('staging.forexlive.com')"
            v-ripple
            :height="
              $vuetify.breakpoint.name != 'xs' &&
              $vuetify.breakpoint.name != 'sm'
                ? '25vh'
                : ''
            "
            class="black--text align-end"
            :aspect-ratio="
              $vuetify.breakpoint.name === 'xs' ||
              $vuetify.breakpoint.name === 'sm'
                ? '1'
                : ''
            "
            :src="src"
          >
          </v-img>
          <v-img
            v-else
            v-ripple
            :height="
              $vuetify.breakpoint.name != 'xs' &&
              $vuetify.breakpoint.name != 'sm'
                ? '25vh'
                : ''
            "
            class="black--text align-end"
            :aspect-ratio="
              $vuetify.breakpoint.name === 'xs' ||
              $vuetify.breakpoint.name === 'sm'
                ? '1'
                : ''
            "
            src="../assets/stockX.png"
          >
          </v-img>
          <v-card-title>
            <span class="break">{{ title }}</span></v-card-title
          >
          <v-card-text class="smallPadding noSelect justify-center">
            <span v-html="text" class="break text-center"> </span>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-text
            ><span style="position: absolute; bottom: 0"
              >Source:{{ source }}</span
            ></v-card-text
          >
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    src: {
      type: String,
      default: "",
    },
    href: {
      type: String,
      default: "",
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/settings/_variables";
@media #{map-get($display-breakpoints, 'xs-only')} {
  .cardTitle {
    font-weight: bold;
    font-size: 18px;
    word-break: break-word;
  }
  .smallPadding {
    padding-bottom: 5px;
  }
  .officeCard {
    font-size: 30px;
  }
}
@media #{map-get($display-breakpoints, 'sm-and-up')} {
  .cardTitle {
    font-weight: bold;
    font-size: 21px;
  }
}
@media #{map-get($display-breakpoints, 'md-and-up')} {
  .cardTitle {
    font-weight: bold;
    font-size: 30px;
  }
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
