import Common from "./common.js"

class ExclusiveEEDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealsform');

    $('.btn-deal').click(function() {
      debugger
      CI.postData()
      window.location = CI.details.success_url+"?device="+ $(this).prev('input').val()
    });
  }
}
export default new ExclusiveEEDeals();
