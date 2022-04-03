<template>
  <div class="container">
    <el-card>
      <!-- 新增试题 -->
      <el-row class="top">
        <el-col>
          <el-button
            icon="el-icon-edit"
            type="success"
            size="small"
            style="float: right"
            @click="$router.push('new')"
            >新增试题</el-button
          >
        </el-col>
      </el-row>

      <!-- 筛选表单 -->
      <el-form ref="searchForm" label-width="80px" :model="query">
        <el-row>
          <el-col :span="6">
            <el-form-item label="学科" prop="subjectID">
              <el-select
               @change="handleSubject"
               placeholder="请选择"
                v-model="query.subjectID">
                <el-option
                  v-for="(item, index) in subjectLists"
                  :key="index"
                  :label="item.subjectName"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="二级目录" prop="catalogID">
              <el-select
              
               placeholder="请选择"
                v-model="query.directorys">
                <el-option
                   v-for="item in directoryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="标签" prop="tags">
              <el-select placeholder="请选择" v-model="query.tags">
                <el-option
                  v-for="item in tagList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="query.keyword" />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 表单第二行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="试题类型" prop="questionType">
              <el-select placeholder="请选择" v-model="query.questionType">
                <el-option
                  v-for="(v, k, i) in questionType"
                  :key="i"
                  :label="v"
                  :value="k"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="难度" prop="difficulty">
              <el-select placeholder="请选择" v-model="query.difficulty">
                <el-option
                  v-for="(v, k, i) in difficulty"
                  :key="i"
                  :label="v"
                  :value="k"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="方向" prop="direction">
              <el-select placeholder="请选择" v-model="query.direction">
                <el-option
                  v-for="(item, index) in direction"
                  :key="index"
                  :label="item"
                  :value="item"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="录入人" prop="creatorID">
              <el-select placeholder="请选择" v-model="query.creatorID">
                <el-option
                  v-for="(item, index) in userLists"
                  :key="index"
                  :label="item.username"
                  :value="item.id"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 表单第三行 -->
        <el-row>
          <el-col :span="6">
            <el-form-item label="题目备注" prop="remarks">
              <el-input v-model="query.remarks" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="企业简称" prop="shortName">
              <el-input v-model="query.shortName" />
            </el-form-item>
          </el-col>
          <!-- 城市数据 -->
         <el-col :span="6">
              <el-form-item label="城市">
                <el-row>
                  <el-col :span="12">
                    <el-select
                      placeholder="请选择"
                      size="mini"
                      @change="handleCity"
                      v-model="query.city"
                    >
                      <el-option
                        v-for="(item, index) in cityList"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                  <el-col :span="12">
                    <el-select
                      placeholder="请选择"
                      size="mini"
                      v-model="query.area"
                    >
                      <el-option
                        v-for="(item, index) in areaList"
                        :key="index"
                        :label="item"
                        :value="item"
                      ></el-option>
                    </el-select>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-col>
          <!-- 清除搜索按钮 -->
          <el-col :span="6" style="text-align: right">
            <el-form-item>
              <el-button @click="resetForm">清除</el-button>
              <el-button type="primary" @click="searchList">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 消息提示文案 -->
      <el-alert
        style="margin-bottom: 20px"
        :closable="false"
        :title="`数据共有${counts}条`"
        show-icon
      />

      <!-- 试题表格 -->
      <template>
        <el-table :data="lists" style="width: 100%">
          <el-table-column
            width="180"
            prop="number"
            label="试题编号"
          ></el-table-column>
          <el-table-column
            width="180"
            prop="subject"
            label="学科"
          ></el-table-column>
          <el-table-column prop="catalog" label="目录"></el-table-column>
          <el-table-column prop="questionType" label="题型">
            <template v-slot="scope">
              <div>
                <span v-if="scope.row.questionType === '1'">单选</span>
                <span v-else-if="scope.row.questionType === '2'">多选</span>
                <span v-else>简答</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="题干">
            <template v-slot="scope">
              <div v-html="scope.row.question"></div>
            </template>
          </el-table-column>
          <el-table-column prop="addDate" label="录入时间">
            <template v-slot="scope">
              {{ scope.row.addDate | parseTimeByString }}
            </template>
          </el-table-column>
          <el-table-column prop="difficulty" label="难度">
            <template v-slot="scope">
              <span v-if="scope.row.difficulty === '1'">简单</span>
              <span v-else-if="scope.row.difficulty === '2'">一般</span>
              <span v-else>困难</span>
            </template>
          </el-table-column>
          <el-table-column prop="creator" label="录入人"></el-table-column>
          <el-table-column label="操作" width="180">
            <template v-slot="scope">
              <el-row>
                <el-button
                  @click="preview(scope.row)"
                  size="mini"
                  type="danger"
                  icon="el-icon-view"
                  circle
                ></el-button>
                <el-button
                 @click="btnEdit(scope.row)"
                  size="mini"
                  type="primary"
                  icon="el-icon-edit"
                  circle
                ></el-button>
                <el-button
                @click="btnRemove(scope.row.id)"
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  circle
                ></el-button>
                <el-button
                 @click="siftAdd(scope.row)"
                  size="mini"
                  type="success"
                  icon="el-icon-check"
                  circle
                ></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页功能 -->
     <el-pagination
     style="text-align: right; margin-top: 20px; margin-bottom: 15px"
     :current-page="query.page"
      :page-size="query.pagesize"
      :page-sizes="[5, 10, 20, 30]"
      @size-change="changeSize"
      @current-change="currentSize"
       layout="prev, pager, next, sizes, jumper"
       :total="counts"
     >


     </el-pagination>



      <!-- 预览组件 -->
      <questions-preview
        :showDialog="showDialog"
        @close="showDialog = false"
        :questionList="questionList"
      >
      </questions-preview>
    </el-card>
  </div>
