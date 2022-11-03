<template>
  <div>
    <!--
        1、layout布局封装
        2、searchForm作为slot传入
        3、table
        4、pagination
        5、table渲染使用render方法（渲染不同的模板，参考csdn）
        6、column列加edit属性 编辑状态下渲染input 和确定取消按钮
        7、actionBtn 作为slot传入（checkbox选择之后 actionBtn才可以点击）
        8、新增 在本页加一条数据 可编辑状态（新增的时候  数组 unshift）
        9、双击某一行 该行进入编辑状态
        10、点击保存 先验证新增的数据（没有id），是否重复，其次验证编辑的数据 是否正确填写
    --->
    <slot name="search-form"></slot>
    <template v-if="isEditTable">
         <el-button>保存</el-button>
          <el-button>新增</el-button>
          <el-button>修改</el-button>
          <el-button>删除</el-button>
    </template>
    <slot name="action-btn"></slot>
     <el-table
    :data="originalTableData"
    @row-dblclick="toggleEdit"
    stripe
    style="width: 100%">
    <el-table-column v-if="isSelect" type="selection"></el-table-column>
    <el-table-column v-for="item in columnData" 
    :key="item.id" 
    :prop="item.prop" 
    :label="item.label">
    <template slot-scope="scope">
          <template v-if="scope.row.edit && item.editable">
                <template v-if="item.editType === 'input'">
                    <el-input v-model="scope.row[item.prop]" size="small" />
                </template>
                <template v-else-if="item.editType === 'select'">
                    <el-select v-model="scope.row[item.prop]" size="small">
                        <el-option v-for="(option,index) in (item.editSelect)" :key="index" :label="option.label" :value="option.value"></el-option>
                    </el-select>
                </template>
                <!-- <template v-else-if="item.editType === 'date'">
                    <el-date-picker
                        v-model="scope.row[item.prop]"
                        type="datetime">
                    </el-date-picker>
                </template> -->
                <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="warning" @click="cancelEdit(scope.row,item.prop)">
                取消
                </el-button>
          </template>
          <expand-dom 
          v-else-if="item.render"
                      :render="item.render"
                      :row="scope.row"
                      :index="scope.$index"
                      :column="item"></expand-dom>
          <span v-else>{{ scope.row[item.prop]||'-' }}</span>
        </template>
    </el-table-column>
  </el-table>
   <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.curPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
var clone = require("clone");
export default {
    name:'SuperTable',
    props:{
        tableData:{
            type:Array,
            required:true
        },
        columnData:{
            type:Array,
            required:true
        },
        page:{
            type:Object,
            default(){
                return {
                    total:0,
                    curPage:1,
                    pageSize:10
                }
            }
        },
        isSelect:{
            type:Boolean,
            default(){
                return false
            }
        },
        isEditTable:{
            type:Boolean,
            default(){
                return false
            }
        },
    },
    components:{
        expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null
        }
      },
      render: (h, ctx) => {
        const params = {
          row: ctx.props.row,
          index: ctx.props.index
        }
        if (ctx.props.column) params.column = ctx.props.column
        return ctx.props.render(h, params)
      }
    }
    },
    data(){
        return{
            originalTableData:[]
        }
    },
    created(){
        this.originalTableData = clone(this.tableData)
    },
    methods:{
        handleSizeChange(val){
            this.$emit('handleSizeChange',val)
        },
        handleCurrentChange(val){
            this.$emit('handleCurrentChange',val)
        },
        cancelEdit(row,prop){
            // row.edit = false;
            let filterArr = this.originalTableData.filter((item)=>{return item.id === row.id})
            console.log(filterArr);
            row[prop] = filterArr[0][prop]
        },
        toggleEdit(row){
            if(this.isEditTable){
                row.edit = true
            }
        }
    }

}
</script>

<style>

</style>