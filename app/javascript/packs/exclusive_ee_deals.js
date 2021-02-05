import Common from "./common.js"

class ExclusiveEEDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealsform');

    $('.btn-deal').click(function() {
      CI.postData()
      CI.device = $(this).prev('input').val()
    });
  }
  successUrl(){
    var CI = this;
     setTimeout(function(){
        window.location = CI.details.success_url + "?device=" + CI.device
    }, 1000)
  }
}
export default new ExclusiveEEDeals();
