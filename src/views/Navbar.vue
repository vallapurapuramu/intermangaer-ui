<template>
<div>
    <nav>
      <b-nav vertical>
        <div class="name-style">
          <h5>Internship Management</h5>
        </div>
        <router-link :to="{ name: 'dashboard' }" class="border">
          <font-awesome-icon icon="tachometer-alt" />Dashboard
        </router-link>  
        <a class="dropdown">
              <b-navbar toggleable >
          <b-navbar-brand href="#"> 
          <font-awesome-icon icon="print"/>Report
          <b-navbar-toggle target="navbar-toggle-collapse" >
            <template #default="{ expanded }">
              <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
              <b-icon v-else icon="chevron-bar-down"></b-icon>
            </template>
          </b-navbar-toggle>
        </b-navbar-brand>
          <b-collapse id="navbar-toggle-collapse"  is-nav>
            <b-navbar-nav center  class="px-sm-4" style="text-align:center !important;">
              <b-nav-item href="#">
                  <download-excel 
                  :data="summary"
                  :name="filenameS" type="csv">
                    <button type="button" class="btn btn-Link strong"><i class="fa fa-list-alt" aria-hidden="true"></i>Summary Report</button>
                  </download-excel>
              </b-nav-item>
              <b-nav-item href="#">
                <download-excel :data="majorList"
                :name="filenameM" type="csv">
                    <button type="button" class="btn btn-Link strong"><i class="fas fa-user-graduate"></i>Major Report</button>
                </download-excel>
              </b-nav-item>
              <b-nav-item>
                <download-excel :data="locationList"
                :name="filenameL" type="csv">
                    <button type="button" class="btn btn-Link strong"><i class="fas fa-map-marker-alt"></i>Location Report</button>
                </download-excel>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
        </a>

        <a class="dropdown">
          <b-navbar toggleable >
            <b-navbar-brand href="#"> 
              <font-awesome-icon icon="print"/>Custom Report
              <b-navbar-toggle target="navbar-toggle1-collapse" >
                <template #default="{ expanded }">
                  <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                  <b-icon v-else icon="chevron-bar-down"></b-icon>
                </template>
              </b-navbar-toggle>
            </b-navbar-brand> 

            <b-collapse id="navbar-toggle1-collapse"  is-nav>
                <div class="customContainer">
                  <div class="left-align flex">Start <input type="date" id="start" name="trip-start" v-model="startBoundary"></div>
                  <div class="left-align flex">End <input type="date" id="start" name="trip-start" v-model="endBoundary" :min="startBoundary"></div>
                  <download-excel :fetch="filterApplications" :name="filenameF" type="csv">
                    <b-button type="button" class="btn btn-Link strong" style="padding: 5px 5px 5px; margin:10px 0px 0px">Download Report</b-button>
                  </download-excel>
                </div>
            </b-collapse>
          </b-navbar>
        </a>
        <router-link :to="{ name: 'applications' }" class="border">
         <font-awesome-icon icon="print"/>Applications
        </router-link>  
      </b-nav>
    </nav>
  </div>  
</template>

<script>
import Vue from 'vue'
import JsonExcel from "vue-json-excel";
import VueNoty from 'vuejs-noty'
import 'vuejs-noty/dist/vuejs-noty.css'


Vue.component("downloadExcel", JsonExcel);
Vue.use(VueNoty)

// Helper-function to unwrap child-component-wrapper
    function unwrap(wrapper) {
        // place childNodes in document fragment
        var docFrag = document.createDocumentFragment();
        while (wrapper.firstChild) {
            var child = wrapper.removeChild(wrapper.firstChild);
            docFrag.appendChild(child);
        }

        // replace wrapper with document fragment
        wrapper.parentNode.replaceChild(docFrag, wrapper);
    }

