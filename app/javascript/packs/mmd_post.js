import Common from "./common.js"

class MmdPost extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('.mt-footer')
    this.showToolTip()
    this.showClock()
    $('.submit-mmd-form').click(function(event) {
      event.preventDefault();
      if (CI.submtForm == false) {
        CI.submtForm = true;
        CI.postData()
      }
    });
  }
}
export default new MmdPost();