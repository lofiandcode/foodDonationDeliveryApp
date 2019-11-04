class Donor < ApplicationRecord
    has_many :donor_drivers
    has_many :drivers, through: :donor_drivers, dependent: :destroy
    serialize :donations
    serialize :hours
end
