class AlbumsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show, :album_reviews]

    def index
        albums = Album.all
        render json: albums, status: :ok
    end

    def show
        album = Album.find(params[:id])
        render json: album, status: :ok
    end

    def create

        album = Album.new(album_params)
    
        if album.save
            initial_review = current_user.reviews.create(album: album, rating: 5, comment: 'Check this out!')
            render json: album, status: :created
        else
            raise CustomError.new(album.errors.full_messages.join(", "))
          end
    end
    


    private

    def album_params
        params.require(:album).permit(:title, :artist, :release_date, :image_url)
    end

    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end

    def unprocessable_entity(exception)
        render json: { error: exception.record.errors.full_messages }, status: :unprocessable_entity
    end
        
end
