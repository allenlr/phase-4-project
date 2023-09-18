class AlbumsController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    skip_before_action :authorized, only: [:index, :show]

    def index
        albums = Album.all
        render json: albums, status: :ok
    end

    def show
        album = Album.find(params[:id])
        render json: album, status: :ok
    end

    def create
        album = Album.create!(album_params)
        render json: album, status: :created
    end

    def destroy
        album = Album.find(params[:id])
        album.destroy
        head :no_content
    end


    private

    def album_params
        params.permit(:title, :artist, :release_date)
    end

    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end

    def unprocessable_entity(exception)
        render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
        
end
