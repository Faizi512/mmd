import Common from "./common.js"

class ReturningLoans extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showClock()
    this.showTab(this.currentTab);
    this.openPopup()
    this.popupTerms()
    this.popupPrivacy()
    this.continueButton()
    this.TogglePopUp()
    this.ToggleCheckBox()
  }


  openPopup(){
    var CI = this;
    $('.open-form').click(function(event) {
      event.preventDefault()
      $('#deal-form-modal').modal('show')
    });
  }

  continueButton(){
    var CI = this;
    $('.form-submit').click(function () {
      $('#dealform').parsley().whenValidate({
          group: 'block-2'
      }).done(function() {
        if (CI.submtForm == false) {
          CI.submtForm = true;
          event.preventDefault();
          $('.form-submit').prop('disabled', true);
          CI.postData()
        }
      })
    })
  }
}
export default new ReturningLoans();
