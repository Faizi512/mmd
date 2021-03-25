namespace :share_domains do
  task add_domains: :environment do
    ShareDomain.create(url: "https://deals.megamobiledeals.com")
    ShareDomain.create(url: "https://megamobiledeals.com")
    ShareDomain.create(url: "https://bill-switchers.com")
    ShareDomain.create(url: "https://mobilegogo.co.uk")
    ShareDomain.create(url: "https://go4phones.co.uk")
    ShareDomain.create(url: "https://hitphones.com")
    ShareDomain.create(url: "https://mobile-deal.com")
    ShareDomain.create(url: "https://switch-mobile.co.uk")
    ShareDomain.create(url: "https://00mobile.co.uk")
    ShareDomain.create(url: "https://getmyphone.co.uk")
  end
end
