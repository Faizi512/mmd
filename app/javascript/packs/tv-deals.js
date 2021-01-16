import Common from "./common.js"

class TVDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#dealform')
    this.showToolTip()

    $( ".sky-deals" ).change(function() {
      if ($("input[name='sky-deals']:checked").val() == "yes") {
        $('.tab1').hide();
        $('.tab2').show();
      }else {
        $(".form").addClass("in-progress")
        window.location = CI.details.bad_success_url + CI.additionalParamsFoBC()
      }
    });
    $( ".previous-sky-user" ).change(function() {
      if ($("input[name='previous-sky-user']:checked").val() == "yes") {
        $('.tab2').hide();
        $('.tab3').show();
      }else {
        $(".form").addClass("in-progress")
        window.location = CI.details.success_url + CI.paramsforSuccesstv()
      }
    });

    $( ".last12-sky-user" ).change(function() {
      if ($("input[name='last12-sky-user']:checked").val() == "yes") {
        $(".form").addClass("in-progress")
        window.location = CI.details.bad_success_url + CI.additionalParamsFoBC()
      }else {
        $(".form").addClass("in-progress")
        window.location = CI.details.success_url + CI.paramsforSuccesstv()
      }
    });
  }
}
export default new TVDeals();
