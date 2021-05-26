import Common from "./common.js"

class ExclusiveO2Load extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#o2dealsform');
    this.firePixel()
    this.postData()

    $('.btn-deal').click(function() {
      window.location = CI.details.success_url+"?device="+ $(this).prev('input#device').val()
    });

  }
  submitLead(data,campid){
    this.exitDelivery()
    this.checkLeadStatus(data)
  }
  successUrl(){}
}

export default new ExclusiveO2Load();
