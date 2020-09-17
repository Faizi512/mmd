import Common from "./common.js"

class ExclusiveTribeDeals extends Common {
  constructor() {
    super();
    var CI = this;
    var i = 0;
    this.getFormDetails('#tribedealform');

    $('.btn-deal').click(function() {
      CI.postData()
      window.location = CI.details.success_url+"?device="+ $(this).prev('input').val()
    });
  }

  successUrl(){}
}

export default new ExclusiveTribeDeals();
