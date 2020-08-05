import Common from "./common.js"

class Lotto extends Common {
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
        $('#question1').hide();
        $('#question2').show();
      }
    });

    $( ".euro_lines" ).change(function() {
      if ($("input[name='euro_lines']:checked").val() == "yes") {
        $(".form").addClass("in-progress")
        window.location = "http://lead36five.go2cloud.org/aff_c?offer_id=441&aff_id=1215"
      }else {
        $(".form").addClass("in-progress")
        window.location = CI.details.bad_success_url + CI.additionalParamsFoBC()
      }
    });
  }
}
export default new Lotto();
