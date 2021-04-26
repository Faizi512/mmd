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
    this.TogglePopUp()
    this.ToggleCheckBox()

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $( ".btn-deal-iphone" ).click(() => {
      CI.showCircle()
      $('#dealform').parsley().whenValidate({
          group: 'block-0'
      }).done(function() {
        CI.postData();
      })
    });
  }

  successUrl(){
    var CI = this;
     setTimeout(function(){
        window.location = "/ee-success?device=iPhone12"
    }, 1000)
  }

}
export default new IphoneDeals();
