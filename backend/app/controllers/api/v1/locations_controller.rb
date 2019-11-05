class Api::V1::LocationsController < ApplicationController
    def index
        @locations = Location.all
        render :json => @locations
    end

    def show
        @location = Location.find(params[:id])
        render :json => @location
    end

    def new
        @location = Location.new
    end

    def create
        # puts location_params
        @location = Location.new(location_params)
        @location.save
        render :json => @location
    end

    def edit
        @location = Location.find(params[:id])
    end

    def update
        @location = Location.find(params[:id])
        @location.update(location_params)
        render :json => @location
    end

    def destroy
        @location = Location.find(params[:id])
        @location.destroy
    end 

    def location_params
        params.require(:location).permit(:id, :name, :address, :lat, :lng, :milesFrom)
    end
end
