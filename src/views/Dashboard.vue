<template>
<div >
   <Loader v-bind:spin="spin"></Loader>
    <b-container fluid>
      <b-row class="bg-white mt-3" v-if="!spin">
        
        <b-col sm="6" class="mb-3">
          <b-row>
            <b-col
              sm="6"
              v-for="item in Object.keys(dashboardCount)"
              :key="item"
            >
              <b-card
                :title="dashboardCount[item] ? dashboardCount[item] + '' : '0'"
                header-tag="header"
                class="mb-3 card-2"
              >
                <template v-slot:header>
                  <h6 class="mb-0 text-captilize">{{ item }}</h6>
                </template>
                <b-card-text v-if="item == 'programAccess'"
                  >Total user accessible programs</b-card-text
                >
                <b-card-text v-if="item == 'terms'"
                  >Total terms across all programs</b-card-text
                >
                <b-card-text v-if="item == 'courses'"
                  >Total courses in current program</b-card-text
                >
                <b-card-text v-if="item == 'students'"
                  >Total students in current program</b-card-text
                >
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col
          sm="6"
          :class="
            coursesStudentStat.data && coursesStudentStat.data.length
              ? ''
              : 'text-v-center'
          "
        >
        </b-col>
        <b-col sm="12" lg="12">
          <div class="row">
        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-primary shadow h-100 py-2" style=" border-left: 0.25rem solid #4e73df !important;">
                <div class="card-body" >
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Total Interns</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{totalInterns}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-user-tie fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Earnings (Monthly) Card Example -->
        <div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2" style="max-width: 540px;  border-left:0.25rem solid #1cc88a !important">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">In-State</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{inState}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-house-user fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<div class="col-xl-3 col-md-6 mb-4">
            <div class="card border-left-success shadow h-100 py-2" style="max-width: 540px;  border-left:0.25rem solid #f6c23e !important">
                <div class="card-body">
                    <div class="row no-gutters align-items-center">
                        <div class="col mr-2">
                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1" style="color:#f6c23e !important;">Out of State</div>
                            <div class="h5 mb-0 font-weight-bold text-gray-800">{{outState}}</div>
                        </div>
                        <div class="col-auto">
                            <i class="fas fa-plane fa-2x text-gray-300"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
         
          <div>
  
</div>
        </b-col>

      

      </b-row>
    </b-container>
<div>
     <div class="map-container">
    <l-map :center="[42.032974, -99.082029]" :zoom="3.5" style="height: 400px;" :options="mapOptions">
      <l-choropleth-layer :data="pyDepartmentsData" titleKey="regionName" idKey="regionId" :value="value" geojsonIdKey="STATE" :geojson="paraguayGeojson" :colorScale="colorScale" >
        <template slot-scope="props">
          <l-info-control :item="props.currentItem" :unit="props.unit" title="State" placeholder="Hover over a State"/>
          <l-reference-chart 
            title="Internships" 
            :colorScale="colorScale" 
            :min="props.min" 
            :max="props.max" 
            position="topright"/>
        </template>
      </l-choropleth-layer>
    </l-map>
  </div>
  
</div>
    

  </div>
</template>

<script>
//import AddAdmin from "../components/AddAdmin.vue";
//import Loader from "../components/Utils/Loader.vue";
import Vue from 'vue';
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth'
import paraguayGeojson from '../data/paraguay.json'
import { pyDepartmentsData } from '../data/py-departments-data'
import {LMap} from 'vue2-leaflet';

