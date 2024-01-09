<template>
<div style="display: flex;">
  <AsideMenu ref="asideMenu"/>
  <div class="main-content" style="margin-left: 10px;flex: 1;display: flex;height: calc(100vh);">
    <div  class="carousel-container">
      <el-card>
        <div>
          <span class="demonstration">请输入算法名称</span>
          <el-input
            class="name-input"
            v-model="uploadData.ds_name"
            autosize
            type="textarea"
            placeholder="算法名称"
          />
        </div>
        <div>
          <span class="demonstration">请输入可执行文件名</span>
          <el-input
            class="name-input"
            v-model="uploadData.executable_file_name"
            autosize
            type="textarea"
            placeholder="可执行文件名"
          />
        </div>
        <div style="margin-bottom: 10px;">
          <span class="demonstration">请输入要步入的函数名,点击加号可添加单个函数</span>
          <el-input
            v-model="currTag"
            placeholder="步入的函数名"
            style="margin-bottom: 10px;"
          >
            <template #append>
              <el-button @click="addStepInName"><el-icon><Plus /></el-icon></el-button>
            </template>
          </el-input>
          <el-tag
            v-for="tag in this.uploadData.step_in_list"
            class="mx-1"
            closable
          >
            {{ tag }}
          </el-tag>
        </div>
        <el-upload
          class="upload-demo"
          ref="uploadRef"
          drag
          action="http://8.134.176.2:8899/gdb/upload/cpp_file"
          :data="uploadData"
          :auto-upload="fal"
          name="cpp_file"
          :before-upload="beforeUpload"
          :on-success="onUploadSuccess"
          :on-error="onUploadError"
          multiple
        >
          <el-icon class="el-icon--upload"><upload-filled /></el-icon>
          <div class="el-upload__text">
            Drop file here or <em>click to upload</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500kb
            </div>
          </template>
        </el-upload>
      </el-card>
    </div>
    
    <div class="code-container" v-loading="codeLoading">
      <span class="demonstration"><el-icon><Document /></el-icon> 编译结果回显</span>
      <!-- <el-card style="margin-top: 10px;"> -->
      <el-scrollbar max-height="100vh">
        <div class="desc source-code">
          <div><pre><code ref="code" v-html="highlightedCode"></code></pre></div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</div>
</template>

<style scoped>
.name-input{
  margin-bottom: 10px;
}

.el-tag {
  margin-bottom: 10px;
  margin-right: 5px;
}

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
import axios from 'axios'
// 页面组件
import AsideMenu from '../components/aside-menu.vue'
import { UploadFilled } from '@element-plus/icons-vue'
import hljs from 'highlight.js'
import { Plus } from '@element-plus/icons-vue'


const code = ``
// const codeLoading = false

export default {
  // 组件
  components: {
    AsideMenu
  },
  // 变量
  data() {
    return {
      // highlightedCode: highlightedCode,
      code: code,
      uploadData: { // python后端服务参数
        executable_file_name: 'vue_upload_demo',
        ds_name: '二叉树遍历',
        step_in_list: []
      },
      codeLoading: false,
      currTag: 'preOrder',
      // stepInTagList: ['preOrder', 'inOrder', 'postOrder']
    }
  },
  // 计算属性
  computed: {
    highlightedCode() {
      // 处理json格式
      if (this.code == '') {
        return '暂无回显步骤'
      }
      this.codeLoading = true
      const formattedCode = JSON.stringify(JSON.parse(this.code), null, 2)
      const highlighted = hljs.highlight('json', formattedCode).value
      this.codeLoading = false
      return highlighted
    },
  },

  created() {
    // 在页面初始化时调用本地后端接口
    // this.fetchData()
  },
  mounted() {
    // 在页面挂载后调用远程后端接口
    // this.fetchData()

  },
  methods: {
    addStepInName() {
      // 添加步入函数名
      if (this.currTag == '') {
        this.$message({
          message: '请输入步入函数名后再添加',
          type: 'warning'
        })
        return
      }
      this.uploadData.step_in_list.push(this.currTag)
    },

    fetchDebugResult() {
      // 发起post请求调用接口（'http://8.134.176.2:8899/api/get_gdb_result/'）查看调试回显, 在body中传入参数
      axios.post('http://8.134.176.2:8899/api/get_gdb_result/', {
        "executable_file_name": this.uploadData.executable_file_name,
        "ds_name": this.uploadData.ds_name,
        "step_in_list": this.uploadData.step_in_list
      }).then((res) => {
          console.log(res)
          if (res.status == 200) {
            // 将返回的数据赋值给code
            this.code = JSON.stringify(res.data)
            this.$message({
              message: '调试步骤回显成功',
              type: 'success'
            })
          }
          else {
            this.$message({
              message: '后端接口异常，请联系管理员',
              type: 'error'
            })
          }
        })
        .catch((err) => {
          console.log(err)
          this.$message({
            message: '前端请求异常，请检查网络连接或联系管理员',
            type: 'error'
          })
        })

    },
    beforeUpload(){
      // 检查uploadData中的参数是否为空
      if (this.uploadData.executable_file_name == '' || this.uploadData.ds_name == ''){
        this.$message({
          message: '请填写算法名称和可执行文件名',
          type: 'warning'
        })
        return false
      }
    },
    onUploadSuccess(res){
      console.log(res)
      if (res.status == 200){
        this.$message({
          message: '上传成功',
          type: 'success'
        })
        // 发起请求调用接口查看调试回显
        this.fetchDebugResult()
      }
      else {
        this.$message({
          message: '后端上传异常，请联系管理员',
          type: 'error'
        })
      }
    },
    onUploadError(err){
      console.log(err)
      this.$message({
        message: '前端上传异常，请检查网络连接或联系管理员',
        type: 'error'
      })
    }
  }
}
</script>

