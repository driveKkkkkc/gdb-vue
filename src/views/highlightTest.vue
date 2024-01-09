<template>
    <div>
        <el-button @click="executeNextStep">Execute Next Step</el-button>
        <pre>
            <code ref="code" :class="{ 'highlighted-line': isCurrentLine }" v-html="highlightedCode"></code>
        </pre>
    </div>
</template>

<script>
import hljs from 'highlight.js';
// 页面组件
import AsideMenu from '../components/aside-menu.vue'
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

export default {
  data() {
    return {
      code: code,
      currentStep: 1,
      isCurrentLine: false, // 新增 isCurrentLine 变量
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
      this.currentStep += 1;
    //   this.highlightCurrentLine();
    },
    highlightCurrentLine() {
      const lines = this.code.split('\n'); 
      this.isCurrentLine = this.currentStep <= lines.length;
    },
  }
};
</script>



<style>
.image-container {
  max-width: 100%;
  overflow: hidden;
}

.image-fade-enter-active, .image-fade-leave-active {
  transition: opacity 1s;
}
.image-fade-enter, .image-fade-leave-to {
  opacity: 0;
}

/* .highlighted-line {
  background-color: pink;
} */
.hljs {
  position: relative;
}

.hljs-container {
    position: relative;
    display: block;
    width: 600px;
    padding: 30px 5px 2px;
    overflow-x: hidden;
    line-height: 20px;
    text-align: left;
    background: #21252b;
    box-shadow: 0 10px 30px 0 rgb(0 0 0 / 40%);
}

.highlighted-line {
  background-color: pink;
  display: block;
  margin: 0 -1em;
  padding: 0 1em;
  border-left: 2px solid red;
}
</style>

  