//import Map from '../components/Map2.vue';
export default {
  name: "Dashboard",
  components: {
    //Map,
    LMap,
     'l-info-control': InfoControl, 
    'l-reference-chart': ReferenceChart, 
    'l-choropleth-layer': ChoroplethLayer 
  },
  data() {
    return {
      totalInterns: null,
      inState: null,
      outState: null,
      allLocation:[],
      spin: true,
      userInfo: {},
      selectedStudentTerm: "Please select a term",
      studentTerms: [],
      stats: [],
      coordinators: [],
      dashboardCount: {},
      coursesStudentStat: {},
      resendDchdeuleB: false,
      sendScheduleB: false,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',

      bounds: null,
       pyDepartmentsData,
      paraguayGeojson,
      colorScale: ["#ADD8E6","#3895D3", "#1261A0"],
      value: {
        key: "density",
        metric: "Total Internships"
      },
      extraValues: [{
        key: "population",
        metric: "{% population}"
      }],
      mapOptions: {
        attributionControl: false
      },
      currentStrokeColor: '0000ff',
      strokeColor:'000000',
    };
  },
  

  async mounted() {   
    await this.getInternCount();
    await this.getInternsLocation();
  },

  created() {
    if (!localStorage.getItem("programId")) {
      this.$axios
        .get("coordinator/get/preferred/program")
        .then((response) => {
          localStorage.setItem("programId", response.data.id);
          localStorage.setItem("programName", response.data.programName);
          this.userInfo = JSON.parse(localStorage.getItem("user_details"));
          this.userInfo.programId = response.data.id;
          this.userInfo.programName = response.data.programName;
          this.getStatsAndCoordinator();
        })
        .catch((error) => {
          this.spin = false;
          this.error = error.response.data.message;
        });
    } else {
      this.userInfo = JSON.parse(localStorage.getItem("user_details"));
      this.userInfo.programId = localStorage.getItem("programId");
      this.userInfo.programName = localStorage.getItem("programName");
      this.getStatsAndCoordinator();
    }
  },
  methods: {
    async getInternsLocation() {
      await this.$axios.get(`student/locationReport`).then(
        (response) => {
          this.allLocation=response.data;
          for(var i = 0; i < this.allLocation.length; i++) 
          {    
            for(var j = 0; j < pyDepartmentsData.length; j++)    
            { 
              	if(pyDepartmentsData[j].regionName == this.allLocation[i].state)              
                {
                   pyDepartmentsData[j].density = this.allLocation[i].stateCount
                }   
                   
            }
          }    
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    async getInternCount() {
      await this.$axios.get(`student/locationReportCount`).then(
        (response) => {
          this.totalInterns = response.data.totalCount;
          this.inState = response.data.inState;
          this.outState = response.data.outState;
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    },
    //Get dashboard based on start term
    async getSelectedTermDashboard() {
      if (this.selectedStudentTerm == "Please select a term") {
        this.getStatsAndCoordinator();
        this.resendDchdeuleB = false;
        this.sendScheduleB = false;
      } else {
        await this.$axios
          .get(
            `program/get-dashboard-details/${this.userInfo.programId}?startTerm=${this.selectedStudentTerm}`
          )
          .then((response) => {
            this.stats = response.data;
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
        this.resendDchdeuleB = true;
        this.sendScheduleB = true;
      }
    },
    // get all coordinator
    async getCoordinatorForAdmin() {
      if (this.userInfo.role === "admin") {
        await this.$axios
          .get(`admin/get/all/programs/coordinator/20/1`)
          .then((response) => {
            this.coordinators = response.data.data;
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
      }
      this.getStudentTerms();
    },

    async getStudentTerms() {
      await this.$axios
        .get(`student/getStudentsTerms/${this.userInfo.programId}`)
        .then((response) => {
          this.studentTerms = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
      this.studentTerms.unshift({ startTerm: "Please select a term" });
    },

    async getMailCountForDashboard() {
      await this.$axios
        .get(`program/get-dashboard-details/${this.userInfo.programId}`)
        .then((response) => {
          this.stats = response.data;
        })
        .catch((error) => {
          this.error = error.response.data.message;
        });
    },

    async getStatsAndCoordinator() {
      await this.getCoordinatorForAdmin();
      await this.getMailCountForDashboard();
      // for both admin and coordinator
      await this.$axios
        .get(`program/get/programCourseStatistics/${this.userInfo.programId}`)
        .then((response) => {
          let stats = {
            labels: Object.keys(response.data),
            data: Object.values(response.data),
          };
          this.coursesStudentStat = stats;
          this.spin = false;
        })
        .catch((error) => {
          this.error = error.response.data.message;
          this.spin = false;
        });
    },
  },
};
</script>

<style scoped>
.count-style {
  font-size: 30px;
  font-weight: 600;
  color: #0979a5;
}

.text-v-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.b-table-sticky-header {
  overflow-y: auto;
  max-height: 450px;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: rgb(160 213 234);
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  color: black;
}
</style>