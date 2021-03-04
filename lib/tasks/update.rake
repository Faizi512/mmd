namespace :update do
  task lead: :environment do
    ExitDelivery.all.each do |exit_delivery|
      exit_delivery.update(percentage: exit_delivery.copy_percentage)
      exit_delivery.update(count: 0)
      exit_delivery.update(operational: "active")
    end
  end
end
