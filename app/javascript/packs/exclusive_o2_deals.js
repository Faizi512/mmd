import Common from "./common.js"

class ExclusiveO2Deals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealsform');

    $('.btn-deal').click(function() {
      CI.postData()
      window.location = CI.details.success_url+"?device="+ $(this).prev('input').val()
    });
  }
  successUrl(){}
}
export default new ExclusiveO2Deals();
