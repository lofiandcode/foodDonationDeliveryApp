class FoodBanksController < ApplicationController
    def index
        @food_banks = FoodBank.all
        render :json => @food_banks
    end

    def show
        @food_bank = FoodBank.find(params[:id])
        render :json => @food_bank
    end

    def new
        @food_bank = FoodBank.new
    end

    def create
        # puts food_bank_params
        @food_bank = FoodBank.new(name: 'Post Test')
        @food_bank.save
        render :json => @food_bank
    end

    def edit
        @food_bank = FoodBank.find(params[:id])
    end

    def update
        @food_bank = FoodBank.find(params[:id])
        @food_bank.update(params['about'])
        render :json => @food_bank
    end

    def destroy
        @food_bank = FoodBank.find(params[:id])
        @food_bank.destroy
    end 

    def food_bank_params
        params.require(:food_bank).permit(:id, :name, :about, :address, :phoneNum, :donationsNeeded, :accommodations, :hours => {})
    end
end
