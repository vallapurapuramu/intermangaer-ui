<template>
  <div class="a">
    <div class="container-fluid">
      <div
        class="d-sm-flex align-items-center justify-content-between mb-4"
        style="margin: 1% 0 0 0"
      >
        <h1 class="h3 mb-0 text-gray-800">New Application</h1>
      </div>

      <div class="row">
        <div style="text-align: center" class="col-lg-12">
          <span style="color: black; font-size: 18px; font-weight: bold"
            >Employer Details</span
          >
        </div>
        <div></div>
      </div>

      <form id="detailsForm" @submit.prevent="save">
        <b-row class="row1">
          <b-form-group
            id="employerName"
            label="Employer Name:"
            label-for="employerName"
            class="col-md-12"
          >
            <b-form-input
              id="employerName1"
              class="form-control"
              v-model="form.employerName"
              type="text"
              required
              placeholder=""
            >
            </b-form-input>
            <div v-if="msg.employerName">
              <span class="text-danger">{{ msg.employerName }}</span>
            </div>
          </b-form-group>
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="primaryContactName"
            label="Primary Contact Name:"
            label-for="primaryContactName"
            class="col-md-12"
          >
            <b-form-input
              id="primaryContactName1"
              class="form-control"
              v-model="form.primaryContactName"
              type="text"
              required
              placeholder=""
            >
            </b-form-input>
            <div v-if="msg.contact">
              <span class="text-danger">{{ msg.contact }}</span>
            </div>
          </b-form-group>
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="email"
            label="Employer Email:"
            label-for="email"
            class="col-md-6"
          >
            <b-form-input
              id="email1"
              class="form-control"
              v-model="form.email"
              type="email"
              required
              placeholder=""
            >
            </b-form-input>
            <div v-if="msg.email">
              <span class="text-danger">{{ msg.email }}</span>
            </div>
          </b-form-group>
          <b-form-group
            id="employerContact"
            label="Employer Phone:"
            label-for="employerContact"
            class="col-md-6"
          >
            <b-form-input
              id="employerContact1"
              v-model="form.employerContact"
              type="tel"
              class="form-control"
              required
              maxlength="14"
              placeholder=""
              @input="acceptNumber"
            >
            </b-form-input>
            <div v-if="msg.mobile">
              <span class="text-danger">{{ msg.mobile }}</span>
            </div>
          </b-form-group>
        </b-row>
        <br />
        Employer Location:
        <br />
        <br />
        <b-row class="row1">
          <b-form-group
            id="addressLine1"
            label="Address Line 1:"
            label-for="addressLine1"
            class="col-md-12"
          >
            <b-form-input
              id="addressLine11"
              v-model="form.addressLine1"
              type="text"
              class="form-control"
              required
              placeholder="1234 Main St"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = '1234 Main St'"
            >
            </b-form-input>
            <div v-if="msg.address">
              <span class="text-danger">{{ msg.address }}</span>
            </div>
          </b-form-group>
        </b-row>

        <b-row class="row1">
          <b-form-group
            id="addressLine2"
            label="Address Line 2:"
            label-for="addressLine2"
            class="col-md-12"
          >
            <b-form-input
              id="addressLine21"
              v-model="form.addressLine2"
              type="text"
              class="form-control"
              required
              placeholder="Address Line2 (Optional)"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Address Line2 (Optional)'"
            ></b-form-input>
          </b-form-group>
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="city"
            label="City:"
            label-for="city"
            class="col-md-5"
          >
            <b-form-input
              id="city1"
              v-model="form.city"
              type="text"
              class="form-control"
              required
              placeholder="Enter City"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Enter City'"
            ></b-form-input>
            <div v-if="msg.city">
              <span class="text-danger">{{ msg.city }}</span>
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
              v-model="form.state"
              class="form-control"
              :options="options"
              required
            >
            </b-form-select>
            <div v-if="msg.state">
              <span class="text-danger">{{ msg.state }}</span>
            </div>
          </b-form-group>

          <b-form-group
            id="zipCode"
            label="ZipCode:"
            label-for="zipCode"
            class="col-md-3"
          >
            <b-form-input
              id="zipCode1"
              v-model="form.zipCode"
              type="text"
              class="form-control"
              required
              placeholder="Zip Code"
              onfocus="this.placeholder = ''"
              onblur="this.placeholder = 'Zip Code'"
            >
            </b-form-input>
            <div v-if="msg.zipCode">
              <span class="text-danger">{{ msg.zipCode }}</span>
            </div>
          </b-form-group>
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="startDate"
            label="Internship Start Date:"
            label-for="startDate"
            class="col-md-6"
          >
            <b-form-input
              id="startDate1"
              v-model="form.startDate"
              type="date"
              class="form-control"
              required
              placeholder=""
            >
            </b-form-input>
            <div v-if="msg.startDate">
              <span class="text-danger">{{ msg.startDate }}</span>
            </div>
          </b-form-group>

          <b-form-group
            id="endDate"
            label="Internship End Date:"
            label-for="endDate"
            class="col-md-6"
          >
            <b-form-input
              id="endDate1"
              v-model="form.endDate"
              type="date"
              class="form-control"
              required
              placeholder=""
            >
            </b-form-input>
            <div v-if="msg.endDate">
              <span class="text-danger">{{ msg.endDate }}</span>
            </div>
          </b-form-group>
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="offerLetter"
            v-model="form.offerLetter"
            label="Offer Letter:"
            label-for="offerLetter"
            class="col-md-12"
          >
            <!-- <b-form-file id="file" class="mt-3" ref="file" @change="handleFileUpload()" plain
              required></b-form-file> -->
            <input
              type="file"
              id="file1"
              name="file1"
              ref="file1"
              class="border"
              v-on:change="handleFileUpload()"
            />
            <div v-if="msg.offerLetter">
                <span class="text-danger">{{ msg.offerLetter }}</span>
              </div>
          </b-form-group>
        </b-row>
        <div class="row">
          <div style="text-align: center" class="col-lg-12">
            <span style="color: black; font-size: 18px; font-weight: bold"
              >Instructor Details</span
            >
          </div>
        </div>
        <b-row class="row1">
          <b-col class="col-md-8" style="padding: initial">
            <b-form-group
              id="facultyEmail"
              label="Instructor Email:"
              label-for="facultyEmail"
              class="col-md-12"
            >
              <b-form-input
                id="facultyEmail1"
                v-model="form.facultyEmail"
                type="email"
                class="form-control"
                required
                placeholder=""
              >
              </b-form-input>
              <div v-if="msg.fEmail">
                <span class="text-danger">{{ msg.fEmail }}</span>
              </div>
            </b-form-group>
          </b-col>
          <b-col class="col-md-4" style="margin-top: 30px"
            ><span>
              <b-button variant="primary" @click="getInstructorDetails()"
                >Search</b-button
              ></span
            ></b-col
          >
        </b-row>
        <b-row class="row1">
          <b-form-group
            id="firstName"
            label="Instructor First Name:"
            label-for="firstName"
            class="col-md-6"
          >
            <b-form-input
              id="firstName1"
              v-model="form.firstName"
              class="form-control"
              required
              :disabled="true"
            >
            </b-form-input>
          </b-form-group>
          <b-form-group
            id="lastName"
            label="Instructor Last Name:"
            label-for="lastName"
            class="col-md-6"
          >
            <b-form-input
              id="lastName1"
              v-model="form.lastName"
              type="text"
              class="form-control"
              required
              :disabled="true"
            >
            </b-form-input>
          </b-form-group>
        </b-row>

        <div style="text-align: center; margin-top: 40px">
          <span class="step active"></span>
          <span class="step"></span>
          <span class="step"></span>
        </div>
      </form>
      <!--</tab-content>-->
      <div style="overflow: auto">
        <div class="col-sm-12 col-lg-12 btn-center">
          <b-button
            type="submit"
            @click.prevent="check"
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
            >Submit
          </b-button>

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
import moment from "moment";

