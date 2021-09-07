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
    this.popupTerms()

    $( document ).ready(function() {
      var check = $("input[type='checkbox'][name='partners-tp']");
      check.prop('checked',true)
    });
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

  getData() {
    var customer_type = this.isBadCustomer( this.getUrlParameter('keyword')) || (this.getUrlParameter('bc') == "yes");
    return {
      postcode:  $(".postcode").val() || this.getUrlParameter('postcode') || '',
      firstname:  $(".first_name").val() || this.getUrlParameter('firstname') || '',
      lastname: $(".last_name").val() || this.getUrlParameter('lastname') ||  '',
      email: $(".email").val() || this.getUrlParameter('email') || '',
      phone1: $(".phone").val() || this.getUrlParameter('phone1') ||  '',
      street1: $(".street1").val() || $(".address").val() || this.getUrlParameter('street1') ||  'unknown',
      street2: $(".street2").val() || this.getUrlParameter('street2') ||  'unknown',
      building: $(".building").val() || this.getUrlParameter('building') ||  'unknown',
      towncity: $(".towncity").val() || this.getUrlParameter('towncity') ||  'unknown',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||1,
      handset:this.getUrlParameter('handset') || this.phoneName || '',
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') || this.details.source || 'google3',
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: (customer_type) ? "yes" : "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: this.getFormattedCurrentDate(),
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      url_with_params: window.location.href,
      ipaddress: this.details.ipaddress,
      uu_id: this.details.uu_id,
      gclid: this.getUrlParameter('gclid') || "",
      matchtype: this.getUrlParameter('matchtype') || "",
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      traffictype: this.getUrlParameter('traffictype') || "",
      prize: this.getUrlParameter('prize') || 35,
      timestamp: new Date,
      utm_source: this.getUrlParameter('utm_source'),
      tps_result: this.tps_result,
      apidown: this.apiDown,
      user_agent: window.navigator.userAgent,
      tier: this.getUrlParameter('tier'),
      lead_from_local_storage: this.userStorage,
      campaign_name: this.details.camp_id,
      adopted_url: this.adoptedUrl,
      device:this.device || '',
      device_browser:this.deviceBrowser || '',
      device_search_engine:this.deviceSearchEngine || '',
      device_brand:this.deviceBrand || '',
      device_name:this.deviceName || '',
      title: this.getUrlParameter('title') || '',
      county: this.getUrlParameter('county') || '',
      dob: this.getUrlParameter('dob') || '',
    };
  }
}
export default new MmdPost();
