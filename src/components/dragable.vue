<template>
<div>
  <el-row>
    <el-col :span="8">
 <div v-for="item in list1" :key="item.id">
             <h3>{{item.name}}</h3>
      <draggable
        class="dragArea list-group"
        :list="item.children"
        :group="{ name: 'people', pull: 'clone', put: false }"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in item.children"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
        </div>
    </el-col>
    <el-col :span="16">
         <h3>Draggable 2</h3>
      <draggable
        class="dragArea list-group"
        :list="list2"
        group="people"
        @change="log"
      >
        <div
          class="list-group-item"
          v-for="element in list2"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>

    </el-col>

    <!-- <rawDisplayer class="col-3" :value="list1" title="List 1" /> -->

    <!-- <rawDisplayer class="col-3" :value="list2" title="List 2" /> -->
  </el-row>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "dragableClone",
  display: "Clone",
  order: 2,
  components: {
    draggable
  },
  data() {
    return {
      list1: [
        {
            id:1,name:'test1',
            children:[
                { name: "name11", id: 1 },
                { name: "name12", id: 2 },
                { name: "name13", id: 3 },
                { name: "name14", id: 4 }
            ]
        },
         {
            id:2,name:'test2',
            children:[
                { name: "John", id: 5 },
                { name: "Joao", id: 6 },
                { name: "Jean", id: 7 },
                { name: "Gerard", id: 8 }
            ]
        },

       
      ],
      list2: [
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ]
    };
  },
  methods: {
    log: function(evt) {
      window.console.log(evt);
      console.log(this.list1)
      console.log(this.list2)
    }
  }
};
</script>
<style scoped></style>