<template >
  <div class="overflow-x: hidden">  
<div class="bg-white">
<b-row class="align-inside">
  <ApplicationStatus class="content-style"/>
          
</b-row>
 </div>
</div>
</template>

<script>
 import ApplicationStatus from "../Student/ApplicationStatus.vue";

  export default {
     components: {
           ApplicationStatus,
       },
   
    methods: {
/**
       * @vuese
       * This function is uesd to refresh the table .
       */      
        refreshTable: function(){
            this.$refs.exampleTable.refresh();
        },
/**
       * @vuese
       * This function is uesd to set the new page size by using the example table.
       */         
        setNewPageSize:function(){
            this.$refs.exampleTable.setPageSize(1);
        },
/**
       * @vuese
       * This function is used to add the item using the name and the values.
       */         
        addItem: function () {
            const item = {
                "id": this.values.length + 1,
                "name": "name " + (this.values.length + 1)
            };
            this.values.push(item);
        },
/**
       * @vuese
       * This function is uesd to filter using the toggle.
       */         
        toggleFilter: function () {
            this.showFilter = !this.showFilter;
        },
/**
       * @vuese
       * This function is uesd to picker using the toggle.
       */         
        togglePicker: function () {
            this.showPicker = !this.showPicker;
        },
/**
       * @vuese
       * This function is uesd to select using the toggle.
       */         
        toggleSelect: function () {
            this.showSelect = !this.showSelect;
        },
/**
       * @vuese
       * This function is uesd to pagination using the toggle.
       */         
        togglePagination: function () {
            this.paginated = !this.paginated;
        }
    },
    data() {
      return {
        paginate: {
        limit: 10,
        skip: 1,
      },
        perPage: 5,
        currentPage: 1,
        items: [
         
        ]
      }
    },
    computed: {
      rows() {
        return this.items.length
      }
    }
  }
</script>
<style scoped>
.bg-white{
  background-color: white;
}
.overflow-auto{
    padding :15px;
    margin:0 5px 0 15px;
}
.align-inside{
  padding: 0 0% 0 0%;
  justify-content:center;
  width: 100%;
}
.content-style{
  padding: 0 0% 0 0%;
  width: 100%;
}

</style>