import Common from "./common.js"

class NewMmd extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('.mt-footer')
    this.postData()
    this.showToolTip()
    this.showClock()
    this.TogglePopUp()
    this.ToggleCheckBox()

    $('.submit-mmd-form').click(function(event) {
      CI.urlSelection()
    });
  }
  successUrl(){
  }
}

export default new NewMmd();