function disable1() {
  $("#GFG :input").prop("disabled", true);
}

export default {
  data() {
    return {
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
      msg: {
        employerName: null,
        contact: null,
        email: null,
        mobile: null,
        address: null,
        city: null,
        state: null,
        zipCode: null,
        startDate: null,
        endDate: null,
        fEmail: null,
        offerLetter: null,
      },
      form: {
        studentId: this.$store.getters.userDetails.id,
        firstName: null,
        lastName: null,
        applicationStatus: "Pending",
        addressLine2: null,
      },
      file1: null,
      file2: null,
      editFormObj: this.$route.params.id,
      personalData: [],
    };
  },

  async mounted() {
    this.loading = true;
    await this.getPersonalInfo();
    if (this.editFormObj != null) {
      this.editform();
    }
  },

  methods: {
    handleFileUpload() {
      this.form.offerLetter = this.$refs.file1.files[0];
    },
    editform() {
      console.log("edit form obj...", this.editFormObj);
      if (this.editFormObj.facultyId) {
        this.$axios.get(`/verifyfaculty/${this.editFormObj.facultyId}`).then(
          (response) => {
            //console.log("faculty details...",response);
            this.form.facultyEmail = response.data[0].email;
            this.form.firstName = response.data[0].firstname;
            this.form.lastName = response.data[0].lastname;
            this.form.facultyId = response.data[0].id;
            console.log("lastname.... ", response.data[0].email);
          },
          (err) => {
            console.log("----", err);
          }
        );
      }
      this.form.offerLetter = this.form.offerLetter;
      this.form.employerName = this.editFormObj.internship.employerName;
      this.form.primaryContactName =
        this.editFormObj.internship.primaryContactName;
      this.form.email = this.editFormObj.internship.email;
      this.form.employerContact = this.editFormObj.internship.employerContact;
      this.form.addressLine1 = this.editFormObj.internship.addressLine1;
      this.form.addressLine2 = this.editFormObj.internship.addressLine2;
      this.form.city = this.editFormObj.internship.city;
      this.form.state = this.editFormObj.internship.state;
      this.form.zipCode = this.editFormObj.internship.zipCode;
      this.form.startDate = moment(String(this.editFormObj.startDate)).format(
        "yyyy-MM-DD"
      );
      this.form.endDate = moment(String(this.editFormObj.endDate)).format(
        "yyyy-MM-DD"
      );

      
    },

    check() {
      if (this.editFormObj != null) {
        if (this.form.offerLetter!=null) {
          var formData1 = new FormData();
          formData1.append("offerletter", this.form.offerLetter);
          formData1.append("addressLine1", this.form.addressLine1);
          formData1.append("addressLine2", this.form.addressLine2);
          formData1.append("applicationStatus", this.form.applicationStatus);
          formData1.append("city", this.form.city);
          formData1.append("email", this.form.email);
          formData1.append("employerContact", this.form.employerContact);
          formData1.append("firstName", this.form.firstName);
          formData1.append("endDate", this.form.endDate);
          formData1.append("facultyId", this.form.facultyId);
          formData1.append("studentId", this.form.studentId);
          formData1.append("zipCode", this.form.zipCode);
          formData1.append("state", this.form.state);
          formData1.append("primaryContactName", this.form.primaryContactName);
          formData1.append("startDate", this.form.startDate);
          formData1.append("employerName", this.form.employerName);
          this.$axios
            .patch(
              `student/updateapplicationdata/${this.editFormObj.id}`,
              formData1, {
              header: {
                "Content-Type": "multipart/form-data",
              },
              }
            )
            .then((response) => {
              console.log(response);
              this.$router.go(-1);
            })
            .catch((error) => {
              console.log("----", error.response.data);
            });
        }else{
          this.msg.offerLetter="Please attach the offer letter"
        }
      } else {
        this.save();
      }
    },

    acceptNumber() {
      var x = this.form.employerContact
        .replace(/\D/g, "")
        .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
      this.form.employerContact = !x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
    },

    async getPersonalInfo() {
      this.userId = this.$store.getters.userDetails.id;
      await this.$axios.get(`student/personalDetails/${this.userId}`).then(
        (response) => {
          this.personalData = response.data[0].student_details;
          if (this.personalData == null) {
            this.$router.push({ name: "personal-info" });
            alert("Please fill personal information form");
          }
        },
        (err) => {
          console.log("----", err);
        }
      );
    },

    async getInstructorDetails() {
      this.msg.fEmail = null;
      this.form.firstName = null;
      this.form.lastName = null;
      await this.$axios
        .post(`faculty/addFaculty/${this.form.facultyEmail}`)
        .then((response) => {
          if (response.error) {
            this.msg.fEmail = "Invalid email address";
          } else {
            this.form.facultyId = response.data.id;
            this.form.firstName = response.data.firstname;
            this.form.lastName = response.data.lastname;
          }
        })
        .catch((error) => {
          this.msg.fEmail = "Invalid email address";
          console.log("----", error.response.data);
        });
    },

    async save() {
      console.log("farm data edit save....", this.form);
      this.msg = {};
      if (
        this.form.employerName &&
        this.form.primaryContactName &&
        this.form.email &&
        this.form.employerContact &&
        this.form.addressLine1 &&
        this.form.city &&
        this.form.state &&
        this.form.zipCode &&
        this.form.startDate &&
        this.form.endDate &&
        this.form.facultyEmail
      ) {
        var date1 = moment(String(this.form.startDate)).format("yyyy-MM-DD");
        var date2 = moment(String(this.form.endDate)).format("yyyy-MM-DD");
        if (moment(date1).isBefore(date2)) {
          var formData = new FormData();
          formData.append("offerletter", this.form.offerLetter);
          formData.append("addressLine1", this.form.addressLine1);
          formData.append("addressLine2", this.form.addressLine2);
          formData.append("applicationStatus", this.form.applicationStatus);
          formData.append("city", this.form.city);
          formData.append("email", this.form.email);
          formData.append("employerContact", this.form.employerContact);
          formData.append("firstName", this.form.firstName);
          formData.append("endDate", this.form.endDate);
          formData.append("facultyId", this.form.facultyId);
          formData.append("studentId", this.form.studentId);
          formData.append("zipCode", this.form.zipCode);
          formData.append("state", this.form.state);
          formData.append("primaryContactName", this.form.primaryContactName);
          formData.append("startDate", this.form.startDate);
          formData.append("employerName", this.form.employerName);

          await this.$axios
            .post("student/applicationdata", formData, {
              header: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              this.$root.$bvToast.toast(`Application Submitted successfully`, {
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
          alert("Start date cannot be greater than end date");
        }
      } else {
        if (this.form.employerName == null) {
          this.msg.employerName = "Please provide the Employer Name";
        }
        if (this.form.primaryContactName == null) {
          this.msg.contact = "Please provide the primary contact";
        }
        if (this.form.email == null) {
          this.msg.email = "Please provide the email";
        }
        if (this.form.employerContact == null) {
          this.msg.mobile = "Please provide the employer contact number";
        }
        if (this.form.addressLine1 == null) {
          this.msg.address = "Please provide the address";
        }
        if (this.form.city == null) {
          this.msg.city = "Please provide the city";
        }
        if (this.form.state == null) {
          this.msg.state = "Please provide the state";
        }
        if (this.form.zipCode == null) {
          this.msg.zipCode = "Please provide the zipCode";
        }
        if (this.form.startDate == null) {
          this.msg.startDate = "Please provide the employement start date";
        }
        if (this.form.endDate == null) {
          this.msg.endDate = "Please provide the employement end date";
        }
        if (this.form.facultyEmail == null) {
          this.msg.fEmail = "Please provide the faculty email address";
        }
      }
    },

    async enable() {
      $("#GFG :input").prop("disabled", false);
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