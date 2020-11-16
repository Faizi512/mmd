module CreditCheckStepFormHelper
  def number_field_params
    [
      {
        id: '4',
        name: 'income',
        subtitle: 'Monthly income?',
        title: 'Monthly Income After Tax',
        income_id: 'monthly-income',
        parsley_message: 'Please Enter your Monthly Income',
        parsley_group: 'block-4',
        placeholder: 'Enter Income Here',
        step_no: '5',
        info:'Please enter how much you get paid each month after tax has been deducted'
      },
      {
        id: '5',
        name: 'rent',
        subtitle: 'Rent Payments',
        title: 'Monthly Rent / Mortgage Payments cost?',
        income_id: 'rent-payment',
        parsley_message: 'Please Enter your Rent Payment',
        parsley_group: 'block-5',
        placeholder: 'Enter Payment Here',
        step_no: '6',
        info:'Enter the amount you pay per month for rent or mortgage payments'
      },
      {
        id: '6',
        name: 'credit-card',
        subtitle: 'Monthly Credit card & loan repayment cost?',
        title: 'Monthly Credit Card & Loan Repayments',
        income_id: 'creditCard',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-6',
        placeholder: 'Enter Here',
        step_no: '7',
        info:'the total amount you pay each month for credit card and loan repayments'
      },
      {
        id: '7',
        name: 'utility-bills',
        subtitle: 'Monthly Utility Bills Cost?',
        title: 'Utility Bills',
        income_id: 'utilityBills',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-7',
        placeholder: 'Enter Here',
        step_no: '8',
        info:'Please enter the amount you pay each month for utility bills. There are payments such as phone bills, gas and electricity bills etc'
      },
      {
        id: '8',
        name: 'transport-costs',
        subtitle: 'Monthly Transport Cost?',
        title: 'Transport',
        income_id: 'transportCosts',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-8',
        placeholder: 'Enter Here',
        step_no: '9',
        info:'Please enter the amount you pay each month for travel costs, this can be train tickets and petrol costs'
      },
      {
        id: '9',
        name: 'food-costs',
        subtitle: 'Monthly Food Cost?',
        title: 'Food',
        income_id: 'foodCosts',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-9',
        placeholder: 'Enter Here',
        step_no: '10',
        info:'Please estimate the amount you spend per month on things such as weekly food shops and eating out etc'
      },
      {
        id: '10',
        name: 'other-costs',
        subtitle: 'Other monthly costs?',
        title: 'Other regular outgoings',
        income_id: 'otherCosts',
        parsley_message: 'Please Enter requested information',
        parsley_group: 'block-10',
        placeholder: 'Enter Here',
        step_no: '11',
        info:'Please enter any other monthly costs such as memberships, subscriptions, childcare etc.'
      },
    ]
  end
end
