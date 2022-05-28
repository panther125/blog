<template>
  <div class="home-blog">
    <div class="hero" :style="{ ...bgImageStyle }">
      <div>
        <ModuleTransition>
          <img
            class="hero-img"
            v-if="recoShowModule && $frontmatter.heroImage"
            :style="heroImageStyle || {}"
            :src="$withBase($frontmatter.heroImage)"
            alt="hero"
          />
        </ModuleTransition>

        <ModuleTransition delay="0.04">
          <h1 v-if="recoShowModule && $frontmatter.heroText !== null">
            {{ $frontmatter.heroText || $title || 'vuePress-theme-reco' }}
          </h1>
        </ModuleTransition>

        <ModuleTransition delay="0.08">
          <p v-if="recoShowModule && $frontmatter.tagline !== null" class="description">
            {{ $frontmatter.tagline || $description || 'Welcome to your vuePress-theme-reco site' }}
          </p>
        </ModuleTransition>
          <ModuleTransition delay="0.08">
          <div id="descText" class="description">
          </div>
        </ModuleTransition>
      </div>
    </div>

    <ModuleTransition delay="0.16">
      <div v-show="recoShowModule" class="home-blog-wrapper">
        <div class="blog-list">
          <!-- 博客列表 -->
          <note-abstract :data="$recoPosts" @paginationChange="paginationChange" />
        </div>
        <div class="info-wrapper">
          <PersonalInfo/>
          <h4><reco-icon icon="reco-category" /> {{$recoLocales.category}}</h4>
          <ul class="category-wrapper">
            <li class="category-item" v-for="(item, index) in this.$categories.list" :key="index">
              <router-link :to="item.path">
                <span class="category-name">{{ item.name }}</span>
                <span class="post-num" :style="{ 'backgroundColor': getOneColor() }">{{ item.pages.length }}</span>
              </router-link>
            </li>
          </ul>
          <hr>
          <h4 v-if="$tags.list.length !== 0"><reco-icon icon="reco-tag" /> {{$recoLocales.tag}}</h4>
          <TagList @getCurrentTag="getPagesByTags" />
          <h4 v-if="$themeConfig.friendLink && $themeConfig.friendLink.length !== 0"><reco-icon icon="reco-friend" /> {{$recoLocales.friendLink}}</h4>
          <FriendLink />
        </div>
      </div>
    </ModuleTransition>

    <ModuleTransition delay="0.24">
      <Content v-show="recoShowModule" class="home-center" custom/>
    </ModuleTransition>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed, onMounted } from 'vue-demi'
import TagList from '@theme/components/TagList'
import FriendLink from '@theme/components/FriendLink'
import NoteAbstract from '@theme/components/NoteAbstract'
import { ModuleTransition, RecoIcon } from '@vuepress-reco/core/lib/components'
import PersonalInfo from '@theme/components/PersonalInfo'
import { getOneColor } from '@theme/helpers/other'
import { useInstance } from '@theme/helpers/composable'

