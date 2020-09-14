import Common from "./common.js"

class SaveEnergy extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#engeryForm")
    this.showToolTip()
    this.showTab(this.currentTab);

    $('.name').text(this.getUrlParameter('firstname'))
    $('.postcode').text(this.getUrlParameter('postcode'))

    $("#submitbtn").click(function(event){
      if ($('#engeryForm').parsley().validate()){
        $('#submitbtn').prop('disabled', true);
        CI.postData()
      }
    });
  }

  getData() {
    return {
      postcode: this.getUrlParameter('postcode')|| 'unknown',
      firstname: this.getUrlParameter('firstname')|| 'unknown',
      lastname: this.getUrlParameter('lastname')|| 'unknown',
      email: this.getUrlParameter('email')|| 'unknown',
      phone1: this.getUrlParameter('phone1')|| 'unknown',
      street1: $(".address-field").val(),
      lead_id: this.getUrlParameter('lead_id')|| '',
      sid: this.getUrlParameter('sid')|| 1,
      source: this.getUrlParameter('source') || '',
      ssid: this.getUrlParameter('ssid') || 'unknown',
      paymentmethod: this.getUrlParameter('paymentmethod')|| 'prepayment',
      currentprovider: this.getUrlParameter('currentprovider')|| 'other',
      prize: this.getUrlParameter('prize')|| 'mobilephone',
      trafficid: this.getUrlParameter('trafficid')|| 'Save Energy Bill',
      towncity: this.getUrlParameter('towncity')|| 'unknown',
      title: this.getUrlParameter('title')|| 'Mr',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'http://deals.megamobiledeals.com/save_energy_bill',
      ipaddress: this.ip_Address,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }

  postData() {
    var CI = this
    var data  = this.getData()
    $.ajax({
      type: "POST",
      url: "https://go.webformsubmit.com/dukeleads/waitsubmit?key=eecf9b6b61edd9e66ca0f7735dfa033a&campid=ENERGY",
      data: data,
      success: function(res) {
        var url = "http://mtrk11.co.uk/?a=14118&c=36909&s1=bbexit&s5="+ CI.getUrlParameter('postcode')
        window.location = url;
      },
      error: function(res) {
        console.log(res)
      },
    })
  }

}
export default new SaveEnergy();
