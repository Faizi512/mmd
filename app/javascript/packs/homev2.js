import Common from "./commonv2.js"

class HomeV2 extends Common {
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
      CI.TogglePopUp()
      CI.ToggleCheckBox()
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

    $(document).on("click", '.continue-check', function(event) {
      CI.postData()
      event.stopPropagation()
    });

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( "#btn-continue" ).click(() => {
      debugger
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
      // if (user != null) {
        // CI.phoneName = $(this).find('input').val()
        // let checkboxes = $('.custom-checkbox')
        // checkboxes.each((box) => {
        //   if (checkboxes[box].id !== 'mobile-accept-button'){
        //     $(checkboxes[box]).remove();
        //   }
        // })

        // $('#short-form-modal').modal('show')
        // // $(".tab")[4].style.display = "block"
        // $('.clock').hide()
        // event.stopPropagation()
        // // CI.fixStepIndicator(3)
        // // CI.ToggleCheckBox()
        // CI.nextStep(1)
        // CI.nextStep(1)
        // CI.nextStep(1)
        // CI.nextStep(1)
        // // CI.postData()
        // // event.stopPropagation()
      // } else {
        CI.phoneName = $(this).find('input').val()
        $('#deal-form-modal').modal('show')
        $('.clock').hide()
        event.stopPropagation()
      // }
    });
  }

  successUrl(){}

}
export default new HomeV2();
