class DonorsController < ApplicationController
    def index
        @donors = Donor.all
        render :json => @donors
    end

    def show
        @donor = Donor.find(params[:id])
        render :json => @donor
    end

    def new
        @donor = Donor.new
    end

    def create
        # puts donor_params
        @donor = Donor.new(about: 'post test')
        @donor.save
        render :json => @donor
    end

    def edit
        @donor = Donor.find(params[:id])
    end

    def update
        @donor = Donor.find(params[:id])
        @donor.update(about: 'patch test')
        render :json => @donor
    end

    def destroy
        @donor = Donor.find(params[:id])
        @donor.destroy
    end 

    def donor_params
        params.require(:donor).permit(:id, :name, :about, :address, :phoneNum, :donations, :accommodations, :hours => {})
    end
end
