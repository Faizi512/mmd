namespace :delete do
  task lead: :environment do
    Lead.delete_all
  end
end