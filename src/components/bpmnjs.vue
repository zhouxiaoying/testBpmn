<template>
  <div class="containers" ref="containers">
    <el-button @click="saveXML">保存</el-button>
    <div id="js-canvas" class="canvas" ref="canvas"></div>
       <custom-properties-panel
            ref="propertiesPanel"
            :modeler="awaitModeler"
            :queryData="queryData"
        />
  </div>
</template>

<script>
//汉化
import customTranslate from './customTranslate/customTranslate'
var customTranslateModule = {
  translate: [ 'value', customTranslate ]
}
//camunda模块是什么
//自定义表头保存等方法
//自定义属性面板

import BpmnModeler from "bpmn-js/lib/Modeler"; // 引入 bpmn-js
// import BpmnViewer from "bpmn-js/lib/Viewer"; // 引入 bpmn-js  预览

import customPropertiesPanel from './properties-panel';

import customModule from './custom'




export default {
  name: "bpmnJs",
   components:{
        customPropertiesPanel
    },
  data() {
    return {
      xmlStr: `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
<bpmn2:process id="Process_1" isExecutable="false">
  <bpmn2:startEvent id="StartEvent_1" />
</bpmn2:process>
<bpmndi:BPMNDiagram id="BPMNDiagram_1">
  <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">
    <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">
      <dc:Bounds x="192" y="82" width="36" height="36" />
    </bpmndi:BPMNShape>
  </bpmndi:BPMNPlane>
</bpmndi:BPMNDiagram>
</bpmn2:definitions>`,
      bpmnModeler: null,
      containers: null,
       modeler:"",
            awaitModeler:'',
            type:'create'
    };
  },
   computed:{
        queryData(){
            return {
                formId: '',
                flowId: ''
            }
        },
    },
  mounted() {
    this.initDiagram();
  },
  methods: {
    //初始化方法
    initDiagram() {
      this.containers = this.$refs.containers; // 获取到属性ref为“containers”的dom节点
      const canvas = this.$refs.canvas; // 获取到属性ref为“canvas”的dom节点
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
         additionalModules: [
           // 自定义的节点
        customModule,
          // 右边的工具栏
        //   propertiesPanelModule,
          customTranslateModule
        ]
      });
      this.createNewDiagram();
    },
    // 注意：必须先加载一个bpmn文件，新建就是加载一个空的bpmn文件，否则不能拖拽节点
    createNewDiagram() {
      /**
       * 获取后台，获取默认的xml
       * */
      // var diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';
      // this.$axios.get(diagramUrl).then((res)=>{
      //     console.log(res.data)
      //     this.openDiagram(res.data)
      //   }).catch((err)=>{
      //     console.log(err)
      //   })

      let mr_xml = this.xmlStr; //默认值-xml
      // let mr_xml = '' //默认值-xml
      this.openDiagram(mr_xml);
    },
    openDiagram(xml) {
      /**
       * 导入xml（字符串形式），返回导入结果
       * 后续会取消传入回调函数的方式
       * 推荐使用async/await或者链式调用
       * @param { string } xml 流程图xml字符串
       * @param { Promise } callback 回调函数，出错时返回{ warnings，err }
       */
      this.bpmnModeler.importXML(xml).then((res)=>{
        console.log(res)
         this.bpmnModeler.get('canvas').zoom('fit-viewport', 'auto')
                this.awaitModeler = this.bpmnModeler
      });
    },
    saveXML(){
        this.bpmnModeler.saveXML({format: true}, (err, xml) => {
                if (!err) {
                    // 获取文件名
                    // const name = `${this.getFilename(xml)}.bpmn`;
                    // 将文件名以及数据交给下载方法
                    console.log(999,xml)
                    // this.download({name: name, data: xml});
                }
            });
    }
  },
};
</script>

<style lang="scss" scope>
/*左边工具栏以及编辑节点的样式*/
  @import '~bpmn-js/dist/assets/diagram-js.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css';
  @import '~bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css';

  @import './bpmncss/bpmn.css';


.containers {
  position: absolute;
  background-color: #ffffff;
  width: 90%;
  height: 100%;
  display: flex;
  .canvas {
    width: 100%;
    height: 100%;
  }
  .bjs-powered-by {
    display: none;
  }
}
.entry.bpmn-icon-gateway-none,
.entry.bpmn-icon-subprocess-expanded,
.entry.bpmn-icon-data-object,
.entry.bpmn-icon-data-store,
.entry.bpmn-icon-participant,
.entry.bpmn-icon-group,
.entry.bpmn-icon-task,
.entry.bpmn-icon-intermediate-event-none
{
    display: none;
}
.entry.bpmn-icon-start-event-none::before{
    color: #12c2e9;
}
.entry.bpmn-icon-end-event-none::before{
    color: #f64f59;
}
.entry.bpmn-icon-task{
    color: #e9bb12;
}
</style>