class TextScramble {
  constructor(el) {
    this.el = el
    this.chars = '!<>-_\\/[]{}—=+*^?#________'
    this.update = this.update.bind(this)
  }
  setText(newText) {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)
    const promise = new Promise((resolve) => this.resolve = resolve)
    this.queue = []
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || ''
      const to = newText[i] || ''
      const start = Math.floor(Math.random() * 40)
      const end = start + Math.floor(Math.random() * 40)
      this.queue.push({ from, to, start, end })
    }
    cancelAnimationFrame(this.frameRequest)
    this.frame = 0
    this.update()
    return promise
  }
  update() {
    let output = ''
    let complete = 0
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i]
      if (this.frame >= end) {
        complete++
        output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar()
          this.queue[i].char = char
        }
        output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    }
    this.el.innerHTML = output
    if (complete === this.queue.length) {
      this.resolve()
    } else {
      this.frameRequest = requestAnimationFrame(this.update)
      this.frame++
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
}
const imgList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let count = 0
let bgIndex = 1 
export default defineComponent({
  components: { NoteAbstract, TagList, FriendLink, ModuleTransition, PersonalInfo, RecoIcon },
  data () {
    return {
      recoShow: false,
      currentPage: 1,
      tags: [],
      text: '',
      bgIndex: 1
    }
  },
  setup (props, ctx) {
    const instance = useInstance()

    const state = reactive({
      recoShow: false,
      heroHeight: 0
    })

    const recoShowModule = computed(() => instance && instance.$parent.recoShowModule)

    const heroImageStyle = computed(() => instance.$frontmatter.heroImageStyle || {})

    const bgImageStyle = computed(() => {
      // const url = instance.$frontmatter.bgImage
      //   ? instance.$withBase(instance.$frontmatter.bgImage)
      //   : require('../../images/bg.svg')

      const initBgImageStyle = {
        textAlign: 'center',
        overflow: 'hidden',
        background: `url(https://www.zpzpup.com/assets/image/bj02.jpg) 0% 0% / 100% no-repeat`,
      }

      const { bgImageStyle } = instance.$frontmatter

      return bgImageStyle ? { ...initBgImageStyle, ...bgImageStyle } : initBgImageStyle
    })

    onMounted(() => {
      state.heroHeight = document.querySelector('.hero').clientHeight
      state.recoShow = true
    })

    return { recoShowModule, heroImageStyle, bgImageStyle, ...toRefs(state), getOneColor }
  },
  mounted () {
    this.recoShow = true
    this._setPage(this._getStoragePage())

    const el = document.getElementById('descText')
    const fx = new TextScramble(el)
    const phrases = [
            '我是一名前端',
            '爱吃小熊饼干',
            '上班只为下班',
            '工资刚够早餐',
            '每晚都要加班',
            '只求线上平安',
            '头发快要掉完',
            '前端真的好难',
            '只是无名前端',
            '写代码的憨憨'
    ]
     let counter = 0
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800)
      })
      counter = (counter + 1) % phrases.length
    }

    next()
    count = Number(localStorage.getItem('bgCount') ? localStorage.getItem('bgCount') : 0)
    count++
    if (count >= imgList.length) {
      count = 0
    }
    localStorage.setItem('bgCount', String(count))
    this.bgIndex = imgList[count]
  },
  methods: {
    down () {
      this.getPageScrollY(1000)
    },
    getPageScrollY(top) {
      if (top || Number(top) == 0) { //设置垂直滚动值
        if (self.pageYOffset) {
          self.pageYOffset = Number(top);
        }
        if (document.documentElement) { // Explorer 6 Strict
          document.documentElement.scrollTop = Number(top);
        }
        if (document.body) {// all other Explorers
          document.body.scrollTop = Number(top);
        }
        return true;
      } else { //获取垂直滚动值
        var yScroll;
        if (self.pageYOffset) {
          yScroll = self.pageYOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict
          yScroll = document.documentElement.scrollTop;
        } else if (document.body) {// all other Explorers
          yScroll = document.body.scrollTop;
        }
        return yScroll;
      }
    },
    // 获取当前页码
    getCurrentPage (page) {
      this._setPage(page)
      setTimeout(() => {
        window.scrollTo(0, this.heroHeight)
      }, 100)
    },
    // 根据分类获取页面数据
    getPages () {
      let pages = this.$site.pages
      pages = pages.filter(item => {
        const { home, date } = item.frontmatter
        return !(home == true || date === undefined)
      })
      // reverse()是为了按时间最近排序排序
      this.pages = pages.length == 0 ? [] : pages
    },
    getPagesByTags (tagInfo) {
      this.$router.push({ path: tagInfo.path })
    },
    _setPage (page) {
      this.currentPage = page
      this.$page.currentPage = page
      this._setStoragePage(page)
    },
    getOneColor
  }
})
</script>

<style lang="stylus">
.home-blog {
  padding: 0;
  margin: 0px auto;
  .hero {
    margin $navbarHeight auto 0
    position relative
    box-sizing border-box
    padding 0 20px
    height 100vh
    display flex
    align-items center
    justify-content center
    .hero-img {
      max-width: 300px;
      margin: 0 auto 1.5rem
    }

    h1 {
      display: block;
      margin:0 auto 1.8rem;
      font-size: 2.5rem;
    }

    .description {
      margin: 1.8rem auto;
      font-size: 1.6rem;
      line-height: 1.3;
    }
  }
  .home-blog-wrapper {
    display flex
    align-items: flex-start;
    margin 20px auto 0
    padding 0 20px
    max-width $homePageWidth
    .blog-list {
      flex auto
      width 0
      .abstract-wrapper {
        .abstract-item:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .info-wrapper {
      position -webkit-sticky;
      position sticky;
      top 70px
      overflow hidden
      transition all .3s
      margin-left 15px
      flex 0 0 300px
      height auto
      box-shadow var(--box-shadow)
      border-radius $borderRadius
      box-sizing border-box
      padding 0 15px
      background var(--background-color)
      &:hover {
        box-shadow var(--box-shadow-hover)
      }
      h4 {
        color var(--text-color)
      }
      .category-wrapper {
        list-style none
        padding-left 0
        .category-item {
          margin-bottom .4rem
          padding: .4rem .8rem;
          transition: all .5s
          border-radius $borderRadius
          box-shadow var(--box-shadow)
          background-color var(--background-color)
          &:hover {
            transform scale(1.04)
            a {
              color $accentColor
            }
          }
          a {
            display flex
            justify-content: space-between
            align-items: center
            color var(--text-color)
            .post-num {
              width 1.6rem;
              height 1.6rem
              text-align center
              line-height 1.6rem
              border-radius $borderRadius
              background #eee
              font-size 13px
              color #fff
            }
          }
        }
      }
    }
  }
}

@media (max-width: $MQMobile) {
  .home-blog {
    .hero {
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }
    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}

@media (max-width: $MQMobileNarrow) {
  .home-blog {
    .hero {
      height 450px
      img {
        max-height: 210px;
        margin: 2rem auto 1.2rem;
      }

      h1 {
        margin: 0 auto 1.8rem ;
        font-size: 2rem;
      }

      h1, .description, .action {
        // margin: 1.2rem auto;
      }

      .description {
        font-size: 1.2rem;
      }

      .action-button {
        font-size: 1rem;
        padding: 0.6rem 1.2rem;
      }
    }

    .home-blog-wrapper {
      display block!important
      .blog-list {
        width auto
      }
      .info-wrapper {
        // display none!important
        margin-left 0
        .personal-info-wrapper {
          display none
        }
      }
    }
  }
}
</style>
