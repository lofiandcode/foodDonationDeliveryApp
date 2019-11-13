class Api::V1::MatchesController < ApplicationController
    def index
        @matchs = Match.all;
        render :json => @matchs;
    end

    def show
        @match = Match.find(params[:id])
        render :json => @match
    end

    def new
        @match = Match.new
    end

    def create
        # puts '***********************************'
        # puts 'match_params = ' + match_params
        # puts '***********************************'
        @match = Match.new(match_params)
        @match.save
        render :json => @match
    end

    def match_params
        params.require(:match).permit(:id, :completed, :accepted, :driver_user_id, :donor_user_item_id, :food_bank_user_id)
    end
end
