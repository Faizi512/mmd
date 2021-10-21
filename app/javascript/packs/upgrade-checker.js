import Common from "./common.js"

class UpgradeChecker extends Common {
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
    this.TogglePopUp()
    this.ToggleCheckBox()

    $('.carousel').carousel({
      interval: 2000
    })

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( "#quicksubmit" ).click(() => {
      $(".btn-success").addClass("in-progress")
      $('#dealform').parsley().whenValidate({
        group: 'block-0'
      }).done(() =>{
        CI.postData()
      })
    });

    $(document).on("click", '.open-form', function() {
      CI.phoneName = $(this).find('input').val()
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });
  }
  successUrl(){ }

  fillform(){
    this.getphoneNumber()
  }
  getphoneNumber(){
    var number = this.getUrlParameter("phone1") || this.getUrlParameter("mobile")
    if (number != undefined && number.length < 11) {
      number = '0' + number
      $(".telephone").val(number)
    }
    else{
      $(".telephone").val(this.getUrlParameter("phone1") || this.getUrlParameter("mobile") || "");
    }
  }
}
export default new UpgradeChecker();
