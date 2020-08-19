import Common from "./common.js"

class EDealsVoxi extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealform')
    this.showToolTip()

    $( ".save-energy" ).change(function() {
      if ($("input[name='save-energy']:checked").val() == "yes") {
        $(".form").addClass("in-progress")
        window.location = CI.details.success_url + CI.paramsforSuccess2()
      }else {
        $(".form").addClass("in-progress")
        window.location = CI.details.bad_success_url
      }
    });
  }
}
export default new EDealsVoxi();