</template>

<script>
import { list as subjectList } from '@/api/hmmm/subjects' // 学科
import { simple as directoryAPI } from "@/api/hmmm/directorys";
import { simple as tagAPI } from "@/api/hmmm/tags";
import { list as userList } from '@/api/base/users.js' // 录入人
import { list,detail,remove,choiceAdd } from '@/api/hmmm/questions'
import { provinces, citys, datas } from "@/api/hmmm/citys";
import { provinces as city, citys as area } from "@/api/hmmm/citys";
import questionsPreview from '../components/questions-preview'

export default {
  components: {
    questionsPreview
  },
  data () {
    return {
      // Citys: {
      //   ProvincesData: datas, // 城市数据
      //   ProvincesVal: "",
      //   CitysData: citys("北京市"), // 地区数据
      //   CitysVal: "",
      // },以后搜索数据传输使用
      questionList: {},
      showDialog: false,
      province: provinces(),
      counts: 0,
      lists: [],
      subjectLists: [],
      directoryList: [],
      tagList: [],
      userLists: [],
      cityList: city(), 
      areaList: [],
      questionType: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      difficulty: {
        1: '简单',
        2: '一般',
        3: '困难'
      },
      direction: [
        'o2o',
        '外包服务',
        '企业服务',
        '互联网金融',
        '企业咨询',
        '互联网',
        '电子商务',
        '其他'
      ],
      query: {
        subjectID: null,
        catalogID: null,
        directorys:null,
        tags: null,
        keyword: null,
        questionType: null,
        difficulty: null,
        direction: null,
        creatorID: null,
        remarks: null,
        shortName: null,
        province: null,
        city: null,
        area: null,
        page: 1,
        pagesize: 5
      }
    }
  },
  created () {
    this.subjectList()
    
    this.list()
    this.userList()
  },
  methods: {
    //当前页发生变化
    currentSize(val) {
      this.query.page = val;
      this.list();
    },

    // 页码发生变化
     changeSize(val) {
      this.query.pagesize = val;
      this.list();
    },
    // 数据列表
    async list () {
      const { data } = await list(this.query)
      this.counts = data.counts
      this.lists = data.items
      console.log(data)
    },
   
    // 学科列表
    async subjectList () {
      try {
        const { data } = await subjectList({
          page: 1,
          pagesize: 100
        })
        this.subjectLists = data.items
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
     // 二级目录和标签
    async handleSubject(subjectID) {
      // 选中学科后 先将目录和标签清空
      this.query.directorys = null;
      this.query.tags = null;
      // 获取目录
      const { data: directoryArr } = await directoryAPI({ subjectID });
      this.directoryList = directoryArr;
      // 获取标签
      const { data: tagArr } = await tagAPI({ subjectID });
      this.tagList = tagArr;
    },
   
    // 获取录入人
    async userList () {
      try {
        const { data } = await userList({
          page: 1,
          pagesize: 100,
          keyword: ''
        })
        this.userLists = data.list
        console.log(data)
      } catch (error) {}
    },
    
    // 清除表单
    resetForm () {
      this.$refs.searchForm.resetFields()
    },
    async preview (item) {
      const { data } = await detail({ id: item.id });
      data.questionType = item.questionType;
      data.subject = item.subject;
      this.showDialog = true;
      this.questionList = data;
      console.log(data);
    },
    //搜索
    async searchList(){
      console.log(this.query);
       const { data } = await list(this.query)
      this.counts = data.counts
      this.lists =data.items
      console.log(data);
    },
    //修改试题
       btnEdit(row) {
      this.$router.push({
        path: "new",
        query: {
          id: row.id,
        },
      });
    },
    //删除题目
    async btnRemove(id){
      try {
        await this.$confirm('是否删除该题？',"提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
      })
        await remove({id})
        this.$message.success('删除成功')
        this.list();
      } catch (error) {
        console.log(error);
      }
    },
   async siftAdd(item){
     try {
       await this.$confirm('是否添加至精选题库？')
      const { data } =await choiceAdd({id:item.id, publishState: 1,})
       if (data.success == true) {
         this.$message.success('添加精选成功')
         this.$router.push('choice')
       }
     } catch (error) {
       console.log(error);
     }
    },
     // 选中城市 处理地区选项
    handleCity(city) {
      // 选择城市后 先将地区清空
      this.query.area = null;
      this.areaList = area(city);
    },
    
  }
}
</script>

<style scoped lang="scss">
.el-card {
  margin: 10px;
  .top {
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
