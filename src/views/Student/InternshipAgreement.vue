<template>
  <div>
    <b-modal
      size="xl"
      ref="modal-scrollable"
      id="modal-scoped"
      scrollable
      title="Internship Policies And Procedures"
      :ok-disabled="!user.accept"
      hide-footer
    >
      <p>
        Please read the Agreement carefully. To confirm your understanding and
        acceptance of the Agreement, click on the checkbox and select
        <strong>“I agree”</strong> button to continue.
        <br />
        <br />

        Students need an edge to stand out in today’s competitive job market.
        Internships help students bridge the gap between the college classroom
        and the world of work. Students gain valuable work experience that
        enhances their education. In addition, they bring back to the classroom
        insights gained from first-hand experience in the daily world of work.
        <br />
        <br />

        The length of internships varies. Starting and ending dates are
        determined by the student and sponsor. Responsibilities and duties
        assigned to the intern should be similar to those encountered by a
        professional employee. As a basic rule one hour of credit requires at
        least fifty hours of work time. The internship is a learning experience
        and should provide challenges to the student.
        <br />
        <br />
      </p>
      <div class="container" @ok="handleSubmit">
        <form @submit.prevent="handleSubmit">
          <div class="form-group form-check">
            <input
              type="checkbox"
              v-model="user.accept"
              id="accept"
              class="form-check-input"
              @click="grant('acknowledge')"
            />
            <p class="form-check-label" for="accept">
              I have read and agree to the
              <!-- <a href="/imapi/api/students/InternshipPolicy.pdf" download
                >Terms and Conditions</a
              > -->
              <a href="#" @click="downloadPDF">Terms and Conditions</a>
            </p>
          </div>
          <b-button
            variant="success"
            id="acknowledge"
            @click="allowAccess()"
            style="display: none; position: absolute; right: 30px"
          >
            I Agree
          </b-button>
          <br />
          <br />
        </form>
      </div>
      <template> </template>
    </b-modal>
  </div>
</template>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      user: {
        accept: false,
      },
    };
  },
  mounted() {
    this.showModal();
  },
  methods: {
    grant(divId) {
      $("#" + divId).toggle();
    },

    async downloadPDF(){
      let tempId = "InternshipPolicy.pdf"
      await this.$axios({
        method:'get',
        url:`students/${tempId}`,
        responseType:'arraybuffer'
        })
        .then(function(response) {
          let blob = new Blob([response.data], { type:   'application/pdf' } );
          let link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = `${tempId}`;
          link.click();
        });
    },

    allowAccess() {
      this.stdObj = {studentId:this.$store.getters.userDetails.id}
      this.$axios.patch(
        `student/updateInternshipAgreement/`,this.stdObj);

     this.$store.dispatch("updateIsAgreement").then( (response) =>{
      this.$router.push({ name: "student-dashboard"});
     });
      
    },
    showModal() {
      this.$refs["modal-scrollable"].show();
    },
    handleSubmit() {
      if (user.accept == false) {
        alert("Please agree to the terms and conditions to proceed");
      }
    },
  },
};
</script>