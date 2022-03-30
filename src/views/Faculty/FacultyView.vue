<template>
  <div style="overflow-x: hidden">
    <b-container fluid class="responsive" >
    <blockquote class="blockquote text-center">
      <b-col sm="12" lg="12">
    <h2 class="text-left mt-3">Welcome,{{user}}!</h2>
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

        <template #cell(actions)="row">
          <div style="padding:5px 10px 5px 10px;">
            <b-button block
              variant="success"
              size="sm"
              @click="comment(row.item, row.index, $event.target)"
              :disabled="!(row.item.applicationStatus == Pending)"
              class="mr-1"
              >{{ row.item.status }}
              Approve
            </b-button>

            <b-modal
              :id="row.item.applicationreferenceId"
              :title="comments.title"
              @ok="handleOk(row.item.applicationreferenceId)"
              @hide="resetcomments"
            >
              <b-row>
                <b-col
                  >
                  <a style="font-weight: bold;">Current Application Status: </a>{{currentStatus}}
                  <br />
                  <a style="font-weight: bold;">Older Comments</a>
                  <br />
                  <ul style="margin-left: 18px">
              <li v-for="(value, key) in commentsList" :key="key">
                {{ value.updated }}: {{ value.commentGiven }}
              </li>
            </ul></b-col
                >
                <br />
              </b-row>
              <b-row>
                <b-col>
                  <label for="exampleFormControlTextarea1" style="font-weight: bold;">Comments</label>
                  <textarea
                    name="comment"
                    class="form-control"
                    v-model="commentData.comments"
                    id="exampleFormControlTextarea1"
                    rows="3"
                  ></textarea></b-col
              ></b-row>
            </b-modal>
          </div>

          <div style="padding:5px 10px 5px 10px;">
            <b-button block
              variant="danger"
              size="sm"
              @click="rejectComment(row.item, row.index, $event.target)"
              :disabled="!(row.item.applicationStatus == Pending)"
              class="mr-1"
            >
              Reject
            </b-button>
            <b-modal
              :id="(row.item.applicationreferenceId).concat(`${row.item.applicationreferenceId.substring(0,2)}`)"
              :title="reject.title"
              @ok="handleOk(row.item.applicationreferenceId)"
              @hide="resetreject"
            >
              <b-row>
                <b-col
                  ><a style="font-weight: bold;">Current Application Status: </a>{{currentStatus}}
                  <br />
                  <a style="font-weight: bold;">Older Comments</a>
                  <br />
                  <ul style="margin-left: 18px">
              <li v-for="(value, key) in commentsList" :key="key">
                {{ value.updated }}: {{ value.commentGiven }}
              </li>
            </ul></b-col
                >
                <br />
              </b-row>
              <b-row>
                <b-col>
                  <label for="exampleFormControlTextarea1" style="font-weight: bold;">Comments</label>
                  <textarea
                    name="comment"
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    v-model="commentData.comments"
                    rows="3"
                  ></textarea></b-col
              ></b-row>
            </b-modal>
          </div>
        </template>

        <template #cell(modify)="row">
          <div style="padding:5px 10px 5px 10px;">
          <b-button block
            variant="primary"
            size="md"
            @click="addComments(row.item, row.index, $event.target)"
            :disabled="!(row.item.applicationStatus == Pending)"
            class="mr-1"
          >
            Add Comments
          </b-button>
          <b-modal
        :id="(row.item.applicationreferenceId).concat(`${row.item.applicationreferenceId.substring(0,3)}`)"
        :title="modify.title"
        @ok="handleOk(row.item.applicationreferenceId)"
        @hide="resetmodify"
      >
        <b-row>
          <b-col
            ><a style="font-weight: bold;">Current Application Status: </a>{{currentStatus}}
            <br />
            <a style="font-weight: bold;">Older Comments</a>
            <br>
            <ul style="margin-left: 18px">
              <li v-for="(value, key) in commentsList" :key="key">
                {{ value.updated }}: {{ value.commentGiven }}
              </li>
            </ul></b-col
          >
          <br />
        </b-row>
        <b-row>
          <b-col>
            <label for="exampleFormControlTextarea1" style="font-weight: bold;">Comments</label>
            <textarea
              name="comment"
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="commentData.comments"
              rows="3"
            ></textarea></b-col
        ></b-row>
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
            <div 
            style="width: fit-content;"><b-button block
            style="padding:5px 10px 5px 10px;"
            variant="primary"
            size="md"
            @click="downloadPDF(details.maindata.applicationId)"
            class="mr-1">
              Download Resume
            </b-button></div>
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
        { key: "modify", label: "Modify" },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 3,
      pageOptions: [1,3,4],
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
      comments: {
        id: "",
        title: "",
        content: "",
      },
      reject: {
        id: "",
        title: "",
        content: "",
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
        comments: "",
      },
      commentsList: [],
    };
  },

  async mounted() {
    this.loading = true;
    await this.getApplicationData();
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

    resultQuery() {
      if (this.selectedValue) {
        return this.sampleData.filter((item) => {
          return this.selectedValue
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.name.toLowerCase().includes(v) ||
                item.major.toLowerCase().includes(v)
            );
        });
      } else {
        return this.sampleData;
      }
    },
    rows() {
      return this.sampleData.length;
    },
  },
  methods:{
    /**
     * @vuese
     * This methods is used to get application
     */
    async getApplicationData() {
      this.userId = this.$store.getters.userDetails.id;
      await this.$axios.get(`applications/${this.userId}`).then(
        (response) => {
          this.items = response.data;
          this.items.forEach((value,index)=>{
             this.items[index].applicationDate = moment(String(value.applicationDate)).format('DD MMMM YYYY'),
             this.items[index].startDate = moment(String(value.startDate)).format('DD MMMM YYYY')
           });
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    async downloadPDF(id){
      let tempId = id
      await this.$axios({
        method:'get',
        url:`application/${tempId}`,
        responseType:'arraybuffer'
        })
        .then(function(response) {
          let blob = new Blob([response.data], { type:   'application/pdf' } );
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${tempId}_Resume.pdf`;
          link.click();
        });
    },

    async getComments(id) {
      await this.$axios.get(`student/comments/${id}`).then(
        (response) => {
          this.commentData.applicationId = null;
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
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    handleOk: function (id) {
      console.log("ok in model ",this.commentData.comments);
      if (this.commentData.comments.length==0) {
        
        this.comments.id = null;
        this.reject.id = null;
        this.$root.$bvToast.toast(`Please add a valid comment`, {
          variant: "danger",
          autoHideDelay: 5000,
        });
        
      } else {
        if (this.comments.id == id) {
          this.status = { applicationStatus: "Approved" };
        } else if (this.reject.id == id+id.substring(0,2)) {
          this.status = { applicationStatus: "Rejected" };
        } else {
          this.status = { applicationStatus: "Pending" };
        }
        this.$axios
          .patch(
            `update-applications-status/${this.commentData.applicationId}`,
            this.status
          )
          .then(
            (response) => {
              this.comments.id = null;
              this.reject.id = null;
              this.status = { applicationStatus: null };
              this.getApplicationData();
            },
            (err) => {
              this.comments.id = null;
              this.reject.id = null;
              console.log("----", err);
            }
          );

        this.$axios
          .post("student/comments", this.commentData)
          .then((response) => {
            this.$root.$bvToast.toast(`Comment Added successfully`, {
              variant: "success",
              autoHideDelay: 5000,
            });
            //this.$router.go(-1);
            this.commentData.comments = "";
            this.commentData.applicationId = null;
          })
          .catch((error) => {
            console.log("----", error.response.data);
          });
      }
      this.commentData.comments = "";
    },

    info(item, index, button) {
      this.details.title = "Application Details";
      this.commentsList = [];
      if (item) {
        this.commentData.applicationId = item.id;
        this.getComments(this.commentData.applicationId);
        this.details.content = item.users[0]; 
        this.details.employee = item.internship;
        this.details.maindata = {
          applicationDate: moment(String(item.applicationDate)).format('MMMM DD YYYY'),
          applicationId: item.applicationreferenceId,
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
          let tempList = response.data;
          this.currentStatus = tempList[0].applicationStatus;
          for (var i = 0; i < tempList.length; i++) {
            for (var j = 0; j < tempList[i].comments.length; j++) {
              this.obj = {
                updated: moment(String(tempList[i].comments[j].updated_at)).format('DD MMMM YYYY'),
                commentGiven: tempList[i].comments[j].comments,
              };
              this.commentsList.push(this.obj); 
            }
          }
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    addComments(item, index, button) {
      this.modify.id = item.applicationreferenceId+item.applicationreferenceId.substring(0,3);
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
      if (item) {
        this.commentData.applicationId = item.id;        
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