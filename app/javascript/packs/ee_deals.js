import Common from "./common.js"

class EEDealsAffordabilityChecker extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealsform');
    this.validate("#dealsform")
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()
    this.showTab(this.currentTab);

    $(document).on("click", '.btn-deal', function() {
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });

    $( "#btn-continue" ).click(() => {
      CI.nextStep(1)
    });

    $( "#btn-back" ).click(function() {
      CI.backStep(-1)
    });

  }
  successUrl(){}

  nextStep(n) {
    this.showCircle()
    var CI = this;
    $('#dealsform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + n;
      CI.showTab(CI.currentTab);
    })
  }
}
export default new EEDealsAffordabilityChecker();
