class ItemsController < ApplicationController
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
        puts item_params
        @item = Item.new(item_params)
        @item.save
        render :json => @item
    end

    def edit
        @item = Item.find(params[:id])
    end

    def update
        @item = Item.find(params[:id])
        @item.update(item_params)
        render :json => @item
    end

    def destroy
        @item = Item.find(params[:id])
        @item.destroy
    end 

    def item_params
        params.require(:item).permit(:id, :name, :category, :quantity, :units)
    end
end
