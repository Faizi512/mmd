import Common from "./common.js"

class Breeze extends Common {
  constructor() {
    super();
    var CI = this
    this.device1 = '';
    this.getFormDetails('#dealform')
    $('.deals2').click(function() {
       CI.device1 = $(this).find('.device').text()
      CI.postData();
    });

  }

  successUrl(){
    var CI = this;
     setTimeout(function(){
        window.location = CI.details.success_url + "?device=" + CI.device1
    }, 1000)
  }

}
export default new Breeze();
