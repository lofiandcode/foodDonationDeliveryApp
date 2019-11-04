class DriverFoodBanksController < ApplicationController
    def index
        @driver_food_banks = DriverFoodBank.all
        render :json => @driver_food_banks
    end
end
