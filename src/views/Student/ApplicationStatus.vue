<template>
  <div style="overflow-x: hidden, height: -webkit-fill-available;">
    <b-container fluid class="responsive">
                 <b-row class="bg-white mt-3">
    
        
    <blockquote class="blockquote text-center">
      <b-col sm="12" lg="12">
    <h2 class="text-left mt-3">Welcome,{{user}}!</h2>
      </b-col>
    </blockquote>
    <b-col>
          <router-link :to="{ name: 'applyform' }">
            <b-button class="float-right btn-nw nwapp">
              <font-awesome-icon icon="plus-square" class="mr-1" />New Application
            </b-button>
          </router-link>
          <router-link :to="{ name: 'personal-info' }">
            <b-button class="float-right btn-nw mr-2 nwapp">
              <font-awesome-icon icon="user-edit" class="mr-1" />Personal Information
            </b-button>
          </router-link>
    </b-col>

        <b-col sm="12" lg="12">
          <h4 class="text-left mt-3">
            Submitted Applications
          </h4>  
          <br>
        </b-col>
    </b-row>
      <b-col sm="2" md="2" class="my-1">

      </b-col>
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

        <b-col md="3"></b-col>
        <b-col md="3"></b-col>

        <b-col md="4" class="my-1">
          <b-input-group size="sm">
            <div class="input-group-prepend ">
              <span class="input-group-text search1" id="inputGroup-sizing-default">
                <font-awesome-icon icon="search" style="margin-right:0px;" />
              </span>
            </div>
            <b-form-input id="input-default filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search" class="search2"
              ></b-form-input>

          </b-input-group>
        </b-col>
      </b-row>

                <!--<b-col md="4" class="my-1" v-if="items.length>0">
            <b-input-group >
              <div class="input-group-prepend ">
              <span class="input-group-text search1" id="inputGroup-sizing-default">
                <font-awesome-icon icon="search" style="margin-right:0px;" />
              </span>
            </div>
              <b-form-input id="input-default filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search" class="search2"
              ></b-form-input>

            </b-input-group>
        </b-col>-->
      <b-table
        
        :items="items"
        :fields="fields"
        :bordered="true"
        :filter="filter"
        :current-page="currentPage"
        :per-page="perPage"
        :filter-included-fields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        stacked="md"
        show-empty
        small
        @filtered="onFiltered"
      >
        <template #cell(internship)="row">
                <b-col  size="sm" style="padding:0% 0% 0% 0%;"  class="mr-1">
        {{ row.value.employerName }}
      </b-col>  
        </template>

        <template #cell(student_details)="row">
          <b-col size="sm" class="mr-1">
            {{ row.value.majorId }}
          </b-col>
        </template>

        <template #cell(id)="row">
          <b-link
            style="color: blue"
            href=""
            @click="info(row.item, row.index, $event.target)"
            size="sm"
            class="mr-1"
          >

            {{ row.item.id }}
          </b-link>
        </template>

        <template #cell(actions)="row">
                  <div style="padding:5px 10px 5px 10px;">
        <b-button block
        variant="primary" 
        @click="info(row.item, row.index, $event.target)"  
        
        class="mr-1">
          Details
        </b-button>

        <b-button 
            block
            variant="primary"
            class="mr-1"
            @click.prevent="editapplication(row.item)"
            :disabled="!(row.item.applicationStatus==Rejected)"
          >
            Edit
      </b-button>
        </div>
        </template>
      </b-table>
      <b-row>
        <b-col sm="6" md="9"></b-col>
        <b-col sm="6" md="3" class="my-1">
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

      <!-- Info modal -->
      <b-modal
        v-b-modal.detail-view
        :id="details.id"
        :title="details.title"
        ok-only
        @hide="resetdetails"
      >
        <b-row>
          <b-col>
            <a>Student Name: </a>
            <span
              >{{ details.content.firstname }}
              {{ details.content.lastname }}</span
            >
            <br />
            
            <a>Personal Email : </a><span>{{ details.content.email }}</span>
            <br /> 
            <br />
            <a>Employer Name: </a>{{ details.employee.employerName }} 
            <br />
            <a>Point of Contact: </a>{{ details.employee.primaryContactName }}
            <br />
            <a>Employee Email: </a>{{ details.employee.email }}
            <br />
            <a>Employee Phone Number: </a>{{ details.maindata.employerContact }}
            <br />
            <a>Employer Address: </a>{{ details.employee.addressLine1 }}
            {{ details.employee.addressLine2 }}
            <br />
            <br />
            <a>Application Date: </a>{{ details.maindata.applicationDate|formatDate("date") }}
            <br />
            <a>Start Date: </a>{{ details.maindata.startDate |formatDate("date")}}
            <br />
            <a>End Date: </a>{{ details.maindata.endDate | formatDate("date") }}
            <br />
            <a>Status: </a>{{ details.maindata.status }}
            <br />
            <br />
            <a>Comments:</a>
            <ul style="margin-left: 18px">
              <li v-for="(value, key) in commentsList" :key="key">
                {{ value.updated }}: {{ value.commentGiven }}
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-modal>

      <b-modal
        :id="comments.id"
        :title="comments.title"
        @ok="handleOk"
        @hide="resetcomments"
      >
        <b-row>
          <b-col
            >Current Application Status: Approved
            <br />
            Older Comments</b-col
          >
          <br />
        </b-row>
        <b-row>
          <b-col>
            <label for="exampleFormControlTextarea1">Comments</label>
            <textarea
              name="comment"
              class="form-control"
              v-model="commentData.comments"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea></b-col
        ></b-row>
      </b-modal>

      <b-modal
        :id="reject.id"
        :title="reject.title"
        @ok="handleOk"
        @hide="resetreject"
      >
        <b-row>
          <b-col
            >Do you want to edit your entry?
            <br />
            </b-col
          >
          <br />
        </b-row>
        <b-row>
          <b-col>
            <label for="exampleFormControlTextarea1">Comments</label>
            <textarea
              name="comment"
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="commentData.comments"
              rows="3"
            ></textarea></b-col
        ></b-row>
      </b-modal>

      <!--<b-modal
        :id="modify.id"
        :title="modify.title"
        @ok="handleOk"
        @hide="resetmodify"
      >
        <b-row>
          <b-col
            >Current Application Status: Pending
            <br />
            Older Comments</b-col
          >
          <br />
        </b-row>
        <b-row>
          <b-col>
            <label for="exampleFormControlTextarea1">Comments</label>
            <textarea
              name="comment"
              class="form-control"
              id="exampleFormControlTextarea1"
              v-model="commentData.comments"
              rows="3"
            ></textarea></b-col
        ></b-row>
      </b-modal>-->
      
    </b-container>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import image from "@/assets/NoDataFound.png";
