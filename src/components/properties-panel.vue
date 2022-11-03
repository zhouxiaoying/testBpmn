<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="机器人名称">
            <el-input v-model="form.id"></el-input>
        </el-form-item>
        <el-form-item label="步骤名称" v-if="currentElement !== '' && (currentElement.type).indexOf('Task') !== -1">
            <el-input v-model="form.name" @blur="updateProperties('name')"></el-input>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
    name:'customPropertiesPanel',
     data(){
        return {
            currentElement:"",//当前被选中的图形对象(shape)
            form:{
                name:''
            }
        }
    },
    props:["modeler","queryData"],
    watch:{
        modeler(val){
            this.init(val);
        }
    },
    methods:{
        init(){
            this.eventBus = this.modeler.get("eventBus")
            this.modeling = this.modeler.get("modeling")
            this.moddle = this.modeler.get("moddle")
            this.bpmnFactory = this.modeler.get("bpmnFactory")
            this.elementRegistry = this.modeler.get("elementRegistry")

            //选中节点事件
            this.modeler.on('selection.changed',  e => {
                console.log(e);
                const tempElement =e &&  e.newSelection &&  e.newSelection[0]
                if(tempElement && tempElement.type !="bpmn:SubProcess"){
                    this.currentElement = tempElement
                    //更新属性面板为初始化状态
                    this.form.name = this.currentElement.businessObject.name || ''
                    // this.modeling.updateProperties(tempElement, {
                    //     name: '我是修改后的Task名称'
                    // })
                }
            })
        },
        updateProperties(key){
            if(key === 'name'){
 this.modeling.updateProperties(this.currentElement, {
                        name: this.form[key]
                    })
            }
           
        }
    }

}
</script>

<style>

</style>