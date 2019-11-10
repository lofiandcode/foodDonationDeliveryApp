class Api::V1::UserLocationsController < ApplicationController
    def index
        @user_locations = UserLocation.all;
        render :json => @user_locations;
    end

    def show
        @user_location = UserLocation.find(params[:id])
        render :json => @user_location
    end

    def new
        @user_location = UserLocation.new
    end

    def create
        # puts '***********************************'
        # puts 'user_location_params = ' + user_location_params
        # puts '***********************************'
        @user_location = UserLocation.new(user_location_params)
        @user_location.save
        render :json => @user_location
    end

    def user_location_params
        params.require(:user_location).permit(:id, :user_id, :location_id)
    end
end
