import Common from "./common.js"

class Home extends Common {
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
    this.subscribeChannel()
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
      $('.houseNumber').val($(this).find("option:selected").data("housenum"))
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

    $(document).on("click", '.open-form', function() {
      CI.phoneName = $(this).find('input').val()
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });
  }


  postData() {
    $("#loaderPopup").css('height', '100%')
    // doubel verify tsp
    this.validateTsp()
    // Getting Data
    var CI = this;
    var data = this.getData();
    // Form Submisson
    this.redirectIfNoResponse()
    this.handleCreditCheckConsent()
    this.submitLead(data, this.details.camp_id)

  }

  handleCreditCheckConsent(){
    if ( $('#credit-check').is(':checked') == true) {
      window.open('https://secure.uk.rspcdn.com/xprr/red/PID/2626/SID/'+this.getSid()+'?check=1'+ this.parmsforCreditReport(), "_blank");
    }
  }

}
export default new Home();