import moment from 'moment';
export default {
  name: "FacultyView",
  components: {
    
  },
  data() {
    return {
      user: this.$store.getters.userDetails.firstname,
      items: [],
      Rejected: "Pending",
      Approved:"Approved",
      status: {},
      NoDataFoundImage : image,
      fields: [
        //{ key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        {
          key: "internship",
          label: "Employer Name",
          sortable: true,
          sortDirection: "desc",
        },

        {
          key: "startDate",
          label: "Employment Start Date",
          sortable: true,
          class: "text-center",
        },
                {
          key: "endDate",
          label: "Employment End Date",
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
        //{ key: "modify", label: "Modify" },
        { key: "actions", label: "Actions" },
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 3,
      pageOptions: [1,2,3],
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
        id: null,
        title: "",
        content: "",
      },
      reject: {
        id: null,
        title: "",
        content: "",
      },
            modify: {
        id: null,
        title: "",
        content: "",
      },
      selectedValue: "",
      commentData: {
        applicationId: null,
        comments: null,
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

  methods: {
/**
       * @vuese
       * This methods edit the application by taking the id as an input.
       */
    editapplication(id){
      this.$router.push({ name: "applyform", params: { id: id} });
    },
/**
       * @vuese
       * This method get the application data by using the userId details.
       */
    async getApplicationData() {
      this.userId = this.$store.getters.userDetails.id;
      await this.$axios.get(`/student/applications/${this.userId}`).then(
        (response) => {
          this.items = response.data;
          
          this.items.forEach((value,index)=>{
            this.items[index].applicationDate = moment(String(value.applicationDate)).format('DD MMMM YYYY'),
             this.items[index].endDate = moment(String(value.endDate)).format('DD MMMM YYYY'),
             this.items[index].startDate = moment(String(value.startDate)).format('DD MMMM YYYY')
           });
        },
        (err) => {
          console.log("----", err);
        }
      );
    },
/**
       * @vuese
       * This methods get the comments by using the studentID.
       */
    async getComments(id) {
      await this.$axios.get(`student/comments/${id}`).then(
        (response) => {
          this.commentData.applicationId = null;
          let tempList = response.data;
          for (var i = 0; i < tempList.length; i++) {
            for (var j = 0; j < tempList[i].comments.length; j++) {
              this.obj = {
                updated: tempList[i].comments[j].updated_at,
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
/**
       * @vuese
       * This is a function used to handleOk for adding the comments when reject or using the axios by using the this method.
       */
    handleOk: function () {
      if (this.commentData.comments == null) {
        this.comments.id = null;
        this.reject.id = null;
        this.$root.$bvToast.toast(`Please add a valid comment`, {
          variant: "danger",
          autoHideDelay: 5000,
        });
      } else {
        if (this.comments.id == "comments-modal") {
          this.status = { applicationStatus: "Approved" };
        } else if (this.reject.id == "reject-modal") {
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
            this.commentData.comments = null;
            this.commentData.applicationId = null;
          })
          .catch((error) => {
            console.log("----", error.response.data);
          });
      }
    },
/**
       * @vuese
       * This methods where you will have all the Information regarding the item, index and button by passing filteredItems gets the resetmodify, resetdetails.
       */
    info(item, index, button) {
      this.details.title = "Application Details";
      this.commentsList = [];
      if (item) {
        this.commentData.applicationId = item.id;
        this.getComments(this.commentData.applicationId);
        this.details.content = item.users[0]; //JSON.stringify(item, null, 2)
        this.details.employee = item.internship;
        this.details.maindata = {
            employerContact: item.internship.employerContact,
            applicationDate: item.applicationDate,
            status: item.applicationStatus,
            startDate: item.startDate,
            endDate: item.endDate,
          };
      }
      else {
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
    addComments(item, index, button) {
      this.modify.id = "modify-modal";
      if (item) {   
        this.commentData.applicationId = item.id;
      }
      this.modify.title = "Add Comments";
      this.$root.$emit("bv::show::modal", this.modify.id, button);
    },
    resetmodify() {
      this.modify.id = null;
      this.modify.title = "";
      this.modify.content = "";
    },
/**
       * @vuese
       * This methods comments using the item, index and button refering the commentData and resetcomments.
       */
    comment(item, index, button) {
      this.comments.id = "comments-modal";
      if (item) {   
        this.commentData.applicationId = item.id;
      }
      this.comments.title = "Add Comments";
      this.$root.$emit("bv::show::modal", this.comments.id, button);
    },
    resetcomments() {
      this.comments.id = null;
      this.comments.title = "";
      this.comments.content = "";
    },
/**
       * @vuese
       * This method is used to comment when the application is Rejected and resetreject using the item, index and button.
       */
    rejectComment(item, index, button) {
      if (item) {
        this.reject.id = "reject-modal";
        this.commentData.applicationId = item.id;
      }
      this.reject.title = "Add Comments";
      this.$root.$emit("bv::show::modal", this.reject.id, button);
    },
    resetreject() {
      this.reject.id = null;
      this.reject.title = "";
      this.reject.content = "";
    },
/**
       * @vuese
       * This method is used to go to the nextPage by passing the event as the parameter.
       */
    nextPage(event) {
      this.paginate.limit = 2;
    },
  },
};
</script>

<style scoped>
.search2{
  padding-left: 10px;
}
.nwapp{
  padding: 10px;
}
svg {
  margin-right: 8px;
}

h3 {
  text-align: center;
  margin-top: 10px;
}

a {
  font-weight: bold;
}

table,
th,
td {
  display: table;
  border: 1px solid black;
  border-collapse: collapse;
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