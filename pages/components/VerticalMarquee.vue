<template>
  <view class="marquee-container" :style="{ height: marqueeHeight + 'rpx' }">
    <view v-if="marqueeList.length > 0">
      <view class="marquee-content" :style="{ top: translateY + 'rpx' }">
				<slot name="marquee-item" v-for="(item, index) in marqueeList" :key="index" :item="item"></slot>
        <view v-if="marqueeList.length <= showItemCount" class="marquee-item">
          <view>{{ marqueeList[0] }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'Marquee',
  props: {
    marqueeList: {
      type: Array,
      default: () => []
    },
    marqueeHeight: {
      type: Number,
      default: 100
    },
    speed: {
      type: Number,
      default: 50
    },
    pauseDuration: {
      type: Number,
      default: 3000
    },
    showItemCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      translateY: 0,
      timer: null
    };
  },
  mounted() {
    if (this.marqueeList.length > 0) {
      this.startMarquee();
    }
  },
  methods: {
    startMarquee() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.translateY -= 1;
        if (this.translateY <= -1100) {
          this.translateY = 0;
        }
      }, this.speed);
    },
    pauseMarquee() {
      clearInterval(this.timer);
      this.timer = null;
      setTimeout(() => {
        this.startMarquee();
      }, this.pauseDuration);
    }
  },
  watch: {
    marqueeList() {
      this.translateY = 0;
      this.startMarquee();
    },
    speed() {
      this.startMarquee();
    },
    pauseDuration() {
      this.startMarquee();
    }
  },
  beforeUnmount() {
    clearInterval(this.timer);
  }
};
</script>

<style>
.marquee-container {
  overflow: hidden;
	width: 100%;
}

.marquee-content {
  position: relative;
}

.marquee-item {
  line-height: 1.5;
  height: 100rpx;
  overflow: hidden;
}
</style>
