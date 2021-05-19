<template>
  <div>
    <van-nav-bar
      left-text="返回"
      title="标题"
      fixed="true"
      @click-left="onClickLeft"
    />
    <br />
    <br />
    <br />
    <van-cell
      type="flex"
      :title="currentName"
      size="large"
      :label="currentDetail"
    />
    <video
      id="myVideo"
      class="video-js vjs-default-skin vjs-big-play-centered box"
      controls
      preload="auto"
      :poster="currentCover"
    ></video>
    <van-row type="flex" justify="space-between">
      <van-col span="24"> 上一部 </van-col>
    </van-row>
    <van-row type="flex" justify="space-between">
      <div class="van-ellipsis">hello world</div>
    </van-row>
    <van-row type="flex" justify="space-between">
      <div class="van-ellipsis">下一部</div>
    </van-row>
    <van-row type="flex" justify="space-between">
      <div class="van-ellipsis">goodbye world</div>
    </van-row>
    <br />
    <br />
    <div class="van-ellipsis">相关推荐</div>
    <van-list>
      <div v-for="(item, index) in list" :key="item.id">
        <van-row align="center" gutter="30" v-if="index % 2 == 0">
          <van-col span="12" justify="center" @click="onClick(index)">
            <van-image fit="contain" :src="list[index].src" />
            <div class="van-multi-ellipsis--l3">{{ list[index].name }}</div>
          </van-col>
          <van-col span="12" justify="center" @click="onClick(index + 1)">
            <van-image fit="contain" :src="list[index + 1].src" />
            <div class="van-multi-ellipsis--l3">{{ list[index + 1].name }}</div>
          </van-col>
        </van-row>
      </div>
    </van-list>
  </div>
</template>

<script>
import { NavBar, Cell, Image, Row, Col, List } from "vant";
import videojs from "video.js";
import "videojs-contrib-hls";

export default {
  components: {
    [Cell.name]: Cell,
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Image.name]: Image,
    [Col.name]: Col,
    [List.name]: List,
  },

  data() {
    return {
      videoUrl: "",
      currentCover: "",
      currentName: "当前播放名称",
      currentDetail: "电视剧",
      list: [],
    };
  },

  computed: {
    poster: function () {
      return this.currentCover
        ? this.currentCover
        : "https://img01.yzcdn.cn/vant/apple-1.jpg";
    },
  },

  mounted() {
    // this.$router.go(0);
    console.log(this.$router.currentRoute._value.query.id);
    // 获取视频链接
    let slug = this.$router.currentRoute._value.query.id;

    this.$http
      .get(
        "https://o944z9f9k2.execute-api.ap-northeast-1.amazonaws.com/dev/v/" +
          slug
      )
      .then((response) => {
        // console.log(response);
        // this.info = response;
        let list = response.data;
        console.log(list);
        for (let i = 0; i < list.length; i++) {
          if (slug == list[i].slug) {
            this.videoUrl = list[i].url;
            this.currentName = list[i].title;
            this.currentDetail = list[i].tag;
            this.currentCover = list[i].cover;
            console.log(this.videoUrl);
          }
        }
        this.$nextTick(() => {
          this.getVideo();
        });
      });

    for (let i = 0; i < 8; i++) {
      this.list.push({
        id: this.list.length,
        src: "https://img01.yzcdn.cn/vant/apple-1.jpg",
        name: "示例视频" + i,
      });
    }
  },

  methods: {
    getVideo() {
      this.myVideo = videojs("myVideo", {
        bigPlayButton: true,
        textTrackDisplay: false,
        posterImage: false,
        errorDisplay: false,
        hls: {
          withCredentials: true,
        },
      });

      this.myVideo.src({
        src: this.videoUrl,
        type: "application/x-mpegURL",
      });
    },

    onClick(index) {
      console.log(index);
      console.log(this.$route);
      this.$router.push({ path: "/sub/", query: { id: index } });
      // window.location.pathname = "sub/";
    },

    onClickLeft() {
      this.$router.back();
    },

    onLoad() {
      for (let i = 0; i < 8; i++) {
        this.list.push(this.list.length + 1);
      }
      //   // 异步更新数据
      //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      //   setTimeout(() => {
      //     for (let i = 0; i < 8; i++) {
      //       this.list.push(this.list.length + 1);
      //     }

      //     // 加载状态结束
      //     this.loading = false;

      //     // 数据全部加载完成
      //     if (this.list.length >= 40) {
      //       this.finished = true;
      //     }
      //   }, 1000);
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 300px;
  border: 0px solid;
}
</style>