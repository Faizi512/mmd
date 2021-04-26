import Common from "./common.js"

class MmdPost extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('.mt-footer')
    this.showToolTip()
    this.showClock()
    this.TogglePopUp()
    this.ToggleCheckBox()
    $('.submit-mmd-form').click(function(event) {
      event.preventDefault();
      if (CI.submtForm == false) {
        CI.submtForm = true;
        CI.postData()
      }
    });
  }
  urlSelection(){
    window.location = this.details.bad_success_url+this.additionalParamsFoBC()
  }
}
export default new MmdPost();
