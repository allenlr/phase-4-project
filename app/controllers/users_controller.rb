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
            render json: { error: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
    end

    def show
        render json: { user: UserSerializer.new(current_user) }, status: :ok
    end

    def update
        puts "Received Params: #{params.inspect}"
        puts "Errors: #{current_user.errors.full_messages}" unless current_user.valid?

        raise CustomError, "Incorrect old password" unless current_user.authenticate(old_password)
        if current_user.update(user_params.except(:oldPassword))
            render json: current_user, status: :ok
        else
            puts "Update failed with errors: #{current_user.errors.full_messages}"
            render json: { error: current_user.errors.full_messages.join(", ") }
        end
    end

    def destroy
        user = User.find_by(id: params[:id])

        unless user && user.authenticate(old_password)
            render json: { error: "Incorrect password" }, status: :unauthorized
            return
        end

        if user == current_user
            user.destroy
            head :no_content
        else
            render json: {error: "You don't have permission to perform this action"}
        end
    end

    private

    def user_params
        params.require(:user).permit(:username, :email, :password)
    end

    def old_password
        params[:oldPassword]
    end

    def unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end
end
