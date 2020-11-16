import Common from "./common.js"

class IphoneDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.fillform()
    this.popupTerms()
    this.popupPrivacy()


    $( ".btn-deal-iphone" ).click(() => {
      debugger
      $('#dealform').parsley().validate()
    });
  }
}
export default new IphoneDeals();
