class Api::V1::UserItemsController < ApplicationController
    def index
        @items = Item.all;
        render :json => @items;
    end

    def show
        @item = Item.find(params[:id])
        render :json => @item
    end

    def new
        @item = Item.new
    end

    def create
        # puts item_params
        @item = Item.new(item_params)
        @item.save
        render :json => @item
    end

    def item_params
        params.require(:item).permit(:id, :user_id, :item_id)
    end
end
