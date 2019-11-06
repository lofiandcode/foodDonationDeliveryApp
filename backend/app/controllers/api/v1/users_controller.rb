class Api::V1::UsersController < ApplicationController
    def index
        @users = User.all
        render :json => @users
    end

    def show
        @user = User.find(params[:id])
        render :json => @user
    end

    def new
        @user = User.new
    end

    def create
        # puts user_params
        @user = User.new(name: 'post test')
        @user.save
        render :json => @user
    end

    def edit
        @user = User.find(params[:id])
    end

    def update
        @user = User.find(params[:id])
        @user.update(user_params)
        render :json => @user
    end

    def destroy
        @user = User.find(params[:id])
        @user.destroy
    end 

    def user_params
        params.require(:user).permit(:id, :name, :username, :password, :role, :phoneNum, :about)
    end
end
