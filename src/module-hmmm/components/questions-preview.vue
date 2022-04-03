<template>
  <div class="container">
    <el-dialog
      title="试题预览"
      :visible.sync="showDialog"
      width="900px"
      :before-close="close"
    >
    <!-- 第一行数据 -->
    <el-row>
     <el-col :span="6">
       <span v-if="questionList.questionType === '1'">【题型】：单选题</span>
       <span v-else-if="questionList.questionType === '2'">【题型】：多选题</span>
       <span v-else>【题型】：简答题</span>
     </el-col>
     <el-col :span="6"><span>【编号】：{{questionList.id}}</span>
     </el-col>
     <el-col :span="6">
       <span v-if="questionList.difficulty === '1'">【难度】：简单</span>
       <span v-else-if="questionList.difficulty === '2'">【难度】：一般</span>
       <span v-else>【难度】：困难</span>
     </el-col>
     <el-col :span="6"><span>【标签】：{{questionList.tags}}</span></el-col>
    </el-row>

    <!-- 第二行数据 -->
    <el-row>
      <el-col :span="6"><span>【学科】：{{questionList.subject}}</span></el-col>
      <el-col :span="6"><span>【目录】：{{questionList.directoryName}}</span></el-col>
      <el-col :span="6"><span>【方向】：{{questionList.direction}}</span></el-col>
    </el-row>
    <hr>
    <el-row>
      <el-col>【题干】:</el-col>
    </el-row>
   <el-row>
        <el-col style="color: blue">
         <span v-html="questionList.question"></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
           <span v-if="questionList.questionType === '1'">单选题 选项：（以下选中的选项为正确答案）</span>
       <span v-else-if="questionList.questionType === '2'">多选题 选项：（以下选中的选项为正确答案）</span>
       <span v-else>简答题 选项：（以下选中的选项为正确答案）</span>
        </el-col>
      </el-row>

      <el-radio-group
        v-model="radio"
        v-if="questionList.questionType === '1'"
        @change="change"
      >
        <el-row
          v-for="(item, index) in questionList.options"
          :key="index"
          style="margin: 10px 0px"
        >
          <el-radio :label="item.isRight">{{ item.title }}</el-radio>
        </el-row>
      </el-radio-group>

        <el-radio-group
        v-model="radio"
        v-if="questionList.questionType === '2'"
        @change="change"
      >
        <el-row
          v-for="(item, index) in questionList.options"
          :key="index"
          style="margin: 10px 0px"
        >
          <el-radio :label="item.isRight">{{ item.title }}</el-radio>
        </el-row>
      </el-radio-group>
      <hr>
      <el-row>
        <el-col>
          <span>【参考答案】：<el-button type="danger"  @click="isVideoShow = true">视频答案解析</el-button></span>
          <el-row style="margin-top:20px;" v-if="isVideoShow">
            <video :src="questionList.videoURL" controls="controls" class="video"></video>
          </el-row>
          </el-col>
      </el-row>
      <hr>
      <el-row class="answer">
        <span>【答案解析】：无 </span>
      </el-row>

      <hr />
      <el-row class="answer">
        <span>
          【题目备注】：无
        </span>
      </el-row>
       
     <el-row style="text-align:center" width="100%">
       <el-col>
         <el-button type="primary" @click="$emit('close')"
          justify="center">关 闭</el-button
        >
       </el-col>
        
     </el-row>


      
     
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 1,
      
      isVideoShow: false,
    };
  },
  props: {
    showDialog: { type: Boolean, required: true },
    questionList: { type: Object, required: true },
  },
  methods: {
    change() {
      this.radio = 1;
    },
    close() {
      this.$emit("close");
      this.isVideoShow = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.el-row {
  .el-col {
    span {
      font-size: 15px;
      line-height: 36px;
    }
  }
}

.video {
    width: 600px;
  }
  .answer {
    padding: 8px 0px;
  }
</style>
