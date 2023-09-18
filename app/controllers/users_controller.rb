class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    skip_before_action :authorized, only: [:create]

    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    def show
        current_user = User.find_by(id: session[:user_id])
        if user
            render json: current_user, status: :ok
        else
            render json: { error: "Not logged in" }, status: :unauthorized
        end
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :ok
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation)
    end

    def unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end
end
