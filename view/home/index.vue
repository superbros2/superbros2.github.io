<template>
  <van-nav-bar title="急速看片" fixed="true" />
  <br />
  <br />
  <br />
  <!-- <van-tabs v-model="active" @change="onClickTab">
    <van-tab title="电影" id="0" />
    <van-tab title="电视剧" id="1" />
    <van-tab title="动漫" id="2" />
    <van-tab title="短视频" id="3" />
  </van-tabs> -->
  <div class="goods">
    <van-list>
      <div v-for="(item, index) in pageList" :key="item.id">
        <van-row align="center" gutter="30" v-if="index % 2 == 0">
          <van-col span="12" justify="center" @click="onClickVedio(index)">
            <van-image
              fit="contain"
              :src="pageList[index].cover"
              height="150"
            />
            <div class="van-multi-ellipsis--l3">
              {{ pageList[index].title }}
            </div>
          </van-col>
          <van-col
            span="12"
            justify="center"
            @click="onClickVedio(index + 1)"
            v-if="index + 1 < pageList.length"
          >
            <van-image
              fit="contain"
              height="150"
              :src="pageList[index + 1].cover"
            />
            <div class="van-multi-ellipsis--l3">
              {{ pageList[index + 1].title }}
            </div>
          </van-col>
        </van-row>
      </div>
    </van-list>
    <van-pagination
      v-model="currentPage"
      :total-items="list.length"
      :items-per-page="40"
      @change="onPageChange"
    />
  </div>
</template>

<script>
import {
  NavBar,
  Image,
  Col,
  Row,
  List,
  Tag,
  Pagination,
  Cell,
  CellGroup,
  Swipe,
  SwipeItem,
  ActionBar,
  Tab,
  Tabs,
} from "vant";

export default {
  components: {
    [NavBar.name]: NavBar,
    [Pagination.name]: Pagination,
    [Image.name]: Image,
    [List.name]: List,
    [Tag.name]: Tag,
    [Col.name]: Col,
    [Row.name]: Row,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ActionBar.name]: ActionBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },

  mounted() {
    this.getData();
  },

  data() {
    return {
      active: "电影",
      currentTag: "电影",
      currentPage: 1,
      list: [],
      pageList: [],
      loading: false,
      finished: false,
    };
  },

  computed: {
    getCurrentPageData() {
      (this.currentPage + 1) * 40 > this.list.length
        ? (this.currentPage + 1) * 40
        : this.list.length;
      return this.list.slice(this.currentPage * 40);
    },
    isEnough() {
      return this.list.length > this.currentPage * 40 ? true : false;
    },
    totalPage() {
      return Math.ceil(this.list.length / 40);
    },
  },

  methods: {
    onClickVedio(index) {
      // this.$router.push({
      //   path: "/sub/",
      //   query: { id: this.list[index].slug },
      // });
      let routeUrl = this.$router.resolve({
        path: "/sub/",
        query: { id: this.list[index].slug },
      });
      window.open(routeUrl.href);
      // window.open("http://localhost:8080/#/sub/?id=" + this.list[index].slug);
    },

    onClickTab(id, title) {
      console.log(id, title);
      switch (id) {
        case 1:
          this.list = [];
          this.pageList = [];
          this.getData();
          break;

        case 2:
          this.list = [];
          this.pageList = [];
          this.getData();
          break;

        case 3:
          this.list = [];
          this.pageList = [];

          break;

        case 4:
          this.list = [];
          this.pageList = [];

          break;
      }
    },

    onPageChange() {
      this.pageList = [];
      let length = this.isEnough ? 40 * this.currentPage : this.list.length;
      for (let i = (this.currentPage - 1) * 40; i < length; i++) {
        this.pageList.push(this.list[i]);
      }
    },

    getData() {
      // for (let i = 0; i < 135; i++) {
      //   this.list.push({
      //     id: this.list.length + 1,
      //     src: "https://img01.yzcdn.cn/vant/apple-1.jpg",
      //     name: "电影" + i,
      //   });
      //   if (i < 40) {
      //     this.pageList.push(this.list[i]);
      //   }
      // }
      // let xmlhttp = new XMLHttpRequest();
      // xmlhttp.onreadystatechange = () => {
      //   if (xmlhttp.readyState == 4) {
      //     // 4 = "loaded"
      //     if (xmlhttp.status == 200) {
      //       // 200 = OK
      //       // ...our code here...
      //     } else {
      //       alert("Problem retrieving XML data");
      //     }
      //   }
      // };
      // xmlhttp.open("GET", "https://o944z9f9k2.execute-api.ap-northeast-1.amazonaws.com/dev/v/test", true);
      // xmlhttp.send(null);

      this.$http
        .get(
          "https://o944z9f9k2.execute-api.ap-northeast-1.amazonaws.com/dev/v"
        )
        .then((response) => {
          // console.log(response);
          // this.info = response;
          this.list = response.data;
          console.log(this.list);
          for (let i = 0; i < this.list.length; i++) {
            if (i < 40) {
              this.pageList.push(this.list[i]);
            }
          }
        });
    },

    // onLoad() {
    //   for (let i = 0; i < 40; i++) {
    //     this.list.push({
    //       id: this.list.length + 1,
    //       src: "https://img01.yzcdn.cn/vant/apple-1.jpg",
    //       name: "示例视频",
    //     });
    //   }
    // }
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    // setTimeout(() => {
    //   for (let i = 0; i < 10; i++) {
    //     this.list.push(this.list.length + 1);
    //   }

    //   // 加载状态结束
    //   this.loading = false;

    //   // 数据全部加载完成
    //   if (this.list.length >= 40) {
    //     this.finished = true;
    //   }
    // }, 1000);
  },
};
</script>

<style lang="less">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
}
</style>
