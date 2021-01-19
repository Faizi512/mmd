import Common from "./common.js"

class LoanDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealform')
    this.showToolTip()

    $( ".phone-loan" ).change(function() {
      if ($("input[name='phone-loan']:checked").val() == "yes") {
        $(".form").addClass("in-progress")
        window.location = CI.details.success_url + CI.paramsforSuccess2()
      }else {
        $(".form").addClass("in-progress")
        window.location = CI.details.bad_success_url + CI.additionalParamsFoBC()
      }
    });
  }
}
export default new LoanDeals();
