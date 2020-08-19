import Common from "./common.js"

class FbPhoneDeals extends Common {
  constructor() {
    super();
    var CI = this;
    this.validate("#dealform")
    this.getFormDetails('#dealform')
    this.showToolTip()
    this.showClock()
    this.fillform()
    this.popupTerms()
    this.showTab(this.currentTab);


    $( ".property" ).change(function() {
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.currentTab = CI.currentTab + 1;
      CI.showTab(CI.currentTab);
      $('.towncity').val($(this).find("option:selected").data("city"))
      $('.street1').val($(this).find("option:selected").data("street"))
      $('.county').val($(this).find("option:selected").data("province"))
      $('.houseNumber').val($(this).find("option:selected").data("housenum"))
    });

    window.Parsley.on('field:error', function() {
      $(".btn-success").removeClass("in-progress")
      $(".tab").removeClass("in-progress")
    });

    $("input[name='finance']").click(function() {
      console.log("fance")
      if (this.value == "yes") {
        CI.financeLead()
      }
      CI.successUrl();
    });

    $( "#btn-continue" ).click(() => {
      CI.nextStep(1)
    });
    $( "#btn-back" ).click(function() {
      CI.backStep(-1)
    });

    $(document).on("click", '.open-form', function() {
      CI.phoneName = $(this).find('input').val()
      $('#deal-form-modal').modal('show')
      $('.clock').hide()
      event.preventDefault();
    });
  }

  nextStep(n) {
    this.showCircle()
    var CI = this;
    $('#dealform').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      tabs[CI.currentTab].style.display = "none";
      CI.handleBadCustomerForm()
      CI.currentTab = CI.currentTab + n;
      CI.showTab(CI.currentTab);
    })
  }

  mmdLead(){
    if (this.customValidator('#dealform') == true && this.isPhone == true && this.isEmail == true){
      this.postMMDData()
    }else{
      $('#dealform').parsley().validate()
    }
  }

  postMMDData() {
    var data = this.getData();
    $( "#btn-continue").hide()
    $( "#btn-back").hide()
    $( ".progress").hide()
    $(".postcode_holder").html($(".postcode").val() || this.getUrlParameter("postcode")  || "");
    // Form Submisson
    this.updateFacebookAudience(data)
    this.sendMmdExitLead()
    this.submitLead(data, this.details.camp_id)
    if(!this.getBcFromParams()){
      this.successUrl()
    }
  }


  firePixel(){
    if (this.details.camp_id == 'MEGA-MOBILE-DEALS'){
      dataLayer.push({'event': 'fb-form-submit'})
    }
  }

  financeLead(){
    var data = this.getData();
    this.submitLead(data, "MMD-finance")
  }

  handleBadCustomerForm(){
    if (this.currentTab == 2) {
      this.mmdLead()
    }
  }

  urlSelection(){
    if(this.deliveryName == "Exit 1 (Energy)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "Exit 2 (Credit)"){
      window.location = this.details.success_url+this.paramsforSuccess()
    }else if(this.deliveryName == "Exit 4 (sweetmobile)"){
      window.location = this.details.success_url
    }else if(this.deliveryName == "Exit 5 (UK Credit Ratings)"){
      window.location = this.details.success_url+this.paramsforSuccess()
    }else if(this.deliveryName == "Exit 8 (Energy / Awin)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "Exit Lotto"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "(Energy / Voxi)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "(Energy / E2Save)"){
      window.location = this.details.success_url+this.paramsforSuccess2()
    }else if(this.deliveryName == "Voxi Exit"){
      window.location = this.details.success_url
    }else if(this.deliveryName == "Exit 10 (E 2 Save)"){
      window.location = this.details.success_url
    }else{
      window.location = this.details.success_url+this.additionalParamsFoBC()
    }
  }

  successUrl(){
    var CI = this;
    $("#loaderPopup").css('height', '100%')
    setTimeout(function(){
      if (CI.redirectUrl) {
        CI.urlSelection()
      }else{
        CI.successUrl()
      }
    }, 1000)
  }

  getData(){
    var track = "";
    try {
      track = AnyTrack('formSubmit') || "";
    }
    catch (e) {}
    return {
      postcode: this.getUrlParameter('postcode') || $(".postcode").val() || '',
      firstname: this.getUrlParameter('firstname') || $(".first_name").val() || '',
      lastname: this.getUrlParameter('lastname') || $(".last_name").val() || '',
      email: this.getUrlParameter('email') || $(".email").val() || '',
      phone1: this.getUrlParameter('phone1') || $(".phone").val() || '',
      street1: this.getUrlParameter('street1') || $(".street1").val() || $(".address").val() || 'unknown',
      towncity: this.getUrlParameter('towncity') || $(".towncity").val() || 'unknown',
      sid: this.getUrlParameter('sid') || this.details.sid ||1,
      ssid: this.getUrlParameter('ssid') || this.details.ssid ||157,
      handset:this.getUrlParameter('handset') || this.phoneName || '',
      ad_set:this.getUrlParameter('ad_set') || 1,
      source: this.getUrlParameter('source') || "taboola",
      c1: this.getUrlParameter('c1') || this.getUrlParameter('bstransid') || this.getUrlParameter('transid') || '',
      adgroupid: this.getUrlParameter('adgroupid') || '',
      campaign: this.getUrlParameter('campaign') || '',
      keyword: this.getUrlParameter('keyword') || '',
      bad_credit_customer: "no",
      campaignkey: 'E9F2N6A3R5',
      optindate: this.getFormattedCurrentDate(),
      url_with_params: window.location.href,
      optinurl: 'deals.megamobiledeals.com'+ this.details.optin_url,
      ipaddress: this.ip_Address,
      uu_id: this.details.uu_id,
      trafficid: this.getUrlParameter('trafficid') || this.details.form_name,
      prize: this.getUrlParameter('prize') || 35,
      apidown: this.apiDown,
      anytrack: track,
      utm_source: this.getUrlParameter('utm_source'),
      tps_result: this.tps_result,
      timestamp: new Date,
      user_agent: window.navigator.userAgent,
    };
  }
}
export default new FbPhoneDeals();
