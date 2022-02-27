<template>
  <div style="overflow-x: hidden">
    <b-container fluid class="responsive" >
    <blockquote class="blockquote text-center">
      <b-col sm="12" lg="12">
    <h2 class="text-left mt-3">Welcome, {{user}}!</h2>
      </b-col>
    </blockquote>
      <h4 class="text-left mt-3">Review Applications </h4>

 <div v-if="items.length>0">

      <b-row class="bg-white mt-3" style="margin-bottom: 5px">
        <b-col sm="2" md="2" class="my-1">
          <b-form-group
            label="Show"
            label-for="per-page-select"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
          >
            <b-form-select
              id="per-page-select"
              v-model="perPage"
              :options="pageOptions"
              size="sm"
              class="px-sm-3"
              style="width:60px"
            ></b-form-select>
          </b-form-group>
     

        </b-col>

        <b-col md="4"></b-col>
        <b-col md="3"></b-col>

        <b-col md="3" class="my-1">
          <b-input-group size="sm">
            <div class="input-group-prepend ">
              <span class="input-group-text search1" id="inputGroup-sizing-default">
                <font-awesome-icon icon="search" style="margin-right:0px;" />
              </span>
            </div>
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            ></b-form-input>

          </b-input-group>
        </b-col>
      </b-row>

      
      <b-table 
        :items="items"
        :fields="fields"
        :bordered="true"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(users[0])="row">
          <b-col> {{ row.value.firstname }} {{ row.value.lastname }} </b-col>
        </template>

        <template #cell(student_details)="row">
          <b-col size="sm" class="mr-1">
            {{ row.value.majorId }}
          </b-col>
        </template>

        <template #cell(id)="row">
          <b-link
            style="color: blue; font: unset"
            href=""
            @click="info(row.item, row.index, $event.target)"
            size="sm"
            class="mr-1"
          >
            {{ row.item.applicationreferenceId }}
          </b-link>
        </template>

        
        <!--need to modify addComments class!-->
        <template #cell(modify)="row">
          <div style="padding:5px 5px 5px 5px;">
          <b-button
            variant="danger"
            size="md"
            @click="addComments(row.item, row.index, $event.target)"
            class="mr-1"
          >
            Delete
          </b-button>
          <b-modal
        :id="(row.item.applicationreferenceId).concat(`${row.item.applicationreferenceId.substring(0,3)}`)"
        :title="modify.title"
        @ok="handleOk(row.item.id)"
        @hide="resetmodify"
      >Are you Sure want to delete this record ? 
       
      </b-modal>
          </div>
        </template>
      </b-table>

      <!-- Info modal -->
      <b-modal
        v-b-modal.detail-view
        :id="details.id"
        :title="details.title"
        ok-only
        @hide="resetdetails"
      >
        <b-row >
          <b-col>
            <a>Student Name: </a>
            <span style="color: black"
              >{{ details.content.firstname }}
              {{ details.content.lastname }}</span
            >
            <br />
            <a>Major: </a><span>{{ details.maindata.major }}</span>
            <br />
            <a>Personal Email : </a><span>{{ details.content.email }}</span>
            <br /><a>
            Phone Number: </a>{{ details.maindata.contact }}
            <br /><a>
            Address: </a>{{ details.maindata.address }}
            <br />
            <br />
            <a>
            Employer Name: </a>{{ details.employee.employerName }}
            <br />
            <a>
            Point of Contact: </a>{{ details.employee.primaryContactName }}
            <br />
            <a>
            Employee Email: </a>{{ details.employee.email }}
            <br /><a>
            Employee Phone Number: </a>{{ details.employee.employerContact }}
            <br /><a>
            Employer Address: </a>{{ details.employee.addressLine1 }}
            <br />
            <br />
            <a>
            Application Date: </a>{{ details.maindata.applicationDate }}
            <br />
            <a>
            Start Date: </a>{{ details.maindata.startDate }}
            <br />
            <a>
            End Date: </a>{{ details.maindata.endDate }}
            <br />
            <a>
            Status: </a>{{ details.maindata.status }}
            <br />
            <br />
            <a>Comments</a>
            <ul style="margin-left: 18px">
              <li v-for="(value, key) in commentsList" :key="key">
                {{ value.updated }}: {{ value.commentGiven }}
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-modal>

      

      <b-row>
        <b-col sm="6" md="9"></b-col>
        <b-col sm="7" md="3" class="my-1">
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>
        </b-col>
      </b-row>  
      </div>
       <div v-else style="text-align:center">
        <img :src = "NoDataFoundImage">
      </div>
      <b-row>
        <b-col md="4"></b-col>
        <b-col md="4" style="text-align: center">
      <b-button
            type="button"
            variant="primary"
            style="width: 80px"
            @click.prevent="$router.push('/dashboard')">
            Back</b-button
          ></b-col>
          <b-col md="4"></b-col></b-row>

    </b-container>
   
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment';

