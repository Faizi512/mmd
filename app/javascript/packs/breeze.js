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

  postData() {
    var CI = this;
    var data = this.getData();
    CI.updateFacebookAudience(data)
    CI.submitLead(data, this.details.camp_id)
    CI.successUrl()
  }
  successUrl(){
    window.location = this.details.success_url + "?device=" + this.device1
  }

  getData() {
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode: this.getUrlParameter('postcode') ||  '',
      firstname: this.getUrlParameter('firstname') ||  '',
      lastname: this.getUrlParameter('lastname') || '',
      email: this.getUrlParameter('email') || '',
      phone1: this.getUrlParameter('phone1') || '',
      street1: this.getUrlParameter('street1') || 'unknown',
      towncity: this.getUrlParameter('towncity') || 'unknown',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') || this.details.source || 'Charles Duke',
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'PN3U8B9W3D6',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      ipaddress: this.ip_Address,
      uu_id: this.details.uu_id,
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      apidown: this.apiDown,
      tps_result: this.tps_result,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }
}
export default new Breeze();
