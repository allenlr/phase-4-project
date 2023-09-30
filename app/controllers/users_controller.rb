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
            render json: UserSerializer.new(@user).serializable_hash.merge(jwt: @token), status: :created 
        else
            render json: { error: @user.errors.full_messages.join(", ") }, status: :unprocessable_entity
        end
    end

    def show
        if current_user
            render json: UserSerializer.new(current_user).serializable_hash, status: :ok
        else
            render json: { error: "Token validation failed" }, status: :unauthorized
        end
    end

    def update
        puts "Updating user..."
        puts "Received Params: #{params}"
      
        if user_params[:password].present?
          unless current_user.authenticate(user_params[:oldPassword])
            render json: { error: "Old password is incorrect" }, status: :unprocessable_entity
            return
          end
        end
          
        if current_user.update(user_params.except(:oldPassword))
          render json: current_user
        else
          render json: { error: "Update failed" }, status: :unprocessable_entity
        end
    end
      
    def destroy
        user = User.find_by(id: params[:id])
        unless user && user.authenticate(params[:oldPassword])
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
        params.permit(:username, :email, :password, :oldPassword)
    end

    def unprocessable_entity(exception)
        render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity
    end

    def record_not_found(exception)
        render json: { error: exception.message }, status: :not_found
    end
end
