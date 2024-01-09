<template>
<div style="display: flex;">
  <AsideMenu ref="asideMenu"/>
  <div class="main-content" style="margin-left: 10px;flex: 1;display: flex;height: calc(100vh);">
    <div  class="carousel-container">
      <span class="demonstration"><el-icon><VideoPlay /></el-icon> 点击查看执行过程</span>
      <el-button type="primary" @click="executeNextStep" style="margin-left: 10px;margin-bottom: 5px;">下一步</el-button>
      <el-card>
        <div>
        <el-carousel ref="carousel" height="500px" :autoplay="false" style="margin-top: 10px;">
          <el-carousel-item v-for="item in imageList" :key="item">
            <!-- <h3 class="small justify-center" text="2xl">{{ item }}</h3> -->
            <img :src="item.url" style="width: 100%;height: 100%;"/>
          </el-carousel-item>
        </el-carousel>
      </div>
      </el-card>
    </div>
    
    <div class="code-container">
      <!-- span始终固定在当前容器顶端 -->
      <span class="demonstration"><el-icon><Document /></el-icon> 源码展示</span>
      <!-- <el-card style="margin-top: 10px;"> -->
      <el-scrollbar max-height="100vh">
        <div class="desc source-code">
          <div><pre><code ref="code" :class="{ 'highlighted-line': isCurrentLine }" v-html="highlightedCode"></code></pre></div>
        </div>
      </el-scrollbar>
      <!-- </el-card> -->
    </div>
  </div>
</div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
  font-size: 14px;
  /* 固定在容器顶端 */
  position: sticky;
}

.carousel-container {
  width: 45%;
  height:60vh;
  overflow: auto;
  padding-left: 10px;
}

.code-container {
  width: 45%;
  height: 80vh;
  overflow: auto;
  margin-left: 4%;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.line-highlight {
  background-color: red; /* 设置高亮行的背景颜色 */
}

.highlighted-line {
  background-color: pink;
  display: block;
  margin: 0 -1em;
  padding: 0 1em;
  border-left: 2px solid red;
}
</style>

<script>
// 工具库
import axios from 'axios'
import hljs from 'highlight.js'
// 页面组件
import AsideMenu from '../components/aside-menu.vue'

// 一个字符串常量，其中存在换行符
const code = `
# include <iostream>

// 一个二叉树节点类
class TreeNode
{
public:
    TreeNode(int val): val(val), left(nullptr), right(nullptr) {}
    int val;
    TreeNode* left;
    TreeNode* right;
};

// 一个函数，返回一个string类型的值
std::string func()
{
    std::string str = "hello world";
    return str;
}

// 二叉树的前序遍历
void preOrder(TreeNode* root)
{
    if (root == nullptr)
        return;
    std::cout << root->val << std::endl;
    preOrder(root->left);
    preOrder(root->right);
}

// 主函数
int main()
{
    // std::string str = func();
    // std::cout << str << std::endl;
    // return 0;
    // 创建一个二叉树
    TreeNode* root = new TreeNode(1);
    root->left = new TreeNode(2);
    root->right = new TreeNode(3);
    // 左侧子树
    root->left->left = new TreeNode(4);
    root->left->right = new TreeNode(5);
    // 右侧子树
    root->right->left = new TreeNode(6);
    root->right->right = new TreeNode(7);

    // 前序遍历
    preOrder(root);

    return 0;
}
`

import image1 from '../assets/二叉树节点1.png';
import image2 from '../assets/二叉树节点2.png';
import image3 from '../assets/二叉树节点3.png';
import image4 from '../assets/二叉树节点4.png';
import image5 from '../assets/二叉树节点5.png';
import image6 from '../assets/二叉树节点6.png';
import image7 from '../assets/二叉树节点7.png';


const imageUrl = [
  { url: image1 },
  { url: image2 },
  { url: image3 },
  { url: image4 },
  { url: image5 },
  { url: image6 },
  { url: image7 },
];


export default {
  components: {
    AsideMenu,
  },
  data() {
    return {
      code: code,
      currentStep: 49,
      stepIndex : 0,
      steps: [26, 27, 26, 27, 26, 28],
      isCurrentLine: false, // 新增 isCurrentLine 变量
      // 轮播图片，从asset目录下获取
      imageList:imageUrl,
    };
  },
  computed: {
    highlightedCode() {
        const lines = this.code.split('\n');
        const highlightedLines = lines.map((line, index) => {
          const lineNumber = index + 1;
          const lineClass = lineNumber === this.currentStep ? 'highlighted-line' : '';
          return `<span class="${lineClass}">${hljs.highlight('cpp', line).value}</span>`;
        });

        return highlightedLines.join('\n');
    },
  },
  methods: {
    executeNextStep() {
      // todo: 通过变量控制当前高亮的行号
      this.stepIndex += 1;
      this.currentStep = this.steps[this.stepIndex];
      // 触发一次走马灯Carousel的切换
      this.$nextTick(() => {
        this.$refs.carousel.next();
      });
    },
    highlightCurrentLine() {
      const lines = this.code.split('\n'); 
      this.isCurrentLine = this.currentStep <= lines.length;
    },
  }
};
</script>

