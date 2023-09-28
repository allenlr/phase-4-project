class UsersController < ApplicationController

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
        render json: { user: UserSerializer.new(current_user) }, status: :ok
    end

    def update
        raise CustomError, "Incorrect old password" unless current_user.authenticate(params[:oldPassword])
        current_user.update!(user_params.except(:oldPassword))
        render json: current_user, status: :ok
    end

    def destroy
        puts "received old password: #{params[:oldPassword]}"
        user = User.find_by(id: params[:id])

        unless user && user.authenticate(params[:oldPassword])
            render json: { error: "Incorrect password" }, status: :unauthorized
            return
        end

        if user == current_user
            user.destroy
            head :no_content
        else
            render json: {error: "You don't have permissiong to perform this action"}
        end
    end

    private

    def user_params
        params.permit(:username, :email, :password, :password_confirmation, :oldPassword)
    end

    def unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end
end