import image from "@/assets/NoDataFound.png"
export default {
  name: "FacultyView",
  components: {},
  data() {
    return {
      user: this.$store.getters.userDetails.firstname,
      items: [],
      currentStatus:null,
      Pending: "Pending",
      NoDataFoundImage : image,
      Approved:"Approved",
      status: {},
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        {
          key: "users[0]",
          label: "Name",
          sortable: true,
          sortDirection: "desc",
        },
        {
          key: "student_details",
          label: "Major",
          sortable: true,
          class: "text-center",
        },
        {
          key: "startDate",
          label: "Employment Start Date",
          sortable: true,
          class: "text-center",
        },
        {
          key: "applicationDate",
          label: "Application Date",
          sortable: true,
          class: "text-center",
        },
        {
          key: "applicationStatus",
          label: "Status",
          sortable: true,
          class: "text-center",
        },
        { key: "modify", label: "Modify" }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 3,
      pageOptions: [3,5,10,20],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      details: {
        id: "info-modal",
        title: "",
        content: "",
        employee: "",
        maindata: {},
      },
      
      modify: {
        id: "",
        title: "",
        content: "",
      },
      selectedValue: "",
      commentData: {
        currentStatus: "",
        applicationId: "",
        comments: null,
      },
      commentsList: [],
    };
  },

  async mounted() {
    this.loading = true;
    await this.getAllApplications();
    this.totalRows = this.items.length;
  },

  computed: {
        username(){
        var userDetails= JSON.parse(localStorage.getItem('user_details'))
        return userDetails.firstname;
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },

    
  },

  methods: {
    async getAllApplications() {
      this.userId = this.$store.getters.userDetails.id;
      await this.$axios.get(`applications`).then(
        (response) => {
          console.log("response", response);
          this.items = response.data;
          this.items.forEach((value,index)=>{
             this.items[index].applicationDate = moment(String(value.applicationDate)).format('DD MMMM YYYY'),
             this.items[index].startDate = moment(String(value.startDate)).format('DD MMMM YYYY')
           });
          console.log("Responsein item details", this.items);
          console.log("length", this.items.length);
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    async getComments(id) {
      await this.$axios.get(`student/comments/${id}`).then(
        (response) => {
          this.commentData.applicationId = null;
          console.log("response", response);
          let tempList = response.data;
          for (var i = 0; i < tempList.length; i++) {
            for (var j = 0; j < tempList[i].comments.length; j++) {
              this.obj = {
                updated: moment(String(tempList[i].comments[j].updated_at)).format('DD MMMM YYYY'),
                commentGiven: tempList[i].comments[j].comments,
              };
              this.commentsList.push(this.obj); //need to modify if there are more applications id in main list
            }
          }
          console.log("comments list........", this.commentsList);
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    //Check the usage of this method
    handleOk: function (id) {
      console.log("id after handle okay....", id);
      this.$axios.delete(`student/deleteapplicationdata/${id}`).then(
        (response) => {
          
          console.log("delete response......", response);
          this.getAllApplications();
        },
        (err) => {
          console.log("----", err);
        }
      );

     
    },

    info(item, index, button) {
      console.log("info", item);
      this.details.title = "Application Details";
      this.commentsList = [];
      if (item) {
        console.log("employee contact....",item);
        this.commentData.applicationId = item.id;
        this.getComments(this.commentData.applicationId);
        this.details.content = item.users[0]; 
        this.details.employee = item.internship;
        this.details.maindata = {
          applicationDate: moment(String(item.applicationDate)).format('MMMM DD YYYY'),
          status: item.applicationStatus,
          startDate: moment(String(item.startDate)).format('MMMM DD YYYY'),
          endDate: moment(String(item.endDate)).format('MMMM DD YYYY'),
          major: item.student_details.majorId,
          address: item.student_details.addressLine1,
          contact: item.student_details.contact,
        };
      } else {
        this.getApplicationData();
      }
      this.$root.$emit("bv::show::modal", this.details.id, button);
    },
    resetdetails() {
      this.details.title = "";
      this.details.content = "";
      this.details.employee = "";
      this.details.maindata = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },


    tempComments(id){
      this.commentsList = [];
      this.$axios.get(`student/comments/${id}`).then(
        (response) => {
          //this.commentData.applicationId = null;
          console.log("response", response);
          let tempList = response.data;
          this.currentStatus = tempList[0].applicationStatus;
          for (var i = 0; i < tempList.length; i++) {
            for (var j = 0; j < tempList[i].comments.length; j++) {
              this.obj = {
                updated: moment(String(tempList[i].comments[j].updated_at)).format('DD MMMM YYYY'),
                commentGiven: tempList[i].comments[j].comments,
              };
              this.commentsList.push(this.obj); //need to modify if there are more applications id in main list
            }
          }
          console.log("comments list in temp method........", this.commentsList);
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    addComments(item, index, button) {
      this.modify.id = item.applicationreferenceId+item.applicationreferenceId.substring(0,3);
      console.log("items....", item);
      if (item) {
        this.commentData.applicationId = item.id;
      }
      this.modify.title = "Add Comments";
      this.$root.$emit("bv::show::modal", this.modify.id, button);
      this.tempComments(item.id);
    },
    resetmodify() {
      this.modify.id = "";
      this.modify.title = "";
      this.modify.content = "";
    },

    comment(item, index, button) {  
      this.comments.id = item.applicationreferenceId;
      console.log("items....", item.id);
      if (item) {
        console.log("application obj  ", item.id);
        this.commentData.applicationId = item.id;
        console.log("application id  ", this.commentData);
        
      }
      this.comments.title = "Add Comments";
      this.$root.$emit("bv::show::modal", this.comments.id, button);
      this.tempComments(item.id);
      
    },
    resetcomments() {
      this.comments.id = "";
      this.comments.title = "";
      this.comments.content = "";
    },

    rejectComment(item, index, button) {    
      this.reject.id = item.applicationreferenceId+item.applicationreferenceId.substring(0,2);
      if (item) {
        this.commentData.applicationId = item.id;
      }
      this.reject.title = "Add Comments";      
      this.$root.$emit("bv::show::modal", this.reject.id, button);
      this.tempComments(item.id);
    },
    resetreject() {
      this.reject.id = "";
      this.reject.title = "";
      this.reject.content = "";
    },

    nextPage(event) {
      this.paginate.limit = 2;
    },
  },
};
</script>

<style scoped>
.dropdown-menu-center {
  text-align: center;
    
}

svg {
  margin-right: 8px;
}

h3 {
  text-align: center;
  margin-top: 10px;
}

table,
th,
td {
  display: table;
  border: 1px solid black;
  border-collapse: collapse;
}
a {
  font-weight: bold;
}

.router-link-active {
  color: rgb(58, 55, 55) !important;
  background-color: #edf3f1;
  font-weight: 600;
}
.search2 {
  padding-left: 10px;
}
.actions1 {
  padding: 10px;
}
.router-link-active:hover {
  color: #fff !important;
  background-color: #5c5e5d;
  font-weight: 600;
}
.nwapp {
  padding: 10px;
}
.name-style {
  width: -webkit-fill-available;
  text-align: center;
  font-family: revert;
  letter-spacing: 2px;
  margin: 5px 0px;
  padding: 2px 0px;
  background-color: #606160;
  color: white;
}
.search1 {
  padding: 0 10px 0 10px;
  justify-content: center;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.responsive {
  border-radius: 10px;
  margin: 30px;
  width: auto;
}


table {
  text-align: center;
}
.text-space {
  padding-right: 0px;
}

body {
  background-color: rgb(211, 209, 209);
  font-family: sans-serif;
}
</style>