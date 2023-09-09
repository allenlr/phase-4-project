class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    
    before_action :set_reviewable, only: [:show, :index]

    def index
        @reviews = @reviewable.reviews
        render json: @reviews, status: :ok
    end

    def show
        @review = @reviewable.reviews.find(params[:id])
        render json: @review, status: :ok
    end

    def create
        album = Album.find(params[:album_id])
        user = User.find(params[:user_id])
        review = album.reviews.new(review_params)
        review.user = user
        review.save!
        render json: review, status: :created
    end

    def destroy
        review = Review.find(params[:id])
        review.destroy
        head :no_content
    end

    private

    def set_reviewable
        @reviewable = if params[:user_id]
            User.find(params[:user_id])
        elsif params[:album_id]
            Album.find(params[:album_id])
        end
    end

    def review_params
        params.permit(:comment, :rating, :user_id, :album_id)
    end

    def unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages}, status: :unprocessable_entity
    end
    
    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end
    
end
