import Common from "./common.js"
class VoxiDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.popupTerms()
    this.showTab(this.currentTab);

    $('.carousel').carousel({
      interval: 2000
    })
    $( ".property" ).change(function() {
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
  fixStepIndicator(num) {
    var progress = document.getElementById('progressBar');
    if(num >= 0) {
      progress.style.width = (num*55)+"%";
      progress.innerText = "Progress " + (num*55) + "%";
      if( num ==  0){
        progress.innerText = '';
      }
    }
  }

  nextStep(n) {
    var CI = this;
    $('#dealform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      if (CI.currentTab >= tabs.length) {
        if (CI.isEmail == true){
          $('.but_loader').show()
          $('.nextStep').prop('disabled', true);
          CI.postData()
        }else{
          $('#dealform').parsley().validate()
        }
        return true
      }
      CI.showTab(CI.currentTab);
    })
  }
  urlSelection(){
    window.location = this.details.success_url
  }
}
export default new VoxiDeals();
