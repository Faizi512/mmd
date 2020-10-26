import Common from "./common.js"
class CreditCheck extends Common {
   constructor(){
    super();
    var CI = this;
    this.validate("#cc-form")
    $(document).on("click", '.input-tag-radio', function(event) {
      CI.step(1,event)
    });
    $(document).on("change", '.select-field', function(event) {
      CI.step(1,event)
    });
    $(document).on("click", '.back-color', function(event) {
      CI.step(1,event)
    });
    $(document).on("click", '.accordion-title', function(event) {
      var card=event.target.closest('.tab')
      CI.changeTab(card)
    });
    $(document).on("show.bs.collapse", '.collapse', function(event) {
       $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-plus-circle").addClass("fa-minus-circle");
    })
    $(document).on("hide.bs.collapse", '.collapse', function(event) {
      $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-minus-circle").addClass("fa-plus-circle");
    });
  }
  step(n,event) {
    var tab = event.target.closest('.tab')
    var CI = this;
    var income=0,food=0,transport=0,others=0,bills=0, savings=0;
    $('#cc-form').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      $(tabs[CI.currentTab + 1]).find('.collapse').collapse('show');
      $(tabs[CI.currentTab]).find('.collapse').collapse('hide');
      $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
      CI.currentTab = CI.currentTab + n;
    })
    if(($(tab).find(".select-field")).length > 0){
      var inputs=$(tab).find(".select-field");
      var id=inputs[0]
      var data= id.options[id.selectedIndex].text;
      if (data == "more than 1998" || data== "unemployed" || data== "student")
      {
        window.location.href=
          "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true";
      }
    }
    else{
      var inputs=$(tab).find(".input-tag-radio");
      var incomeValues=["income Upto £1000","income Upto £2000","income Upto £4000","income above £4000"]
      var foodValues=["food Upto £500","food Upto £1000","food Upto £1500","food above £2000"]
      var transportValues=["transport Upto £500","transport Upto £1000","transport Upto £1500","transport above £2000"]
      var billsValues=["bills Upto £500","bills Upto £1000","bills Upto £1500","bills above £2000"]
      var othersValues=["others Upto £500","others Upto £1000","others Upto £1500","others above £2000"]
      for (var i=0; i<inputs.length;i++){
        var id=inputs[i];
        if (id.checked) {
          if(id.value=="EE" || id.value=="income Upto £1000" ||
             id.value=="income Upto £2000" ){
             window.location.href=
              "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true";
          }
          else if(incomeValues.includes(id.value)){
            this.income= this.getAmount(id.value)
          }
          else if(foodValues.includes(id.value)){
            this.food= this.getAmount(id.value)
          }
          else if(transportValues.includes(id.value)){
            this.transport= this.getAmount(id.value)
          }
          else if(billsValues.includes(id.value)){
            this.bills= this.getAmount(id.value)
          }
          else if(othersValues.includes(id.value)){
            this.others= this.getAmount(id.value)
          }
        }
      }
    }
    if(this.income != null && this.transport != null && this.food != null && this.bills != null && this.others !=null){
      this.savings=this.income-(this.transport+this.food+this.bills+this.others)
    }
    if(this.savings != null){
      if(this.savings <= 500 && this.others != 0)
      {
        window.location.href=
          "https://switchuk.uk/mobiles/contract_phone_deals?mmd=true&monthly_cost=10";
      }else if(this.savings > 500 && this.savings <=1000 && this.others != 0){
        window.location.href=
          "https://switchuk.uk/mobiles/contract_phone_deals?mmd=true&monthly_cost=20";
      }else if(this.savings > 1000 && this.others != 0){
        window.location.href=
          "https://switchuk.uk/mobiles/contract_phone_deals";
      }
    }
  }
  changeTab(tab){
    var CI = this;
    var index=parseInt(tab.id);
    this.currentTab=index;
  }
  getAmount(id){
    return parseInt(id.split("£")[1]);
  }
}
export default new CreditCheck();
