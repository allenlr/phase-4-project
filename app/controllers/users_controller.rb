class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :unprocessable_entity
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    skip_before_action :authorized, only: [:create, :index]

    def index
        users = User.all
        render json: users, status: :ok
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            @token = encode_token({ user_id: @user.id })
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created 
        else
            render json: { error: "failed to create user" }, status: :unprocessable_entity
        end
    end

    def show
        if current_user
            render json: { user: UserSerializer.new(current_user) }, status: :ok
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
