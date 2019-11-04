class DonorDriversController < ApplicationController
    def index
        @donor_drivers = DonorDriver.all
        render :json => @donor_drivers
    end
end