export default {
  name: "Navbar",
  components: {
  },
  // ...
    data () {
    return {
      filenameS:"SummaryReport.csv",
      filenameM:"MajorReport.csv",
      filenameL: "LocationReport.csv",
      filenameF: "CustomReport.csv",
      startBoundary: null,
      endBoundary:null,
      majorList:[],
      locationList:[],
      sumObj:{},
      summary:[],
      filteredApplications:[],
      LocationList:[
        {
          Location: "Colden Hall",
          Room: "CH3500"
        },
        {
          Location: "Colden Hall",
          Room: "CH3600"
        },
        {
          Location: "Library",
          Room: "112"
        }
      ],
      faqs: [
        {
          question: "Who is the best Superhero?",
          answer: "I'm not sure but we love him 3000",
          open: false
        },
        {
          question: "What is Goku's form called with White Hair?",
          answer: "Mastered Ultra Instinct",
          open: false
        },
        {
          question: "Have you liked & subscried yet?",
          answer: "YES",
          open: false
        }
      ]
    }
  },

  async mounted() {
    this.loading = true;
    await this.getAllApplications();
    await this.getMajors();
    await this.getLocationReport();
  },

  methods: {
    /**
     * @vuese
     * This methods gets all the applications with student and employer details
     */

    async getAllApplications() {
      await this.$axios.get(`applications`).then(
        (response) => {
          this.items = response.data
          let dates = []
          for(var i =0; i< this.items.length;i++){
            this.temp = this.items[i].users[0];
            this.tempEmp = this.items[i].internship;
            this.tempStd = this.items[i].student_details;
            this.sumObj = {
              Student_Id : this.temp.id,
              LastName : this.temp.lastname,
              FirstName : this.temp.firstname,
              Term_Code : "need data",
              Instr_LastName: "null",
              Instr_FirstName: "null",
              Employer_Name: this.tempEmp.employerName,
              Employer_Location: "null",
              Employer_Street1: this.tempEmp.addressLine1,
              Employer_Street2: this.tempEmp.addressLine2,
              Employer_City: this.tempEmp.city,
              Emploer_State: this.tempEmp.state,
              Employer_Country: "null",
              Employer_ZipCode: this.tempEmp.zipCode,
              Employer_Contact: this.tempEmp.employerContact,
              Employer_Email: this.tempEmp.email,
              Intern_Contact: this.tempStd.contact,
              Contact_Name: this.tempEmp.primaryContactName,
              Start_Date : this.items[i].startDate,
              End_Date: this.items[i].endDate,
              Std_Sign: "null",
              std_signed_date : "null",
              Faculty_Signed_Date: "null",
              Student_AddressLine1: this.tempStd.addressLine1,
              Student_AddressLine2: this.tempStd.addressLine2,
              Student_City: this.tempStd.city,
              Student_State: this.tempStd.state,
              Student_ZipCode: this.tempStd.zipCode,
              Student_Country: "null",
              Student_Contact: this.tempStd.contact,
              Student_Comments:"Need clarity on this column",
              Faculty_Comments: "null",
              Course_Number: "null",
              Course_Description: this.tempStd.majorId,
              Activity_Date: "null",
              Created_Date: this.items[i].applicationDate,
              Status: this.items[i].applicationStatus,
              Permissions: "null",
              Email_Address: this.temp.email,
            };  
            this.summary.push(this.sumObj);  
            // Get list of dates to find beggining of first application and end of last application
            dates.push(new Date(this.items[i].applicationDate))
          }
          this.startBoundary = new Date(Math.min(...dates)).toISOString().slice(0, 10);
          this.endBoundary =  new Date(Math.max(...dates)).toISOString().slice(0, 10);

        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    filterApplications(){
      let formatedStart = this.startBoundary + " 00:00"
      let formatedEnd = this.endBoundary + " 00:00"
      let startBoundary = new Date(formatedStart)
      let endBoundary = new Date(formatedEnd)
      let result = []
      for (let application of this.summary){
        let applicationDate = new Date(application.Created_Date)
        if (applicationDate >= startBoundary && applicationDate <= endBoundary){
          result.push(application)
        }
      }
      if (result.length == 0){
        this.$noty.error("NO APPLICATIONS WERE FOUND ON THOSE DATES")
      }
      return result
    },

    buttonDisabled(){
      return (this.startBoundary == null || this.endBoundary == null)
    },

    async getLocationReport() {
      await this.$axios.get(`student/locationReport`).then(
        (response) => {
          this.locationList = response.data;
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

  async getMajors() {
      //this.userInfo = JSON.parse(localStorage.getItem("user_details"));
      await this.$axios.get(`student/majorReport`).then(
        (response) => {
          this.items = response.data;
          for(var i =0; i< this.items.length;i++){
            let obj = {
              Name: this.items[i].majorName,
              Count: this.items[i].majorCount
            }
            this.majorList.push(obj);
          }
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    toggleOpen: function (index) {
      this.faqs = this.faqs.map((faq, i) => {
        if (index === i) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }
        return faq;
      });
    }
  }
   
    
}

</script>


<style scoped>
.strong{
  font-style:italic;
}
svg {
  margin-right: 8px;
}
.dropdown{
   color: #555 !important;
  text-align: left;
  padding-left: 0;
  padding-top: 5px;
  padding-bottom: 5px;
}

a {
  color: #555 !important;
  font-weight: 600;
  text-align: left;
  padding-left: 35px;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 16px;
}

.flex {
  padding:5px 0px;
  display:flex;
  flex-direction: column;
}

.customContainer{
  padding-left:20px;
}

a:hover {
  color: #333 !important;
  background-color: #ccc;
  font-weight: 600;
}

.router-link-active {
  color: #fff !important;
  /* background-color: #888; */
  background-color: #006747;
  font-weight: 600;
}

.router-link-active:hover {
  color: #fff !important;
  background-color: #006747;
  font-weight: 600;
}

.name-style{
  text-align: center;
  font-family: revert;
  letter-spacing: 2px;
  margin: 5px 0px;
  padding: 2px 0px;
  background-color: #006747;
  color: white;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}
body {
	background-color: #EEE;
	font-family: sans-serif;
}
header {
  background-color: #3c3c3c;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
}
header h1 {
  color: #EEE;
  font-size: 28px;
  font-weight: 300;
  text-transform: uppercase;
}
header h1 span {
  color: #56E3B8;
  font-weight: 900;
}
.faq {
  display: block;
  width: 100%;
  max-width: 768px;
  margin: 15px auto;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  background-color: #FFF;
}
.faq .question {
  position: relative;
  color: #3c3c3c;
  font-size: 20px;
  transition: all 0.4s linear;
}

.faq.open .question {
  margin-bottom: 15px;
}
.faq.open .question::after {
  transform: translateY(-50%) rotate(90deg);
}
.faq .answer {
  color: #3c3c3c;
  font-size: 18px;
  opacity: 0;
  max-height: 0px;
  overflow-y: hidden;
  transition: all 0.4s ease-out;
}
.faq.open .answer {
  opacity: 1;
  max-height: 1000px;
}</style>