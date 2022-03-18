<template>
  <div class="a">
    <div class="container-fluid">
      <div
        class="d-sm-flex align-items-center justify-content-between mb-4"
        style="padding: 1% 0 0 0%"
      ></div>

      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Personal Information</h1>
      </div>

      <form id="GFG" @submit.prevent="save">
        <b-row class="row1">
          <b-form-group
            id="contact"
            label="Contact Number:"
            label-for="contact"
            class="col-md-6"
          >
            <b-form-input
              id="contact1"
              class="form-control"
              v-model="form.contact"
              type="text"
              maxlength="14"
              required
              :disabled="active == true"
              placeholder="123-456-7890"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '123-456-7890'"
              @input="acceptNumber"
            >
            </b-form-input>
            <div v-if="msg.msgContact">
              <span class="text-danger">{{ msg.msgContact }}</span>
            </div>
          </b-form-group>

       <!--    <b-form-group
            id="catId"
            label="Category:"
            label-for="catId"
            class="col-md-4"
          >
            <b-form-select
              
              :disabled="active == true"
              v-model="form.category"
              type="text"
              class="form-control"
              @change = getMajorsData()
              :options="catList"
            >
            </b-form-select>
           <div v-if="msg.msgmajor">
              <span class="text-danger">{{ msg.msgmajor }}</span>
            </div>
          </b-form-group>-->

          <b-form-group
            id="majorId"
            label="MajorId:"
            label-for="majorId"
            class="col-md-6"
          >
            <b-form-select
              id="majorId1"
              :disabled="active == true"
              v-model="form.majorId"
              type="text"
              class="form-control"
              :options="majorsList"
            >
            </b-form-select>
            <div v-if="msg.msgmajor">
              <span class="text-danger">{{ msg.msgmajor }}</span>
            </div>
          </b-form-group>
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="addressLine1"
            label="AddressLine1:"
            label-for="addressLine1"
            class="col-md-6"
          >
            <b-form-input
              id="addressLine11"
              class="form-control"
              :disabled="active == true"
              v-model="form.addressLine1"
              type="text"
              required
              placeholder="1121 N College Dr"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '1121 N College Dr'"
            >
            </b-form-input>
            <div v-if="msg.msgaddress">
              <span class="text-danger">{{ msg.msgaddress }}</span>
            </div>
          </b-form-group>
          <b-form-group
            id="addressLine2"
            label="AddressLine2:"
            label-for="addressLine2"
            class="col-md-6"
          >
            <b-form-input
              id="addressLine21"
              v-model="form.addressLine2"
              type="text"
              :disabled="active == true"
              class="form-control"
              placeholder="Address Line 2(Optional)"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '#Address Line 2(Optional)'"
            >
            </b-form-input>
          </b-form-group>
        </b-row>

        <b-row class="row1">
          <b-form-group
            id="city"
            label="City:"
            label-for="city"
            class="col-md-4"
          >
            <b-form-input
              id="city1"
              v-model="form.city"
              type="text"
              :disabled="active == true"
              class="form-control"
              required
              placeholder="Maryville"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Maryville'"
            ></b-form-input>
            <div v-if="msg.msgcity">
              <span class="text-danger">{{ msg.msgcity }}</span>
            </div>
          </b-form-group>

          <b-form-group
            id="state"
            label="State:"
            label-for="state"
            class="col-md-4"
          >
            <b-form-select
              id="state1"
              :disabled="active == true"
              v-model="form.state"
              class="form-control"
              :options="options"
              required
            >
            </b-form-select>
            <div v-if="msg.msgstate">
              <span class="text-danger">{{ msg.msgstate }}</span>
            </div>
          </b-form-group>

          <b-form-group
            id="zipCode"
            label="ZipCode:"
            label-for="zipCode"
            class="col-md-4"
          >
            <b-form-input
              id="zipCode1"
              v-model="form.zipCode"
              type="text"
              :disabled="active == true"
              class="form-control"
              required
              value=""
              placeholder="64468"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '64468'"
            >
            </b-form-input>
            <div v-if="msg.msgzipcode">
              <span class="text-danger">{{ msg.msgzipcode }}</span>
            </div>
          </b-form-group>
        </b-row>

        <div style="text-align: center; margin-top: 40px">
          <span class="step active"></span>
          <span class="step"></span>
          <span class="step"></span>
        </div>
      </form>
      <div style="overflow: auto">
        <div class="col-sm-12 col-lg-12 btn-center">
          <b-button
            type="submit"
            @click.prevent="save"
            class="slide-toggle btn btn-success mr-2"
            variant="success"
            ><svg
              data-v-409e23b7=""
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="check-circle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              class="mr-1 svg-inline--fa fa-check-circle fa-w-16"
            >
              <path
                data-v-409e23b7=""
                fill="currentColor"
                d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                class=""
              ></path></svg
            >Save</b-button
          >
          <b-button
            type="button"
            @click.prevent="enable"
            variant="info"
            class="slide-toggle btn btn-success mr-2"
            ><i class="fas fa-edit"></i>Edit</b-button
          >

          <b-button
            type="button"
            @click.prevent="$router.push('/student-dashboard')"
            class="btn btn-danger"
          >
            Cancel</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      active: false,
      majors: {},
      majorsList: [{ value: null, text: "Select Major" }],
      catList:[{value:null, text: "Select Category"},
      {value:"Grad", text:"Graduate"},
      {value:"UnderGrad", text:"Under Graduate"}],
      valuee: {},
      msg: {
        msgContact: null,
        msgmajor: null,
        msgaddress: null,
        msgcity: null,
        msgstate: null,
        msgzipcode: null,
      },
      options: [
        { value: null, text: "Select State" },
        {
          text: "Alabama",
          value: "Alabama",
        },
        {
          text: "Alaska",
          value: "Alaska",
        },
        {
          text: "American Samoa",
          value: "American Samoa",
        },
        {
          text: "Arizona",
          value: "Arizona",
        },
        {
          text: "Arkansas",
          value: "Arkansas",
        },
        {
          text: "California",
          value: "California",
        },
        {
          text: "Colorado",
          value: "Colorado",
        },
        {
          text: "Connecticut",
          value: "Connecticut",
        },
        {
          text: "Delaware",
          value: "Delaware",
        },
        {
          text: "District Of Columbia",
          value: "District Of Columbia",
        },
        {
          text: "Federated States Of Micronesia",
          value: "Federated States Of Micronesia",
        },
        {
          text: "Florida",
          value: "Florida",
        },
        {
          text: "Georgia",
          value: "Georgia",
        },
        {
          text: "Guam",
          value: "Guam",
        },
        {
          text: "Hawaii",
          value: "Hawaii",
        },
        {
          text: "Idaho",
          value: "Idaho",
        },
        {
          text: "Illinois",
          value: "Illinois",
        },
        {
          text: "Indiana",
          value: "Indiana",
        },
        {
          text: "Iowa",
          value: "Iowa",
        },
        {
          text: "Kansas",
          value: "Kansas",
        },
        {
          text: "Kentucky",
          value: "Kentucky",
        },
        {
          text: "Louisiana",
          value: "Louisiana",
        },
        {
          text: "Maine",
          value: "Maine",
        },
        {
          text: "Marshall Islands",
          value: "Marshall Islands",
        },
        {
          text: "Maryland",
          value: "Maryland",
        },
        {
          text: "Massachusetts",
          value: "Massachusetts",
        },
        {
          text: "Michigan",
          value: "Michigan",
        },
        {
          text: "Minnesota",
          value: "Minnesota",
        },
        {
          text: "Mississippi",
          value: "Mississippi",
        },
        {
          text: "Missouri",
          value: "Missouri",
        },
        {
          text: "Montana",
          value: "Montana",
        },
        {
          text: "Nebraska",
          value: "Nebraska",
        },
        {
          text: "Nevada",
          value: "Nevada",
        },
        {
          text: "New Hampshire",
          value: "New Hampshire",
        },
        {
          text: "New Jersey",
          value: "New Jersey",
        },
        {
          text: "New Mexico",
          value: "New Mexico",
        },
        {
          text: "New York",
          value: "New York",
        },
        {
          text: "North Carolina",
          value: "North Carolina",
        },
        {
          text: "North Dakota",
          value: "North Dakota",
        },
        {
          text: "Northern Mariana Islands",
          value: "Northern Mariana Islands",
        },
        {
          text: "Ohio",
          value: "Ohio",
        },
        {
          text: "Oklahoma",
          value: "Oklahoma",
        },
        {
          text: "Oregon",
          value: "Oregon",
        },
        {
          text: "Palau",
          value: "Palau",
        },
        {
          text: "Pennsylvania",
          value: "Pennsylvania",
        },
        {
          text: "Puerto Rico",
          value: "Puerto Rico",
        },
        {
          text: "Rhode Island",
          value: "Rhode Island",
        },
        {
          text: "South Carolina",
          value: "South Carolina",
        },
        {
          text: "South Dakota",
          value: "South Dakota",
        },
        {
          text: "Tennessee",
          value: "Tennessee",
        },
        {
          text: "Texas",
          value: "Texas",
        },
        {
          text: "Utah",
          value: "Utah",
        },
        {
          text: "Vermont",
          value: "Vermont",
        },
        {
          text: "Virgin Islands",
          value: "Virgin Islands",
        },
        {
          text: "Virginia",
          value: "Virginia",
        },
        {
          text: "Washington",
          value: "Washington",
        },
        {
          text: "West Virginia",
          value: "West Virginia",
        },
        {
          text: "Wisconsin",
          value: "Wisconsin",
        },
        {
          text: "Wyoming",
          value: "Wyoming",
        },
      ],
      form: {
        studentId: this.$store.getters.userDetails.id,
        
      },
    };
  },
  async mounted() {
    this.loading = true;
    this.active = false;
      await this.getMajorsData();
    await this.getApplicationDetails();
  },

  computed:{
    
  },

  methods: {
    acceptNumber() {
      var x = this.form.contact
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.form.contact = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },

    async getApplicationDetails() {
      this.userId = this.$store.getters.userDetails.id;
      await this.$axios.get(`student/personalDetails/${this.userId}`).then(
        (response) => {
          if (response.data[0].student_details != null) {
            this.form = response.data[0].student_details;
            this.active = true;
          } else {
            this.active = false;
          }
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    async enable() {
      $("#GFG :input").prop("disabled", false);
    },

    async edit() {
      await this.$axios
        .patch("student/update-student-detils/:", this.form)
        .then((response) => {
          this.$root.$bvToast.toast(`Student updated successfully`, {
            title: `Student updated `,
            variant: "success",
            autoHideDelay: 5000,
          });
          this.$router.go(-1);
          console.log("----", response.data);
        })
        .catch((error) => {
          console.log("----", error.response.data);
        });
    },

    async getMajorsData() {  
      await this.$axios.get(`majors`).then(
        (response) => {
          for (var i = 0; i < response.data.length; i++) {
            this.majors = {
              text: response.data[i].majorName,
              value: response.data[i].major_Id,
            };
            this.majorsList.push(this.majors);
          }
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    async save(){
      this.msg={};
      let userdetails=JSON.parse(localStorage.getItem("user_details"));
      console.log(userdetails,"=======");
      console.log(this.form);
      if (
        this.form.contact != null &&
        this.form.majorId &&
        this.form.addressLine1 &&
        this.form.city &&
        this.form.state &&
        this.form.zipCode
      ) {
        this.$axios
          .post("student/studentdata", this.form)
          .then((response) => {
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
      } else {
        if (this.form.contact == null || this.form.contact == "") {
          this.msg.msgContact = "Please provide contact information";
        }
        if (this.form.majorId == null) {
          this.msg.msgmajor = "Please provide majors";
        }
        if (!this.form.addressLine1) {
          this.msg.msgaddress = "Please provide address";
        }
        if (this.form.city == null) {
          this.msg.msgcity = "Please provide City";
        }
        if (this.form.state == null) {
          this.msg.msgstate = "Please provide state";
        }
        if (this.form.zipCode == null) {
          this.msg.msgzipcode = "Please provide ZipCode";
        }
      }
    },
  },
};
</script>

<style scoped>
.a {
  background-color: #eee;
}
.applyform {
  align-content: center;
  justify-content: space-between;

  align-items: center;
}

.container-fluid {
  padding: 0 5% 5% 5%;
  width: 80%;
  background-color: white;
}
.row1 {
  align-items: left;
  text-align: left;
  justify-content: space-between;
  width: 100%;
  flex-direction: row;
}
</style>