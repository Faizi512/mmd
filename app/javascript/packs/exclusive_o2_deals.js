import Common from "./common.js"

class ExclusiveO2Deals extends Common {
  constructor() {
    super();
    var CI = this;
    this.getFormDetails('#o2dealsform');
    this.source = '';

    $('.btn-deal').click(function() {
      var producttype = $(this).parent().find("[name='p-type']").val()
      if (producttype == 0) {
        CI.source = 'e-handset';
      }else{
        CI.source = CI.getSource();
      }
      CI.postData()
      CI.device = $(this).prev('input#device').val()
    });
  }

  successUrl(){
    var CI = this;
     setTimeout(function(){
        window.location = CI.details.success_url + "?device=" + CI.device
    }, 1000)
  }

  getData() {
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      street1: this.getUrlParameter('street1') || $(".street1").val() || $(".address").val() || 'unknown',
      towncity: this.getUrlParameter('towncity') || $(".towncity").val() || 'unknown',
      handset:this.getUrlParameter('handset') || this.phoneName || '',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.source,
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      matchtype: this.getUrlParameter('matchtype') || "",
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      ipaddress: this.details.ipaddress,
      uu_id: this.details.uu_id,
      gclid: this.getUrlParameter('gclid') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      traffictype: this.getUrlParameter('traffictype') || "",
      prize: this.getUrlParameter('prize') || 35,
      apidown: this.apiDown,
      tps_result: this.tps_result,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
      tier: this.getUrlParameter('tier'),
      campaign_name: this.details.camp_id,
    };
  }
}

export default new ExclusiveO2Deals();
