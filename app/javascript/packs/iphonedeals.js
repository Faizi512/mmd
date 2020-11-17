import Common from "./common.js"

class IphoneDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()


    $( ".btn-deal-iphone" ).click(() => {
      $('#dealform').parsley().whenValidate({
          group: 'block-0'
      }).done(function() {
          CI.postData()
      })
    });
  }
}
export default new IphoneDeals();
