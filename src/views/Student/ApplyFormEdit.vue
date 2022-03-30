<template>
<div v-bind:class="classObject" class="a">
    <div class="container-fluid">
      <router-link :to="{ name: 'student-dashboard' }">
           <b-button style="margin:1% 0 0 0;" variant="primary"><i class="fas fa-arrow-alt-circle-left"></i> Back </b-button>
      </router-link>
    <div class="d-sm-flex align-items-center justify-content-between mb-4" style="margin:1% 0 0 0;" >
        <h1 class="h3 mb-0 text-gray-800"> New Application </h1>
    </div>


      <div class="row">
        <div style="text-align: center" class="col-lg-12">
          <span style="color: black; font-size: 18px; font-weight: bold;">Employer Details</span>
        </div>
      <div>
      </div>
      </div>
      <!--<form-wizard @on-complete="onComplete" class="h-80" color="#17a2b8">
      <tab-content class="applyform" title="Student Created">-->
<b-form id="GFG" @submit.prevent="save">
<b-row class="row1">
        <b-form-group 
            id="employerName"
            label="Employer Name:"
            label-for="employerName"
            class="col-md-12">
            <b-form-input
              id="employerName1"
              class="form-control"
              v-model="form.employerName"
              type="text"
              required
              placeholder="">
            </b-form-input>
    </b-form-group>
</b-row>
<b-row class="row1">
        <b-form-group 
            id="primaryContactName"
            label="Primary Contact Name:"
            label-for="primaryContactName"
            class="col-md-12">
            <b-form-input
              id="primaryContactName1"
              class="form-control"
              v-model="form.primaryContactName"
              type="text"
              required
              placeholder="">
            </b-form-input>
        </b-form-group>
