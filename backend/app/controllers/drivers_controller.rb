class DriversController < ApplicationController
    def index
        @drivers = Driver.all
        render :json => @drivers
    end

    def show
        @driver = Driver.find(params[:id])
        render :json => @driver
    end

    def new
        @driver = Driver.new
    end

    def create
        puts driver_params
        @driver = Driver.new(driver_params)
        @driver.save
        render :json => @driver
    end

    def edit
        @driver = Driver.find(params[:id])
    end

    def update
        @driver = Driver.find(params[:id])
        @driver.update(driver_params)
        render :json => @driver
    end

    def destroy
        @driver = Driver.find(params[:id])
        @driver.destroy
    end 

    def driver_params
        params.require(:driver).permit(:id, :name, :about, :phoneNum, :accommodations, :hours => {}, :areas => {})
    end
end
