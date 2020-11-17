import Common from "./common.js"
class CreditCheck extends Common {
  constructor(){
    super();
    var CI = this;
    this.validate("#cc-form")
    $(document).on("click", '.input-tag-radio', function(event) {
      CI.step(1,event)
    });
    $(document).on("change", '.age-limit', function(event) {
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
       $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-angle-down").addClass("fa-angle-up");
    })
    $(document).on("hide.bs.collapse", '.collapse', function(event) {
      $(this).prev(".card-header").find(".accordian-toggle-icon").removeClass("fa-angle-up").addClass("fa-angle-down");
    });
    this.transactions = {
      'income': '',
      'rent': '',
      'credit_card': '',
      'utility_bills': '',
      'transport_costs': '',
      'food_costs': '',
      'other_costs': ''
    }
    this.savings = 0
    this.totalexpense=0
    this.percent=0
    this.income=0
    this.age=0
    this.remaining=0
    this.residentialStatus=null
    this.employmentStatus=null
  }
  step(n,event) {
    this.employmentValues=["full time employed","part time employed","self employed"]
    this.goodCreditResidentialValues=["tenent","home owner"]
    this.okCreditResidentialValues=["tenent","home owner","council tenent","living with parents"]
    var tab = event.target.closest('.tab')
    var CI = this;
    if(($(tab).find(".age-limit")).length > 0){
      var inputs=$(tab).find(".age-limit");
      var id = inputs[0];
      var selected=id.value
      this.year=parseInt(selected.split("-")[0])
      var date = new Date();
      var currentYear = date.getFullYear();
      this.age=currentYear-this.year
      if(this.age < 22) {
        setTimeout(function(){
          window.location.href=
            "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
        }, 3000);
      }
    }else if(($(tab).find(".select-field")).length > 0){
      var inputs=$(tab).find(".select-field");
      var id = inputs[0]
      if(id.options){
        this.employmentStatus = id.options[id.selectedIndex].text;
        if (this.employmentStatus == "unemployed" || this.employmentStatus == "student")
        {
          setTimeout(function(){
            window.location.href=
              "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true";
          }, 2000);
        }
      }
    }else if(($(tab).find(".residence")).length > 0){
      var inputs=$(tab).find(".residence");
      for (var i = 0; i<inputs.length;i++){
        var id = inputs[i];
        if (id.checked) {
          this.residentialStatus=id.value
        }
      }
    }else if($(tab).find(".expenses").length > 0){
      var input = $(tab).find(".expenses")[0].name;
      var inputValue = $(tab).find(".expenses")
      if (input == "income") {
        this.transactions["income"] = inputValue.val()
      }else if(input == "rent"){
        this.transactions["rent"] = inputValue.val()
      }else if(input == "credit-card"){
        this.transactions["credit_card"] = inputValue.val()
      }else if(input == "utility-bills"){
        this.transactions["utility_bills"] = inputValue.val()
      }else if(input == "transport-costs"){
        this.transactions["transport_costs"] = inputValue.val()
      }else if(input == "food-costs"){
        this.transactions["food_costs"] = inputValue.val()
      }else if(input == "other-costs"){
        this.transactions["other_costs"] = inputValue.val()
      }
    }
    this.income = parseInt(this.transactions["income"])
    if(this.transaction_check()){
      Object.keys(this.transactions).forEach(function (tran){
        CI.totalexpense = parseInt(CI.transactions[tran]) + CI.totalexpense
      })
      CI.totalexpense = CI.totalexpense - CI.income;
      this.percent = (70/100) * this.income
      this.remaining=this.income-this.percent
      this.savings = this.income - this.totalexpense

      if(this.income >= 1500 && this.credit_check(this.goodCreditResidentialValues)){
        CI.redirect_to_switchuk()
      }else if(this.income >= 1000 && this.income < 1500 && this.credit_check(
        this.goodCreditResidentialValues)){
        CI.redirect_to_switchuk('?mmd=true&monthly_cost=35')
      }else if(this.income >= 800 && this.income < 1000 && this.credit_check(
        this.okCreditResidentialValues)){
        CI.redirect_to_switchuk('?mmd=true&monthly_cost=26')
      }else{
        CI.redirect_to_bad_credit()
      }
    }
    if(this.income < 800){
        CI.redirect_to_bad_credit()
    }
    $('#cc-form').parsley().whenValidate({
      group: 'block-' + this.currentTab
    }).done(() =>{
      var tabs = $(".tab");
      $(tabs[CI.currentTab]).find('.initial-step').addClass("disp-none");
      $(tabs[CI.currentTab]).find('.step-green').show();
      $(tabs[CI.currentTab]).find('.collapse').collapse('hide');
      $(tabs[CI.currentTab]).find('.collapse-text-col').addClass("text-on-collapse");
      $(tabs[CI.currentTab]).find('.accordian-toggle-icon').addClass("text-on-collapse");
      $(tabs[CI.currentTab]).find('.border-color').removeClass("border-color").addClass("border-color-on-collapse");
      if($(tabs[CI.currentTab]).find('.redirect').length > 0){
        if (CI.age <= 21 || CI.employmentStatus == "unemployed" ||
            CI.employmentStatus == "student" || CI.income < 800 ||
            CI.totalexpense != 0) {
          $('#redirect-model').modal({
            backdrop: 'static',
            keyboard: false,
          })

          setTimeout(function(){
            $(tabs[CI.currentTab + 1]).find('.collapse').collapse('show');
            $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
            CI.currentTab = CI.currentTab + n;
          }, 6000);
        }else{
          $(tabs[CI.currentTab + 1]).find('.collapse').addClass('show');
          $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
          CI.currentTab = CI.currentTab + n;
        }
      }else{
        $(tabs[CI.currentTab + 1]).find('.d-none').removeClass('d-none');
        $(tabs[CI.currentTab + 1]).find('.collapse').addClass('show');
        CI.currentTab = CI.currentTab + n;
      }
    })
  }
  changeTab(tab){
    var CI = this;
    var index=parseInt(tab.id);
    this.currentTab=index;
  }
  redirect_to_switchuk(query = '') {
    if (this.savings >= this.remaining) {
      setTimeout(function(){
        window.location.href=
        `https://switchuk.uk/mobiles/contract_phone_deals${query}`;
      }, 3000);
    }else{
      this.redirect_to_bad_credit()
    }
  }
  redirect_to_bad_credit() {
    setTimeout(function(){
      window.location.href=
        "https://switchuk.uk/no_credit_check_sim_only_deals?bc=true"
    }, 3000);
  }
  credit_check(residentialValues) {
    return this.age > 21
      && this.employmentValues.includes(this.employmentStatus)
      && residentialValues.includes(this.residentialStatus)
  }
  transaction_check(){
    return this.transactions.income != "" && this.transactions.rent != ""
      && this.transactions.credit_card != "" && this.transactions.utility_bills != ""
      && this.transactions.transport_costs != "" && this.transactions.food_costs != ""
      && this.transactions.other_costs != ""
  }
}
export default new CreditCheck();
