class Api::V1::UserItemsController < ApplicationController
    def index
        @user_items = UserItem.all;
        render :json => @user_items;
    end

    def show
        @user_item = UserItem.find(params[:id])
        render :json => @user_item
    end

    def new
        @user_item = UserItem.new
    end

    def create
        # puts '***********************************'
        # puts 'user_item_params = ' + user_item_params
        # puts '***********************************'
        @user_item = UserItem.new(user_item_params)
        @user_item.save
        render :json => @user_item
    end

    def user_item_params
        params.require(:user_item).permit(:id, :user_id, :item_id)
    end
end
