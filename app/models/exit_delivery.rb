class ExitDelivery < ApplicationRecord
  validate :validate_percentage
  validate :validate_priority

  def validate_percentage
    total_percent = ExitDelivery.where.not(id: self.id).where(status: self.status).where(operational: "active").where(functional: "active").pluck(:percentage).sum
    unless total_percent + self.percentage <= 100
      errors.add(
        :percentage, ": Enter less than or equal to #{100 - total_percent}"
      )
    end
  end
  def validate_priority
    priorities = ExitDelivery.where.not(id: self.id).where(status: self.status).pluck(:priority)
    if priorities.include?(self.priority)
      errors.add(
        :priority, ": Already taken"
      )
    end
  end
end
