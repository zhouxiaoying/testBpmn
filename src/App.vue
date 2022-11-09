<template>
  <div id="app">
    <!-- <SuperTable ref="superTable" :isEditTable="true" :isSelect="true" :page="tableData.page" :tableData="tableData.data" :columnData="columnData" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange">
        <el-form slot="search-form" :inline="true" :model="searchForm">
          <el-form-item label="测试">
            <el-input v-model="searchForm.test"></el-input>
          </el-form-item>
          <el-form-item label="测试1">
            <el-input v-model="searchForm.test1"></el-input>
          </el-form-item>
          <el-form-item label="测试2">
            <el-input v-model="searchForm.test2"></el-input>
          </el-form-item>
        </el-form>
        <template slot="action-btn">
          <el-button>批量下载</el-button>
        </template>
    </SuperTable> -->
    <!-- <SideBar /> -->
    <!-- <vue2aceEditor /> -->
    <!-- <echartTest /> -->
    <bpmnJs />
  </div>
</template>

<script>

// import SuperTable from './components/SuperTable.vue'
// import SideBar from './components/sideBar.vue'
// import vue2aceEditor from './components/vue2aceEditor.vue'
// import echartTest from './components/echartsTest.vue'

import bpmnJs from './components/bpmnJs.vue'


export default {
  name: 'App',
  components: {
    // SuperTable,
    // SideBar,
    // vue2aceEditor,
    // echartTest
    bpmnJs
  },
  data(){
    return{
      addressArr:[],
      searchForm:{
        test:123,
        test1:123,
        test2:123,
      },
      tableData:{
        page:{
          total:100,
          curPage:1,
          pageSize:10
        },
        data:[
        {
          id:1,
          edit:false,
          date: '2016-05-02',
          name: '王小虎',
          avta: 'https://avatars.githubusercontent.com/u/91187026?v=4&s=120',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id:2,
          edit:false,
          date: '2016-05-04',
          name: '王小虎',
          avta: 'https://avatars.githubusercontent.com/u/91187025?v=4&s=120',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id:3,
          edit:false,
          date: '2016-05-01',
          name: '王小虎',
          avta: 'https://avatars.githubusercontent.com/u/91187024?v=4&s=120',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id:4,
          edit:false,
          date: '2016-05-03',
          name: '王小虎',
          avta: 'https://avatars.githubusercontent.com/u/91187023?v=4&s=120',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
      },
      columnData:[
        {
          prop:'name',
          label:'名称',
          editable:true,
          editType:'input',
          id:'name'
        },
        {
          prop:'address',
          label:'地址',
          editable:true,
          editType:'select',
          editSelect:[],
          id:'address'
        },
        {
          prop:'date',
          label:'日期',
          editable:true,
          editType:'input',
          id:'date'
        },
        {
          prop:'avta',
          label:'头像',
          render: (h, { row }) => <img  alt={row.avta} src={row.avta} width="100px" height="40px" />,
          id:'avta'
        },
        {
          prop:'action',
          label:'操作',
          editable:false,
          render: (h, { row }) => <el-button  onClick={()=>this.uploadFile(row)}>上传-{row.name}</el-button>,
          id:'action'
        },

      ]
    }
  },
  created(){
    this.getAddressList()
  },
  methods:{
    getAddressList(){
      this.columnData.map((item)=>{
        if(item.prop === 'address'){
          item.editSelect = [
            {label:'上海市普陀区金沙江路 1518 弄',value:'上海市普陀区金沙江路 1518 弄'},
            {label:'上海市普陀区金沙江路 1 弄',value:'上海市普陀区金沙江路 1 弄'},
            {label:'上海市普陀区金沙江路 11 弄',value:'上海市普陀区金沙江路 11 弄'},
            {label:'上海市普陀区金沙江路 111 弄',value:'上海市普陀区金沙江路 111 弄'}
          ]
          return item
        }
      })
    },
    handleSizeChange(val){
      this.tableData.page.pageSize = val;
      console.log('handleSizeChange',val)
    },
    handleCurrentChange(val){
      this.tableData.page.curPage = val
      console.log('handleCurrentChange',val)
    },
    uploadFile(row){
      alert(row.date);
    }
  }
}
</script>

<style>
#app {
  text-align: center;
}
</style>
