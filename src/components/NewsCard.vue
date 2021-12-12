<template>
  <div style="height: 100%">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          style="border-radius: 25px !important"
          height="100%"
          :class="{ shadowOut: !hover, shadowIn: hover }"
          tile
          :href="href"
          target="_blank"
        >
          <div style="overflow: hidden">
            <v-img
              v-if="!src.includes('staging.forexlive.com')"
              v-ripple
              :height="
                $vuetify.breakpoint.name != 'xs' &&
                $vuetify.breakpoint.name != 'sm'
                  ? '25vh'
                  : ''
              "
              :class="{ zoom: hover, zoomOut: !hover }"
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
              :class="{ zoom: hover, zoomOut: !hover }"
              :aspect-ratio="
                $vuetify.breakpoint.name === 'xs' ||
                $vuetify.breakpoint.name === 'sm'
                  ? '1'
                  : ''
              "
              src="../assets/news.png"
            >
            </v-img>
          </div>
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
            >
            <span
              class="mr-4"
              style="position: absolute; bottom: 0; right: 0"
              >{{ getDate() }}</span
            >
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
export default {
  methods: {
    getDate() {
      return new Date(this.date * 1000).toLocaleDateString();
    },
  },
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
    date: {
      type: Number,
      default: 0,
    },
  },
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
.zoom {
  transition: transform 0.5s; /* Animation */
  transform: scale(1.5);
}
.zoomOut {
  transition: transform 0.5s; /* Animation */
  transform: scale(1);
}
.shadowIn {
  transition: box-shadow 0.5s ease-in-out;
  -webkit-box-shadow: 14px 15px 25px -1px #000000 !important;
  box-shadow: 14px 15px 25px -1px #000000 !important;
}
.shadowOut {
  transition: box-shadow 0.5s ease-in-out !important;
  -webkit-box-shadow: 12px 11px 25px -9px #000000 !important;
  box-shadow: 12px 11px 25px -9px #000000 !important;
}
</style>