</b-row>
    <b-row class="row1">
        <b-form-group
            id="email"
            label="Employer Email:"
            label-for="email"
            class="col-md-6">
            <b-form-input
              id="email1"
              class="form-control"
              v-model="form.email"
              type="email"
              required
              placeholder="">
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="employerContact"
            label="Employer Phone:"
            label-for="employerContact"
            class="col-md-6">
            <b-form-input
              id="employerContact1"
              v-model="form.employerContact"
              type="tel"
              class="form-control"
              required
              placeholder="">
            </b-form-input>
        </b-form-group>
    </b-row>
    <br/>
    Employer Location:
    <br/>
    <br/>
    <b-row class="row1">
         <b-form-group
            id="addressLine1"
            label="Address Line 1:"
            label-for="addressLine1"
            class="col-md-12">
            <b-form-input
              id="addressLine11"
              v-model="form.addressLine1"
              type="text"
              class="form-control"
              required
              placeholder="1234 Main St">
            </b-form-input>
        </b-form-group>
    </b-row>

    <b-row class="row1">
        <b-form-group 
            id="addressLine2" 
            label="Address Line 2:" 
            label-for="addressLine2" 
            class="col-md-12">
            <b-form-input
              id="addressLine21"
              v-model="form.addressLine2"
              type="text"
              class="form-control"
              required
              placeholder="Apartment, Studio, or floor"
            ></b-form-input>
        </b-form-group>
    </b-row>
    <b-row class="row1">
        <b-form-group 
            id="city" 
            label="City:" 
            label-for="city" 
            class="col-md-5">
            <b-form-input
              id="city1"
              v-model="form.city"
              type="text"
              class="form-control"
              required
              placeholder="Enter City"
            ></b-form-input>
        </b-form-group>
        <b-form-group
            id="state"
            label="State:"
            label-for="state"
            class="col-md-4">
            <b-form-select
              id="state1"
              v-model="form.state"
              class="form-control"
              :options="options"
              required>
            </b-form-select>
        </b-form-group>

        <b-form-group
            id="zipCode"
            label="ZipCode:"
            label-for="zipCode"
            class="col-md-3">
            <b-form-input
              id="zipCode1"
              v-model="form.zipCode"
              type="text"
              class="form-control"
              required
              placeholder="Zip Code">
            </b-form-input>
        </b-form-group>
    </b-row>
    <b-row class="row1">
    <b-form-group
            id="satrtDate"
            label="Internship Start Date:"
            label-for="satrtDate"
            class="col-md-6">
            <b-form-input
              id="satrtDate1"
              v-model="form.satrtDate"
              type="date"
              class="form-control"
              required
              placeholder="">
            </b-form-input>
        </b-form-group>

        <b-form-group
            id="endDate"
            label="Internship End Date:"
            label-for="endDate"
            class="col-md-6">
            <b-form-input
              id="endDate1"
              v-model="form.endDate"
              type="date"
              class="form-control"
              required
              placeholder="">
            </b-form-input>
        </b-form-group>
    </b-row>
    <b-row class="row1">
    <b-form-group 
            id="filename"
            label="Offer Letter:"
            label-for="filename"
            class="col-md-12">
            <b-form-file
              id="filename1"
              class="mt-3"
              v-model="form.filename"
              plain
              required
              >
            </b-form-file>
       </b-form-group>
    </b-row>
    <div class="row">
        <div style="text-align: center" class="col-lg-12">
          <span style="color: black; font-size: 18px; font-weight: bold;">Instructor Details</span>
        </div>
      </div>
    <b-row class="row1">
        <b-form-group 
            id="facultyEmail" 
            label="Instructor Email:" 
            label-for="facultyEmail" 
            class="col-md-12">
            <b-form-input
              id="facultyEmail1"
              v-model="form.facultyEmail"
              type="email"
              class="form-control"
              required
              placeholder=""
            ></b-form-input>
        </b-form-group>
    </b-row>
    <b-row class="row1">
        <b-form-group
            id="firstName"
            label="Instructor First Name:"
            label-for="firstName"
            class="col-md-6">
            <b-form-input
              id="firstName1"
              v-model="form.firstName"
              class="form-control"
              required>
            </b-form-input>
        </b-form-group>
        <b-form-group
            id="lastName"
            label="Instructor Last Name:"
            label-for="lastName"
            class="col-md-6">
            <b-form-input
              id="lastName1"
              v-model="form.lastName"
              type="text"
              class="form-control"
              required
              placeholder="">
            </b-form-input>
        </b-form-group>
    </b-row>

    <div style="text-align: center; margin-top: 40px">
            <span class="step active"></span>
            <span class="step"></span>
            <span class="step"></span>
    </div>
        </b-form>
      <!--</tab-content>-->
           <div style="overflow:auto;">
      <div class="col-sm-12 col-lg-12 btn-center">

        <b-button type="submit" @click.prevent="save" class="slide-toggle btn btn-success mr-2" variant="success"
                ><svg data-v-409e23b7="" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="mr-1 svg-inline--fa fa-check-circle fa-w-16"><path data-v-409e23b7="" fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" class=""></path></svg>Save</b-button>

        <b-button type="button" @click.prevent="enable" variant="info" class="slide-toggle btn btn-success mr-2"><i class="fas fa-edit"></i>Edit</b-button>

        <b-button type="button"  @click.prevent="$router.push('/student-dashboard')"  class="btn btn-danger"> Cancel</b-button>
        
        
        
      </div>
    </div>
      
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
    function disable1() { 
            $("#GFG :input").prop("disabled", true);
        };
  
