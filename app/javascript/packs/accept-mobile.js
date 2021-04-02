import Common from "./common.js"

class AcceptMobile extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()
    this.showTab(this.currentTab);
    $('.carousel').carousel({
      interval: 2000
    })
    $( ".property" ).change(function() {
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + 1;
      CI.showTab(CI.currentTab);
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
      $('.houseNumber').val($(this).find("option:selected").data("house-number"))
      $('.street2').val($(this).find("option:selected").data("street2"))
      $('.building').val($(this).find("option:selected").data("building"))
    });

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( "#btn-continue" ).click(() => {
      CI.nextStep(1)
    });

    $( "#btn-back" ).click(function() {
      CI.backStep(-1)
    });

    $(document).on("click", '.open-form', function(event) {
      var user = localStorage.getItem("user_data")
      if (this.dataset.productId) {
        CI.productId = this.dataset.productId
        console.log( CI.productId)
      }
      if (user != null) {
        CI.postData()
        event.stopPropagation()
      } else {
        CI.phoneName = $(this).find('input').val()
        $('#deal-form-modal').modal('show')
        $('.clock').hide()
        event.stopPropagation()
      }
    });
  }

  postData() {
    var CI = this
    $("#loaderPopup").css('height', '100%')
    this.validateTsp()
    this.redirectIfNoResponse()
    this.successUrl()
    if( this.getItemFromStorage("user_data") != null){
      this.userStorage = true
      this.USTransaction();
      this.updateUserInStorage()
      this.submitLead(this.getItemFromStorage("user_data"), this.details.camp_id)
    }
    else{
      var data = this.getData();
      CI.setItemToStorage("user_data", data)
      console.log("Postdata: "+new Date())
      this.submitLead(data, this.details.camp_id)
      this.submitAccpedLead(formData)
    }
  }

  successUrl(){}

}
export default new AcceptMobile();