export default {
   
  data() {
    return {
          options: [
         { value: null, text: 'Select State' },
          {
    text: "Alabama",
    value: "AL"
  },
  {
    text: "Alaska",
    value: "AK"
  },
  {
    text: "American Samoa",
    value: "AS"
  },
  {
    text: "Arizona",
    value: "AZ"
  },
  {
    text: "Arkansas",
    value: "AR"
  },
  {
    text: "California",
    value: "CA"
  },
  {
    text: "Colorado",
    value: "CO"
  },
  {
    text: "Connecticut",
    value: "CT"
  },
  {
    text: "Delaware",
    value: "DE"
  },
  {
    text: "District Of Columbia",
    value: "DC"
  },
  {
    text: "Federated States Of Micronesia",
    value: "FM"
  },
  {
    text: "Florida",
    value: "FL"
  },
  {
    text: "Georgia",
    value: "GA"
  },
  {
    text: "Guam",
    value: "GU"
  },
  {
    text: "Hawaii",
    value: "HI"
  },
  {
    text: "Idaho",
    value: "ID"
  },
  {
    text: "Illinois",
    value: "IL"
  },
  {
    text: "Indiana",
    value: "IN"
  },
  {
    text: "Iowa",
    value: "IA"
  },
  {
    text: "Kansas",
    value: "KS"
  },
  {
    text: "Kentucky",
    value: "KY"
  },
  {
    text: "Louisiana",
    value: "LA"
  },
  {
    text: "Maine",
    value: "ME"
  },
  {
    text: "Marshall Islands",
    value: "MH"
  },
  {
    text: "Maryland",
    value: "MD"
  },
  {
    text: "Massachusetts",
    value: "MA"
  },
  {
    text: "Michigan",
    value: "MI"
  },
  {
    text: "Minnesota",
    value: "MN"
  },
  {
    text: "Mississippi",
    value: "MS"
  },
  {
    text: "Missouri",
    value: "MO"
  },
  {
    text: "Montana",
    value: "MT"
  },
  {
    text: "Nebraska",
    value: "NE"
  },
  {
    text: "Nevada",
    value: "NV"
  },
  {
    text: "New Hampshire",
    value: "NH"
  },
  {
    text: "New Jersey",
    value: "NJ"
  },
  {
    text: "New Mexico",
    value: "NM"
  },
  {
    text: "New York",
    value: "NY"
  },
  {
    text: "North Carolina",
    value: "NC"
  },
  {
    text: "North Dakota",
    value: "ND"
  },
  {
    text: "Northern Mariana Islands",
    value: "MP"
  },
  {
    text: "Ohio",
    value: "OH"
  },
  {
    text: "Oklahoma",
    value: "OK"
  },
  {
    text: "Oregon",
    value: "OR"
  },
  {
    text: "Palau",
    value: "PW"
  },
  {
    text: "Pennsylvania",
    value: "PA"
  },
  {
    text: "Puerto Rico",
    value: "PR"
  },
  {
    text: "Rhode Island",
    value: "RI"
  },
  {
    text: "South Carolina",
    value: "SC"
  },
  {
    text: "South Dakota",
    value: "SD"
  },
  {
    text: "Tennessee",
    value: "TN"
  },
  {
    text: "Texas",
    value: "TX"
  },
  {
    text: "Utah",
    value: "UT"
  },
  {
    text: "Vermont",
    value: "VT"
  },
  {
    text: "Virgin Islands",
    value: "VI"
  },
  {
    text: "Virginia",
    value: "VA"
  },
  {
    text: "Washington",
    value: "WA"
  },
  {
    text: "West Virginia",
    value: "WV"
  },
  {
    text: "Wisconsin",
    value: "WI"
  },
  {
    text: "Wyoming",
    value: "WY"
  }
        ],
      form: {
        employerName: "",
        primaryContactName: "",
        email:"",
        employerContact:"",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: null,
        zipCode: "",
        satrtDate:"",
        endDate:"",
        facultyEmail:"",
        firstName:"",
        lastName:"",
        filename:null,
      },
      file1: null,
      file2: null,
    };

    
  },

  async mounted() {
    this.loading = true;
    //await this.getMajorsData();
    //console.log("edit...",form.email);
    //await this.clicked();
  },
  methods:{
/**
       * @vuese
       * This methods is used to save the data. if any chages has made in the application like creating etc.
       */
  async save(){
    console.log("edited form data.....",this.form);
      await this.$axios.post("student/applicationdata", this.form)
         .then((response) => {
           console.log("edited form data.....",this.form);
          this.$root.$bvToast.toast(`Student Added successfully`, {
            title: `Student Created `,
            variant: "success",
            autoHideDelay: 5000,
          });
          this.$router.go(-1);
        })
        .catch((error) => {
          console.log("----", error.response.data);
        });
  },
  /*async disable() { 
            $("#GFG :input").prop("disabled", true);
        },*/
/**
       * @vuese
       * This is the method used to enable or disable according to the given input.
       */    
  async enable() { 
            $("#GFG :input").prop("disabled", false);
        },
/**
       * @vuese
       * This method gets the user details by using the user id and checks the response data and employer name in the internship..
       */
  async  clicked(){

      this.userId = this.$store.getters.userDetails.id;
      await this.$axios.get(`student/applications/${this.userId}`).then(
        (response) => {
          this.items = response.data;
          
          this.valuee=this.items[0].internship.employerName;

          disable1();
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

  }
};
</script>

<style scoped>
.a{
  background-color: #eee;
}
.applyform {
  align-content: center;
  justify-content: space-between;
  
  align-items: center;
}

.container-fluid {
  padding: 0 5% 5% 5%;
  width:80%;
  background-color:white ;
  
}
.row1{
  align-items: left;
  text-align: left;
  justify-content:space-between;
  width: 100%;
  flex-direction: row;
}
</style>